import { Mutex } from 'async-mutex';
import { EventEmitter } from 'events';
import { Peer } from './peer';
import { Block, DSProof, Header, Script, Transaction } from 'bitcoin-minimal';
import { GetHeadersOptions } from './messages/headers';
import { CashAddress } from 'bitcoin-minimal/lib/utils';
import { NetAddress } from './messages/address';
import { ClusterStrategy, ClientConfig, ClusterStatus, RequestResponse, DefaultParameters, ClusterOrder, ClusterDistribution, ClientState, ConnectionStatus, RPCParameter, ResolveFunction, RejectFunction, SubscribeCallback, debug, PeerOptions, CancelWatch, ClusterOptions } from './interfaces';

/**
 * Triggers when the cluster connects to enough servers to satisfy both the cluster confidence and distribution policies.
 *
 * @event Cluster#ready
 */

/**
 * Triggers when the cluster loses a connection and can no longer satisfy the cluster distribution policy.
 *
 * @event Cluster#degraded
 */

/**
 * Triggers when the cluster loses a connection and can no longer satisfy the cluster confidence policy.
 *
 * @event Cluster#disabled
 */

/**
 * High-level electrum client that provides transparent load balancing, confidence checking and/or low-latency polling.
 */
export class Cluster extends EventEmitter
{
	// Declare instance variables
	strategy: ClusterStrategy;

	// Initialize an empty dictionary of clients in the cluster
	clients: { [index: string]: ClientConfig } = {};

	// Start at 0 connected clients
	connections = 0;

	// Start the cluster in DISABLED state
	status = ClusterStatus.DISABLED;

	// Start counting request IDs at 0
	requestCounter = 0;

	// Initialize an empty dictionary for keeping track of request resolvers
	requestPromises: { [index: number]: Promise<Error | RequestResponse>[] } = {};

	// Lock to prevent concurrency race conditions when sending requests.
	requestLock = new Mutex();

	// Lock to prevent concurrency race conditions when receiving responses.
	responseLock = new Mutex();

  unsubscribes: WeakMap<object, Function> = new WeakMap();

	clusterOptions: ClusterOptions;

	timeout: number = DefaultParameters.TIMEOUT;
	/**
	 * @param {number} confidence     wait for this number of hosts to provide identical results.
	 * @param {number} distribution   request information from this number of hosts.
	 * @param {ClusterOrder} order    select hosts to communicate with in this order.
	 * @param {number} timeoutConnect how long network delays we will wait for before taking action, in milliseconds.
	 * @param {any} rest 							rest parameters which (if defined) will become the defaults for servers added with addServer
	 */
	constructor({
		distribution = DefaultParameters.CLUSTER_DISTRIBUTION,
		confidence = DefaultParameters.CLUSTER_CONFIDENCE,
		order = DefaultParameters.CLUSTER_ORDER,
		timeoutConnect = DefaultParameters.TIMEOUT,
		...rest
	}: ClusterOptions)
	{
		// Initialize the event emitter.
		super();

		this.timeout = timeoutConnect;
		this.clusterOptions = {distribution, confidence, order, ...rest};

		// Initialize strategy.
		this.strategy = {
			distribution,
			confidence,
			order,
		};

		// Write a log message.
		debug.cluster(`Initialized empty cluster (${confidence} of ${distribution || 'ALL'})`);

		// Print out a warning if we cannot guarantee consensus for subscription notifications.
		// Case 1: we don't know how many servers will be used, so warning just to be safe
		// Case 2: we know the number of servers needed to trust a response is less than 50%.
		if((distribution === ClusterDistribution.ALL) || (confidence / distribution <= 0.50))
		{
			debug.warning(`Subscriptions might return multiple valid responses when confidence (${confidence}) is less than 51% of distribution.`);
		}
	}

  on(eventName: string | symbol, listener: (...args: any[]) => void): this {
    return this.addListener(eventName, listener);
  }

  // Same as subscribe but the subscription will not be finalized immediately
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
    super.on(eventName, listener);
    this.subscribe(listener, eventName as string).then((cancelFn) => {
      this.unsubscribes.set(listener, cancelFn);
    });

    return this;
  }

  off(eventName: string | symbol, listener: (...args: any[]) => void): this {
    return this.removeListener(eventName, listener);
  }

  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
    super.off(eventName, listener);
    const cancelFn = this.unsubscribes.get(listener);
    if (cancelFn) {
      cancelFn();
    }
    this.unsubscribes.delete(listener);
    return this;
  }

	/**
	 * Adds a server to the cluster.
	 *
	 * @param {string} host              fully qualified domain name or IP number of the host.
	 * @param {number} port              the TCP network port of the host.
	 * @param {TransportScheme} scheme   the transport scheme to use for connection
	 * @param {boolean} autoConnect      flag indicating whether the server should automatically connect (default true)
	 *
	 * @throws {Error} if the cluster's version is not a valid version string.
	 * @returns a promise that resolves when the connection has been initiated.
	 */
	async addServer(options: PeerOptions, autoConnect: boolean = true): Promise<void>
	{
		// Set up a new electrum client.
		const client = new Peer({...options, ...this.clusterOptions});

    const { node, port, wsProxyNode, wsProxyPort } = options;

		// Store this client.
		this.clients[`${node}:${port}:${wsProxyNode}:${wsProxyPort}`] =
		{
			state: ClientState.UNAVAILABLE,
			connection: client,
      options: options
		};

		/**
		 * Define a helper function to evaluate and log cluster status.
		 *
		 * @fires Cluster#ready
		 * @fires Cluster#degraded
		 * @fires Cluster#disabled
		 */
		const updateClusterStatus = (): void =>
		{
			// Calculate the required distribution, taking into account that distribution to all is represented with 0.
			const distribution = Math.max(this.strategy.confidence, this.strategy.distribution);

			// Check if we have enough connections to saturate distribution.
			if(this.connections >= distribution)
			{
				// If the cluster is not currently considered ready..
				if(this.status !== ClusterStatus.READY)
				{
					// Mark the cluster as ready.
					this.status = ClusterStatus.READY;

					// Emit the ready signal to indicate the cluster is running in a ready mode.
					this.emit('ready');

					// Write a log message with an update on the current cluster status.
					debug.cluster(`Cluster status is ready (currently ${this.connections} of ${distribution} connections available.)`);
				}
			}

			// If we still have enough available connections to reach confidence..
			else if(this.connections >= this.strategy.confidence)
			{
				// If the cluster is not currently considered degraded..
				if(this.status !== ClusterStatus.DEGRADED)
				{
					// Mark the cluster as degraded.
					this.status = ClusterStatus.DEGRADED;

					// Emit the degraded signal to indicate the cluster is running in a degraded mode.
					this.emit('degraded');

					// Write a log message with an update on the current cluster status.
					debug.cluster(`Cluster status is degraded (only ${this.connections} of ${distribution} connections available.)`);
				}
			}

			// If we don't have enough connections to reach confidence..
			// .. and the cluster is not currently considered disabled..
			else if(this.status !== ClusterStatus.DISABLED)
			{
				// Mark the cluster as disabled.
				this.status = ClusterStatus.DISABLED;

				// Emit the degraded signal to indicate the cluster is disabled.
				this.emit('disabled');

				// Write a log message with an update on the current cluster status.
				debug.cluster(`Cluster status is disabled (only ${this.connections} of the ${distribution} connections are available.)`);
			}
		};

		// Define a function to run when client has connects.
		const onConnect = async (): Promise<void> =>
		{
			// Wrap in a try-catch so we can ignore errors.
			try
			{
				// Check connection status
				// const connectionStatus = client.connection.status;
        const connectionStatus = client.connected ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED;

				// If the connection is fine..
				if(connectionStatus === ConnectionStatus.CONNECTED)
				{
					// If this was from an unavailable connection..
					if(this.clients[`${node}:${port}:${wsProxyNode}:${wsProxyPort}`].state === ClientState.UNAVAILABLE)
					{
						// Update connection counter.
						this.connections += 1;
					}

					// Set client state to available.
					this.clients[`${node}:${port}:${wsProxyNode}:${wsProxyPort}`].state = ClientState.AVAILABLE;

					// update the cluster status.
					updateClusterStatus();
				}
			}
			catch(error)
			{
				// Do nothing.
			}
		};

		// Define a function to run when client disconnects.
		const onDisconnect = (): void =>
		{
			// If this was from an established connection..
			if(this.clients[`${node}:${port}:${wsProxyNode}:${wsProxyPort}`].state === ClientState.AVAILABLE)
			{
				// Update connection counter.
				this.connections -= 1;
			}

			// Set client state to unavailable.
			this.clients[`${node}:${port}:${wsProxyNode}:${wsProxyPort}`].state = ClientState.UNAVAILABLE;

			// update the cluster status.
			updateClusterStatus();
		};

		// Set up handlers for connection and disconnection.
		client.on('connected', onConnect.bind(this));
		// client.on('disconnect', onDisconnect.bind(this));
    client.on('disconnected', onDisconnect.bind(this));

		// Connect if auto-connect is set to true, returning the connection result.
		if(autoConnect)
		{
			// Set up the connection.
			await client.connect();
		}
	}

	/**
	 * Calls a method on the remote server with the supplied parameters.
	 *
   * @param {boolean}   requireIntegrity ensure all connections within strategy respond with the same data
	 * @param {string}    method           name of the method to call.
	 * @param {...string} parameters       one or more parameters for the method.
	 *
	 * @throws {Error} if not enough clients are connected
	 * @throws {Error} if no response is received with sufficient integrity
	 * @returns a promise that resolves with the result of the method.
	 */
	async request(requireIntegrity: boolean, method: string, ...parameters: RPCParameter[]): Promise<RequestResponse> //Promise<Error | RequestResponse | RequestResponse[]>
	{
		// Check if the cluster is unable to serve requests.
		if(this.status === ClusterStatus.DISABLED)
		{
			throw(new Error(`Cannot request '${method}' when available clients (${this.connections}) is less than required confidence (${this.strategy.confidence}).`));
		}

		// Lock this request method temporarily.
		const unlock = await this.requestLock.acquire();

		// Declare requestId outside of try-catch scope.
		let requestId = 0;

		// NOTE: If this async method is called very rapidly, it's theoretically possible that the parts below could interfere.
		try
		{
			// Increase the current request counter.
			this.requestCounter += 1;

			// Copy the request counter so we can work with the copy and know it won't change
			// even if the request counter is raised from concurrent requests.
			requestId = this.requestCounter;
		}
		finally
		{
			// Unlock this request method now that the concurrency sensitive condition is completed.
			unlock();
		}

		// Initialize an empty list of request promises.
		this.requestPromises[requestId] = [];

		// Extract all available client IDs
		const availableClientIDs = Object.keys(this.clients)
			.filter((clientID) => this.clients[clientID].state === ClientState.AVAILABLE);

		// Initialize a sent counter.
		let sentCounter = 0;

		// Determine the number of clients we need to send to, taking ClusterDistribution.ALL (=0) into account.
		let requiredDistribution = (this.strategy.distribution || availableClientIDs.length);

		// If the cluster is in degraded status, we do not have enough available clients to
		// match distribution, but still enough to reach consensus, so we use the clients we have.
		if(this.status === ClusterStatus.DEGRADED)
		{
			requiredDistribution = availableClientIDs.length;
		}

		// Repeat until we have sent the request to the desired number of clients.
		while(sentCounter < requiredDistribution)
		{
			// Pick an array index according to our ordering strategy.
			let currentIndex = 0;

			// Use a random array index when cluster order is set to RANDOM
			if(this.strategy.order === ClusterOrder.RANDOM)
			{
				currentIndex = Math.floor(Math.random() * availableClientIDs.length);
			}

			// Move a client identity from the client list to its own variable.
			const [ currentClient ] = availableClientIDs.splice(currentIndex, 1);

			// Send the request to the client and store the request promise.
      const connection = this.clients[currentClient].connection;
			const requestPromise = (connection[method as keyof (typeof connection)] as Function).call(connection, ...parameters);
			this.requestPromises[requestId].push(requestPromise);

			// Increase the sent counter.
			sentCounter += 1;
		}

		// Define a function to poll for request responses.
		const pollResponse = (resolve: ResolveFunction<RequestResponse>, reject: RejectFunction): void =>
		{
			// Define a function to resolve request responses based on integrity.
			const resolveRequest = async (): Promise<void> =>
			{
				// Set up an empty set of response data.
				const responseData: { [index: string]: number } = {};

				// Set up a counter to keep track of how many responses we have checked.
				let checkedResponses = 0;
        const responses: any[] = [];
				const rejections: any[] = [];

				// For each server we issued a request to..
				for(const currentPromise in this.requestPromises[requestId])
				{
					// Race the request promise against a pre-resolved request to determine promise status.
					const promises = [ this.requestPromises[requestId][currentPromise], Promise.resolve(undefined) ];

					// catch and rethrow the error to prevent the promise rejection to be considered unhandled in some environments
					let response;
					let rejectError;
					try {
						response = await Promise.race(promises);
					} catch (error) {
						rejectError = error;
					}

					// If the promise is rejected..
					if(rejectError !== undefined)
					{
						// Increase the counter for checked responses.
						checkedResponses += 1;
						rejections.push(rejectError);

						// Check rejection count according to our confidence strategy
						if (rejections.length > this.connections - this.strategy.confidence) {
							// const rejectMessage = rejections.map(val => val.message).filter((value, index, array) => array.indexOf(value) === index).join("\n");

							// Write log entry.
							debug.cluster(`Obtained too much request rejections (${rejections.length}) for '${method}' with cluster confidence (${this.strategy.confidence}).`);

							// Reject the request with the message.
							reject(rejectError);

							// Return after resolving since we do not want to continue the execution.
							return;
						}
          }

					// If the promise is settled..
					if(response !== undefined)
					{
						// Increase the counter for checked responses.
						checkedResponses += 1;

            if (requireIntegrity) {
              // Calculate a unique identifier for this notification data.
              const responseDataIdentifier = JSON.stringify(response);

              // Either set the response data counter or increase it.
              if(responseData[responseDataIdentifier] === undefined)
              {
                responseData[responseDataIdentifier] = 1;
              }
              else
              {
                responseData[responseDataIdentifier] += 1;
              }

              // Check if this response has enough integrity according to our confidence strategy.
              if(responseData[responseDataIdentifier] === this.strategy.confidence)
              {
                // Write log entry.
                debug.cluster(`Validated response for '${method}' with sufficient integrity (${this.strategy.confidence}).`);

                // Resolve the request with this response.
                resolve(response);

                // Return after resolving since we do not want to continue the execution.
                return;
              }
            } else {
              responses.push(response);

              if (checkedResponses >= this.strategy.confidence) {
              resolve(responses);
              return;
              }
            }
          }
				}

				// If all clients have responded but we failed to reach desired integrity..
				if(checkedResponses === this.requestPromises[requestId].length)
				{
					// Reject this request with an error message.
					reject(new Error(`Unable to complete request for '${method}', response failed to reach sufficient integrity (${this.strategy.confidence}).`));

					// Return after rejecting since we do not want to continue the execution.
					return;
				}

				// If we are not ready, but have not timed out and should wait more..
				setTimeout(resolveRequest, 1000);
			};

			// Attempt the initial resolution of the request.
			resolveRequest();
		};

		// return some kind of promise that resolves when integrity number of clients results match.
		return new Promise(pollResponse);
	}

	/**
	 * Subscribes to the method at the cluster and attaches the callback function to the event feed.
	 *
	 * @param {function}  callback     a function that should get notification messages.
	 * @param {string}    method       one of the subscribable methods the server supports.
	 *
	 * @throws {Error} if not enough clients are connected
	 * @throws {Error} if no response is received with sufficient integrity for the initial request
	 * @returns a promise resolving to true when the subscription is set up.
	 */
	async subscribe(callback: SubscribeCallback, method: string): Promise<Function>
	{
    	// Set up an empty set of notification data.
	  const notifications: { [index: string]: number } = {};
		// Define a function resolve the subscription setup process.
		const subscriptionResolver = async (resolve: ResolveFunction<Function>): Promise<void> =>
		{
			// Define a callback function to validate server notifications and pass
			// them to the subscribe callback.
			const subscriptionResponder = async (data: Error | RequestResponse): Promise<void> =>
			{
				// Lock this response method temporarily.
				const unlock = await this.responseLock.acquire();

				try
				{
					// Calculate a unique identifier for this notification data.
					const responseDataIdentifier = JSON.stringify(data);

					// Either set the notification counter or increase it.
					if(notifications[responseDataIdentifier] === undefined)
					{
						notifications[responseDataIdentifier] = 1;
					}
					else
					{
						notifications[responseDataIdentifier] += 1;
					}

					// set responses to be garbage collected
					setTimeout(() => delete notifications[responseDataIdentifier], 30000);

					// Check if this notification has enough integrity according to our confidence strategy.
					if(notifications[responseDataIdentifier] === this.strategy.confidence)
					{
						// Write log entry.
						debug.cluster(`Validated notification for '${method}' with sufficient integrity (${this.strategy.confidence}).`);

						// Send the notification data to the callback function.
						callback(data);
					}
				}
				finally
				{
					// Unlock the response method so it can handle the next set of data.
					unlock();
				}
			};

			// Set up event listener for this subscription.
			for(const currentClient in this.clients)
			{
				// Copy the current client for brevity.
				const client = this.clients[currentClient].connection;

				// If this method is not yet being listened on..
				if(!client.listeners(method).includes(subscriptionResponder))
				{
					// Set up event listener for this subscription.
					client.addListener(method, subscriptionResponder);
				}
			}

      const unsubscribeFunction = () => {
        for(const currentClient in this.clients)
        {
          // Copy the current client for brevity.
          const client = this.clients[currentClient].connection;

          // If this method is not yet being listened on..
          if(client.listeners(method).includes(subscriptionResponder))
          {
            // Set up event listener for this subscription.
            client.removeListener(method, subscriptionResponder);
          }
        }
      }
      resolve(unsubscribeFunction);
		};

		// Return a promise that resolves when the subscription is set up.
		return new Promise(subscriptionResolver);
	}

	/**
	 * Provides a method to check or wait for the cluster to become ready.
	 *
	 * @returns a promise that resolves when the required servers are available.
	 */
	async ready(): Promise<boolean>
	{
		// Store the current timestamp.
		const readyTimestamp = Date.now();

		// Define a function to poll for availability of the cluster.
		const availabilityPoller = (resolve: ResolveFunction<boolean>): void =>
		{
			// Define a function to check if the cluster is ready to be used.
			const connectionAvailabilityVerifier = (): void =>
			{
				// Check if the cluster is active..
				if(this.status === ClusterStatus.READY)
				{
					// Resolve with true to indicate that the cluster is ready to use.
					resolve(true);

					// Return after resolving since we do not want to continue the execution.
					return;
				}

				// Calculate how long we have waited, in milliseconds.
				const timeWaited = (Date.now() - readyTimestamp);

				// Check if we have waited longer than our timeout setting.
				if(timeWaited > this.timeout)
				{
					// Resolve with false to indicate that we did not get ready in time.
					resolve(false);

					// Return after resolving since we do not want to continue the execution.
					return;
				}

				// If we are not ready, but have not timed out and should wait more..
				setTimeout(connectionAvailabilityVerifier, 50);
			};

			// Run the initial verification.
			connectionAvailabilityVerifier();
		};

		// Return a promise that resolves when the available clients is sufficient.
		return new Promise(availabilityPoller);
	}

  /**
   * Force connect all added servers
   */
  async connect(): Promise<boolean> {
    await Promise.all(Object.values(this.clients).filter(client => !client.connection.connected).map(client => client.connection.connect()));
    return await this.ready();
  }

	/**
	 * Connects all servers from the cluster and attaches event listeners and handlers
	 * for all underlying clients and connections.
	 *
	 * @throws {Error} if the cluster's version is not a valid version string.
	 */
	async startup(): Promise<void[]>
	{
		// Write a log message.
		debug.cluster('Starting up cluster.');

		// Keep track of all connections
		const connections = [];

		// Loop over all clients and reconnect them if they're disconnected
		for(const clientKey in this.clients)
		{
			// Retrieve connection information for the client
			const options = this.clients[clientKey].options;
      const { node, port, wsProxyNode, wsProxyPort } = options;

			// Only connect currently unavailable/disconnected clients
			if(this.clients[clientKey].state === ClientState.AVAILABLE)
			{
				// Warn when a server is already connected when calling startup()
				debug.warning(`Called startup(), but server ${node}:${port}:${wsProxyNode}:${wsProxyPort} is already connected`);
			}
			else
			{
				// Call the addServer() function with the existing connection data
				// This effectively reconnects the server and re-instates all event listeners
				connections.push(this.addServer(options));
			}
		}

		// Await all connections
		return Promise.all(connections);
	}

  /**
   * Alias for shutdown
   */
  async disconnect(): Promise<void[]> {
    return await this.shutdown();
  }

	/**
	 * Disconnects all servers from the cluster. Removes all event listeners and
	 * handlers from all underlying clients and connections. This includes all
	 * active subscriptions, unless retainSubscriptions is set to true.
	 *
	 * @param {boolean} retainSubscriptions   retain subscription data so they will be restored on reconnection.
	 *
	 * @returns a list with the disconnection result for every client
	 */
	async shutdown(retainSubscriptions: boolean = false): Promise<void[]>
	{
		// Write a log message.
		debug.cluster('Shutting down cluster.');

		// Set up a list of disconnections to wait for.
		const disconnections: void[] = [];

		const disconnectResolver = (resolve: ResolveFunction<void[]>): void =>
		{
			// Resolve once the cluster is marked as disabled
			this.once('disabled', () => resolve(Promise.all(disconnections)));

			// For each client in this cluster..
			for(const clientIndex in this.clients)
			{
				// Force disconnection regardless of current status.
				disconnections.push(this.clients[clientIndex].connection.disconnect(false));
			}
		};

		// Return a list of voids indicating disconnections from all clients
		return new Promise<void[]>(disconnectResolver);
	}

  /// Helper Methods
  async getHeaders({
    from,
    to,
    timeoutSeconds = 60 * 1,
  }: {
    from?: GetHeadersOptions["from"];
    to?: GetHeadersOptions["to"];
    timeoutSeconds?: number;
  }): Promise<Header[]> {
    return this.request(true, "getHeaders", { from, to, timeoutSeconds }) as Promise<Header[]>;
  }

  async getBlockHashes({
    from,
    to,
    timeoutSeconds = 60 * 1,
  }: {
    from?: GetHeadersOptions["from"];
    to?: GetHeadersOptions["to"];
    timeoutSeconds?: number;
  }): Promise<Header[]> {
    return this.request(true, "getBlockHashes", { from, to, timeoutSeconds }) as Promise<Header[]>;
  }

  async getMempool(): Promise<Buffer[]> {
    return this.request(true, "getMempool") as Promise<Buffer[]>;
  }

  async getMempoolTransactions(): Promise<Transaction[]> {
    return this.request(true, "getMempoolTransactions") as Promise<Transaction[]>;
  }

  // broadcast already signed transaction
  async broadcastTransaction(transaction: Transaction, timeoutSeconds: number = 60 * 1): Promise<Buffer> {
    return this.request(true, "broadcastTransaction", transaction, timeoutSeconds) as Promise<Buffer>;
  }

  // broadcast already signed transactions
  async broadcastTransactions(
    transactions: Transaction[],
    timeoutSeconds: number = 60 * 5
  ): Promise<Buffer[]> {
    return this.request(true, "broadcastTransactions", transactions, timeoutSeconds) as Promise<Buffer[]>;
  }

  async getRawTransactions(txHashes: Buffer[]): Promise<Buffer[]> {
    return this.request(true, "getRawTransactions", txHashes) as Promise<Buffer[]>;
  }

  async getRawTransaction(txHash: Buffer): Promise<Buffer> {
    return this.request(true, "getRawTransaction", txHash) as Promise<Buffer>;
  }

  async getTransactions(txHashes: Buffer[]): Promise<Transaction[]> {
    return this.request(true, "getTransactions", txHashes) as Promise<Transaction[]>;
  }

  async getTransaction(txHash: Buffer): Promise<Transaction> {
    return this.request(true, "getTransaction", txHash) as Promise<Transaction>;
  }

  async getBlocks(blockHashes: Buffer[]): Promise<Block[]> {
    return this.request(true, "getBlocks", blockHashes) as Promise<Block[]>;
  }

  async getBlock(blockHash: Buffer): Promise<Block> {
    return this.request(true, "getBlock", blockHash) as Promise<Block>;
  }

  watchNewBlocks(callback: (blockHash: Buffer) => void): CancelWatch {
    this.on("new_block", callback);
    return () => {
      this.off("new_block", callback);
    }
  }

  watchMempoolTransactionHashes(callback: (txHash: Buffer) => void): CancelWatch {
    this.on("new_tx", callback);
    return () => {
      this.off("new_tx", callback);
    }
  }

  watchMempoolRawTransactions(callback: (rawTransaction: Buffer) => void): CancelWatch {
    const wrapper = async (txHash: Buffer) => {
      callback(await this.getRawTransaction(txHash));
    }
    this.on("new_tx", wrapper);
    return () => {
      this.off("new_tx", wrapper);
    }
  }

  watchMempoolTransactions(callback: (transaction: Transaction) => void): CancelWatch {
    const wrapper = async (txHash: Buffer) => {
      callback(await this.getTransaction(txHash));
    }
    this.on("new_tx", wrapper);
    return () => {
      this.off("new_tx", wrapper);
    }
  }

  watchAddressTransactions(cashaddr: string, callback: (transaction: Transaction) => void): CancelWatch {
    const decoded = CashAddress.decode(cashaddr);
    const wrapper = async (txHash: Buffer) => {
      const transaction = await this.getTransaction(txHash);
      const scriptBuffers = [
        ...transaction.inputs.map(input => input.scriptBuffer),
        ...transaction.outputs.map(output => output.scriptBuffer)
      ];
      const addressBuffers = scriptBuffers.map(buffer => Script.fromBuffer(buffer).toAddressBuf());
      if (addressBuffers.some(addressBuf =>
          addressBuf?.length === decoded[2].length &&
          addressBuf?.every(function(value, index) { return value === decoded[2][index]})
        )) {
        callback(transaction);
      }
    }
    this.on("new_tx", wrapper);
    return () => {
      this.off("new_tx", wrapper);
    }
  }

  async getRawDSProofs(dspIds: Buffer[]): Promise<Buffer[]> {
    return this.request(true, "getRawDSProofs", dspIds) as Promise<Buffer[]>;
  }

  async getRawDSProof(dspId: Buffer): Promise<Buffer> {
    return this.request(true, "getRawDSProof", dspId) as Promise<Buffer>;
  }

  async getDSProofs(dspIds: Buffer[]): Promise<DSProof[]> {
    return this.request(true, "getDSProofs", dspIds) as Promise<DSProof[]>;
  }

  async getDSProof(dspId: Buffer): Promise<DSProof> {
    return this.request(true, "getDSProof", dspId) as Promise<DSProof>;
  }

  watchDSProofIds(callback: (dspId: Buffer) => void): CancelWatch {
    this.on("new_dsproof", callback);
    return () => {
      this.off("new_dsproof", callback);
    }
  }

  watchRawDSProofs(callback: (rawDsProof: Buffer) => void): CancelWatch {
    const wrapper = async (dspId: Buffer) => {
      callback(await this.getRawDSProof(dspId));
    }
    this.on("new_dsproof", wrapper);
    return () => {
      this.off("new_dsproof", wrapper);
    }
  }

  watchDSProofs(callback: (dsProof: DSProof) => void): CancelWatch {
    const wrapper = async (dspId: Buffer) => {
      callback(await this.getDSProof(dspId));
    }
    this.on("new_dsproof", wrapper);
    return () => {
      this.off("new_dsproof", wrapper);
    }
  }

  async getPeerAddresses(timeoutSeconds: number = 60 * 2): Promise<NetAddress[][]> {
    return this.request(false, "getAddr", timeoutSeconds) as Promise<NetAddress[][]>;
  }

  async ping(timeoutSeconds: number = 30): Promise<number[]> {
    return this.request(false, "ping", timeoutSeconds) as Promise<number[]>;
  }
}


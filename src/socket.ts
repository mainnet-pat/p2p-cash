import tls from 'tls';
import net from 'net';
import WebSocket, { MessageEvent, ErrorEvent } from 'isomorphic-ws';
import { EventEmitter } from 'events';
import { TransportScheme, ElectrumTransport, ConnectionOptions, debug } from './interfaces';

/**
 * Isomorphic Socket interface supporting TCP sockets and WebSockets (Node and browser).
 * The interface is a subset of the TLSSocket interface with some slight modifications.
 * It can be expanded when more socket functionality is needed in the rest of the
 * electrum-cash code. Changes from the TLSSocket interface (besides it being a subset):
 * - Event 'close' -> 'disconnect'
 * - New function socket.disconnect()
 *
 * @ignore
 */
class Socket extends EventEmitter
{
	// Declare an empty TCP socket.
	tcpSocket?: net.Socket;

	// Declare an empty WebSocket.
	webSocket?: WebSocket;

	// Declare timers for keep-alive pings and reconnection
	timers: {
		// eslint-disable-next-line no-undef
		retryConnection?: NodeJS.Timer;
		// eslint-disable-next-line no-undef
		disconnect?: NodeJS.Timer;
	} = {};

	// Initialize boolean that indicates whether the onConnect function has run (initialize to false).
	onConnectHasRun = false;

	// Remote proxy connection acknowledgement
	readonly ackHex: string = "50585941434b";
	useConnectionString: boolean = true;

	host: string = "";
	port: number = 0;
	wsProxyHost?: string;
	wsProxyPort?: number;

	// Initialize event forwarding functions.
	eventForwarders =
	{
		disconnect: ()                => this.disconnect(),
		tcpData: (data: string)       => this.emit('data', data),
		wsData: (event: MessageEvent) => {
			const data = Buffer.from(event.data as ArrayBuffer);
			if (this.useConnectionString) {
				if (!this.onConnectHasRun && data.toString("hex") === this.ackHex) {
					// Indicate that the onConnect function has run.
					this.onConnectHasRun = true;

					// Emit the connect event.
					this.emit('connect');
				} else {
					this.emit('data', data);
				}
			} else {
				this.emit('data', data);
			}
		},
		tcpError: (err: Error)        => this.emit('error', err),
		wsError: (event: ErrorEvent)  => this.emit('error', event.error),
	};

	/**
	 * Connect to host:port using the specified transport
	 *
	 * @param {string} host              Fully qualified domain name or IP address of the host
	 * @param {number} port              Network port for the host to connect to
	 * @param {TransportScheme} scheme   Transport scheme to use
	 * @param {number} timeout           If no connection is established after `timeout` ms, the connection is terminated
	 *
	 * @throws {Error} if an incorrect transport scheme is specified
	 */
	connect(host: string, port: number, scheme: TransportScheme, timeout: number, wsProxyHost?: string, wsProxyPort?: number): void
	{
		this.host = host;
		this.port = port;
		this.wsProxyHost = wsProxyHost;
		this.wsProxyPort = wsProxyPort;

		// Check that no existing socket exists before initiating a new connection.
		if(this.tcpSocket || this.webSocket)
		{
			throw(new Error('Cannot initiate a new socket connection when an existing connection exists'));
		}

		/// Do not use this timeout on socket level, we do this on Peer level
		// Set a timer to force disconnect after `timeout` seconds
		// this.timers.disconnect = setTimeout(() => this.disconnectOnTimeout(host, port, timeout), timeout);

		// Remove the timer if a connection is successfully established
		this.once('connect', this.clearDisconnectTimerOnTimeout);

		// Define how to refer to the connection scheme in debug output.
		const socketTypes =
		{
			[ElectrumTransport.TCP.Scheme]:     'a TCP Socket',
			[ElectrumTransport.TCP_TLS.Scheme]: 'an encrypted TCP socket',
			[ElectrumTransport.WS.Scheme]:      'a WebSocket',
			[ElectrumTransport.WSS.Scheme]:     'an encrypted WebSocket',
		};

		// Log that we are trying to establish a connection.
		debug.network(`Initiating ${socketTypes[scheme]} connection to '${host}:${port}'.`);

		if(scheme === ElectrumTransport.TCP.Scheme || scheme === ElectrumTransport.TCP_TLS.Scheme)
		{
			if(scheme === ElectrumTransport.TCP_TLS.Scheme)
			{
				// Initialize connection options.
				const connectionOptions: ConnectionOptions = { rejectUnauthorized: false };

				// If the hostname is not an IP address..
				if(!net.isIP(host))
				{
					// Set the servername option which enables support for SNI.
					// NOTE: SNI enables a server that hosts multiple domains to provide the appropriate TLS certificate.
					connectionOptions.serverName = host;
				}

				// Initialize this.tcpSocket (allowing self-signed certificates).
				this.tcpSocket = tls.connect(port, host, connectionOptions);

				// Add a 'secureConnect' listener that checks the authorization status of
				// the socket, and logs a warning when it uses a self signed certificate.
				this.tcpSocket.once('secureConnect', () =>
				{
					// Cannot happen, since this event callback *only* exists on TLSSocket
					if(!(this.tcpSocket instanceof tls.TLSSocket)) return;

					// Force cast authorizationError from Error to string (through unknown)
					// because it is incorrectly typed as an Error
					const authorizationError = (this.tcpSocket.authorizationError as unknown) as string;
					if(authorizationError === 'DEPTH_ZERO_SELF_SIGNED_CERT')
					{
						debug.warning(`Connection to ${host}:${port} uses a self-signed certificate`);
					}
				});

				// Trigger successful connection events.
				this.tcpSocket.on('secureConnect', this.onConnect.bind(this, socketTypes[scheme], host, port));
			}
			else
			{
				// Initialize this.tcpSocket.
				this.tcpSocket = net.connect({ host, port });

				// Trigger successful connection events.
				this.tcpSocket.on('connect', this.onConnect.bind(this, socketTypes[scheme], host, port));
			}

			// Configure encoding.
			// this.tcpSocket.setEncoding('binary');

			// Enable persistent connections with an initial delay of 0.
			this.tcpSocket.setKeepAlive(true, 0);

			// Disable buffering of outgoing data.
			this.tcpSocket.setNoDelay(true);

			// Forward the encountered errors.
			this.tcpSocket.on('error', this.eventForwarders.tcpError);
		}
		else if(scheme === ElectrumTransport.WS.Scheme || scheme === ElectrumTransport.WSS.Scheme)
		{
			if(scheme === ElectrumTransport.WSS.Scheme)
			{
				// Initialize this.webSocket (rejecting self-signed certificates).
				// We reject self-signed certificates to match functionality of browsers.
				this.webSocket = new WebSocket(`wss://${wsProxyHost}:${wsProxyPort}`);
			}
			else
			{
				// Initialize this.webSocket.
				this.webSocket = new WebSocket(`ws://${wsProxyHost}:${wsProxyPort}`);
			}

			this.webSocket.binaryType = "arraybuffer";
			// Trigger successful connection events.
			this.webSocket.addEventListener('open', this.onConnect.bind(this, socketTypes[scheme], wsProxyHost!, wsProxyPort!));

			// Forward the encountered errors.
			this.webSocket.addEventListener('error', this.eventForwarders.wsError);
		}
		else
		{
			// Throw an error if an incorrect transport is specified
			throw(new Error('Incorrect transport specified'));
		}
	}

	/**
	 * Sets up forwarding of events related to the connection.
	 *
	 * @param {string} connectionType   Name of the connection/transport type, used for logging.
	 * @param {string} host             Fully qualified domain name or IP address of the host
	 * @param {number} port             Network port for the host to connect to
	 */
	onConnect(connectionType: string, host: string, port: number): void
	{
		// If the onConnect function has already run, do not execute it again.
		if(this.onConnectHasRun) return;

		// Log that the connection has been established.
		debug.network(`Established ${connectionType} connection with '${host}:${port}'.`);

		if(typeof this.tcpSocket !== 'undefined')
		{
			// Forward the socket events
			this.tcpSocket.addListener('close', this.eventForwarders.disconnect);
			this.tcpSocket.addListener('data', this.eventForwarders.tcpData);

			// Indicate that the onConnect function has run.
			this.onConnectHasRun = true;

			// Emit the connect event.
			this.emit('connect');
		}
		else if(typeof this.webSocket !== 'undefined')
		{
			// Forward the socket events
			this.webSocket.addEventListener('close', this.eventForwarders.disconnect);
			this.webSocket.addEventListener('message', this.eventForwarders.wsData);

			if (this.useConnectionString) {
				// write connection string and wait for response
				this.write(Buffer.from(JSON.stringify({addr: this.host, port: this.port})));
			} else {
				this.onConnectHasRun = true;
				// Emit the connect event.
				this.emit('connect');
			}
		}
	}

	/**
	 * Clears the disconnect timer if it is still active.
	 */
	private clearDisconnectTimerOnTimeout(): void
	{
		// Clear the retry timer if it is still active.
		if(this.timers.disconnect)
		{
			clearTimeout(this.timers.disconnect);
			this.timers.disconnect = undefined;
		}
	}

	destroy(): void {
		if (this.onConnectHasRun) {
			this.disconnect();
		}
	}

	/**
	 * Forcibly terminate the connection.
	 *
	 * @throws {Error} if no connection was found
	 */
	disconnect(): void
	{
		// Clear the disconnect timer so that the socket does not try to disconnect again later.
		this.clearDisconnectTimerOnTimeout();

		// Handle disconnect based differently depending on socket type.
		if(this.tcpSocket)
		{
			// Remove all event forwarders.
			this.tcpSocket.removeListener('close', this.eventForwarders.disconnect);
			this.tcpSocket.removeListener('data', this.eventForwarders.tcpData);
			this.tcpSocket.removeListener('error', this.eventForwarders.tcpError);

			// Terminate the connection.
			this.tcpSocket.destroy();

			// Remove the stored socket.
			this.tcpSocket = undefined;
		}
		else if(this.webSocket)
		{
			try
			{
				// Remove all event forwarders.
				this.webSocket.removeEventListener('close', this.eventForwarders.disconnect);
				this.webSocket.removeEventListener('message', this.eventForwarders.wsData);
				this.webSocket.removeEventListener('error', this.eventForwarders.wsError);

				// Gracefully terminate the connection.
				this.webSocket.close();
			}
			catch(ignored)
			{
				// close() will throw an error if the connection has not been established yet.
				// We ignore this error, since no similar error gets thrown in the TLS Socket.
			}
			finally
			{
				// Remove the stored socket regardless of any thrown errors.
				this.webSocket = undefined;
			}
		}

		// Indicate that the onConnect function has not run and it has to be run again.
		this.onConnectHasRun = false;

		// Emit a disconnect event
		this.emit('disconnect');
	}

	/**
	 * Write data to the socket
	 *
	 * @param {Uint8Array | string} data   Data to be written to the socket
	 * @param {function} callback          Callback function to be called when the write has completed
	 *
	 * @throws {Error} if no connection was found
	 * @returns true if the message was fully flushed to the socket, false if part of the message
	 * is queued in the user memory
	 */
	write(data: Uint8Array | string, callback?: (err?: Error) => void): boolean
	{
		if(this.tcpSocket)
		{
			// Write data to the TLS Socket and return the status indicating whether the
			// full message was flushed to the socket
			return this.tcpSocket.write(data, callback);
		}
		if(this.webSocket)
		{
			// Write data to the WebSocket
			this.webSocket.send(data, callback);

			// WebSockets always fit everything in a single request, so we return true
			return true;
		}

		// Throw an error if no active connection is found
		throw(new Error('Cannot write to socket when there is no active connection'));
	}

	/**
	 * Force a disconnection if no connection is established after `timeout` milliseconds.
	 *
	 * @param {string} host      Host of the connection that timed out
	 * @param {number} port      Port of the connection that timed out
	 * @param {number} timeout   Elapsed milliseconds
	 */
	disconnectOnTimeout(host: string, port: number, timeout: number): void
	{
		// Remove the connect listener.
		this.removeListener('connect', this.clearDisconnectTimerOnTimeout);

		console.trace('timeout');
		// Create a new timeout error.
		const timeoutError = { code: 'ETIMEDOUT', message: `Connection to '${host}:${port}' timed out after ${timeout} milliseconds` };

		// Emit an error event so that connect is rejected upstream.
		this.emit('error', timeoutError);

		// Forcibly disconnect to clean up the connection on timeout
		this.disconnect();
	}
}

// export the socket.
export default Socket;

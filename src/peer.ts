import EventEmitter from "events";
import Crypto from "crypto";
import { Block, BlockStream, Transaction, Header, DSProof, Script } from "bitcoin-minimal";
import {
  Message,
  Headers,
  Inv,
  Version,
  GetData,
  Reject,
  Address,
} from "./messages";
import { NetAddress } from "./messages/address";
import { MAGIC_NUMS, MAX_PER_MSG, VERSIONS } from "./config";
import { GetHeadersOptions } from "./messages/headers";
import { VersionOptions } from "./messages/version";
import CustomEvents from "./events";
import Socket from "./socket";
import { CashAddress, Hash } from "bitcoin-minimal/lib/utils";
import { CancelWatch, DefaultParameters, PeerOptions, debug } from "./interfaces";

export class Peer extends EventEmitter {
  node: string;
  port: number;
  wsProxyNode?: string;
  wsProxyPort?: number;
  useSSL?: boolean;
  ticker: string;
  magic: Buffer;
  version: number;
  userAgent?: string;
  startHeight?: number;
  listenRelay: boolean;
  stream: boolean;
  validate: boolean;
  autoReconnect: boolean;
  autoReconnectWait: number;
  pingInterval: number;
  disableExtmsg: boolean;
  connected: boolean;
  extmsg: boolean;
  disconnects: number;
  timeoutConnect: number;
  DEBUG_LOG: boolean;
  emitter: CustomEvents;
  buffers: {
    data: Buffer[];
    needed: number;
    length: number;
    block: Block;
    chunkNum: number;
    downloadingBlock: boolean;
  };
  socket?: Socket | null; //Net.Socket | null;
  connectOptions?: VersionOptions;
  promiseConnect?: any;
  peerVersion?: ReturnType<typeof Version.read>;
  logger: Console;

  keepAliveTimer?: NodeJS.Timeout;

  private nextInvIsMessageResponse: boolean = false;

  constructor({
    node,
    port,
    ticker = "BCH",
    stream = false,
    validate = true,
    autoReconnect = true,
    timeoutConnect = DefaultParameters.TIMEOUT,
    autoReconnectWait = DefaultParameters.RECONNECT, // 2 seconds
    pingInterval = DefaultParameters.PING_INTERVAL,
    disableExtmsg = false,
    DEBUG_LOG = false,
    magic = MAGIC_NUMS[ticker] || MAGIC_NUMS.DEFAULT,
    version = VERSIONS[ticker] || VERSIONS.DEFAULT,
    userAgent,
    startHeight = 0,
    listenRelay = true,
    wsProxyNode = undefined,
    wsProxyPort = undefined,
    useSSL = undefined,
    logger = console,
  }: PeerOptions) {
    super();
    this.setMaxListeners(0);
    this.magic = magic;
    this.version = version;
    this.userAgent = userAgent;
    this.startHeight = startHeight;
    this.listenRelay = listenRelay;
    this.logger = logger;

    this.port = port || 8333;
    if (!port && node.split(":").length > 1) {
      const split = node.split(":");
      const portNum = parseInt(split[split.length - 1]);
      if (portNum > 0) this.port = portNum;
    }
    this.node = node;
    if (node.split(":").length === 2) {
      this.node = node.split(":")[0];
    } else if (node.includes("[") && node.split("]").length === 2) {
      // ipv6 formated with port https://en.wikipedia.org/wiki/IPv6#Addressing
      this.node = node.replace("[", "").split("]")[0];
    }
    this.wsProxyNode = wsProxyNode;
    this.wsProxyPort = wsProxyPort;
    this.useSSL = useSSL;

    this.ticker = ticker;
    this.stream = stream;
    this.validate = validate;
    this.timeoutConnect = timeoutConnect;
    this.autoReconnect = autoReconnect;
    this.autoReconnectWait = autoReconnectWait;
    this.pingInterval = pingInterval;
    this.disableExtmsg = disableExtmsg;
    this.connected = false;
    this.extmsg = false;
    this.disconnects = 0;
    this.DEBUG_LOG = DEBUG_LOG;
    this.emitter = new CustomEvents();
    this.buffers = {
      data: [],
      needed: 0,
      length: 0,
      chunkNum: 0,
      block: new Block({ validate }),
      downloadingBlock: false,
    };
  }

  setupKeepAlive() {
    if(!this.keepAliveTimer) {
			// Set a new keep-alive timer.
			this.keepAliveTimer = setTimeout(async() => {
        this.clearKeepAlive();
        try {
          await this.ping(30);
          this.setupKeepAlive();
        } catch {
          this.disconnect(this.autoReconnect);
        }
      }, this.pingInterval);
		}
  }

  clearKeepAlive() {
		// If a keep-alive timer is set, remove it
		if(this.keepAliveTimer) {
			clearTimeout(this.keepAliveTimer);
		}

		// Reset the timer reference.
		this.keepAliveTimer = undefined;
  }

  sendMessage(command: string, payload: Buffer | null, force = false) {
    if (!this.connected && !force) throw Error(`Not connected`);
    const { magic, extmsg } = this;
    const serialized = Message.write({
      command,
      payload,
      magic,
      extmsg,
    });
    if (!this.socket) throw Error("Socket not connected");
    this.socket.write(serialized as any);
    debug.client(`Sent message ${command} ${
          payload ? payload.length : "0"
        } bytes`
      );
  }

  streamBlock(chunk: Buffer) {
    const { buffers, ticker, validate, node, port } = this;
    const {
      finished,
      started,
      transactions,
      bytesRemaining,
      header,
      height,
      size,
      txCount,
      startDate,
    }: BlockStream = buffers.block.addBufferChunk(chunk);

    const blockHash = header.getHash();
    this.emitter.resetTimeout(`block_${blockHash.toString("hex")}`, 30); // Extend getBlock timeout another 30 seconds
    if (finished) {
      if (bytesRemaining > 0 && buffers.block.br) {
        const remaining = buffers.block.br.readAll();
        buffers.data = [remaining];
        buffers.length = remaining.length;
      } else {
        buffers.data = [];
        buffers.length = 0;
      }
      buffers.block = new Block({ validate });
      buffers.needed = 0;
      buffers.downloadingBlock = false;

      this.emitter.emit(`block_${blockHash.toString("hex")}`, {
        ticker,
        blockHash,
        header,
        height,
        size,
        startDate,
      });
    }
    this.emit("block_chunk", {
      node,
      port,
      num: buffers.chunkNum++,
      started,
      finished,
      transactions,
      header,
      ticker,
      chunk: finished
        ? chunk.subarray(0, chunk.length - bytesRemaining)
        : chunk,
      blockHash,
      height,
      size,
      txCount,
      startDate,
    });
    this.emit("block_transactions", {
      node,
      port,
      ticker,
      finished,
      started,
      transactions,
      bytesRemaining,
      header,
      height,
      size,
      txCount,
      startDate,
    });
  }

  readMessage(buffer: Buffer) {
    const {
      node,
      port,
      magic,
      buffers,
      ticker,
      stream,
      validate,
      extmsg,
    } = this;

    const message = Message.read({ buffer, magic, extmsg });
    const { command, payload, end, needed } = message;
    buffers.needed = needed;

    if (stream && command === "block") {
      buffers.chunkNum = 0;
      buffers.downloadingBlock = true;
      buffers.block = new Block({ validate });
      if (payload.length > 0) {
        try {
          this.streamBlock(payload);
        } catch (err) {
          // Not enough data to parse block header and txCount. Wait for more.
        }
      }
    }
    if (needed) return;
    const remainingBuffer = buffer.subarray(end);
    buffers.data = [remainingBuffer];
    buffers.length = remainingBuffer.length;
    buffers.needed = 0;

    command !== "inv" && debug.client(`Received message`,
      command,
      payload && `${payload.length} bytes`
    );
    if (command === "ping") {
      this.sendMessage("pong", payload);
      this.emit("ping", payload);
    } else if (command === "pong") {
      const nonce = payload.toString("hex");
      this.emitter.emit(`pong_${nonce}`);
      this.emit("pong", { ticker, node, port, nonce });
    } else if (command === "headers") {
      const { headers, txs } = Headers.parseHeaders(payload);
      debug.client(`Received ${headers.length} headers`);
      this.emitter.emit("headers", headers);
      this.emit(`headers`, { ticker, node, port, headers, txs });
    } else if (command === "version") {
      this.sendMessage("verack", null, true);
      const version = Version.read(payload);
      this.peerVersion = version;
      debug.client(`version`, version);
      if (!this.disableExtmsg) this.extmsg = version.version >= 70016 && ticker === "BSV"; // Enable/disable extension messages based on node version
      this.emitter.emit("version");
      this.emit("version", { ticker, node, port, version });
    } else if (command === "verack") {
      debug.client(`verack`);
      this.emitter.emit("verack");
    } else if (command === "inv") {
      const msg = Inv.read(payload);
      debug.client(`inv`,
          Object.keys(msg)
            .filter((k: string) => (msg as any)[k].length > 0)
            .map((k: string) => `${k}: ${(msg as any)[k].length}`)
            .join(", ")
        );
      this.emit("inv", msg);
      this.emitter.emit("inv", msg);

      if (!this.nextInvIsMessageResponse) {
        msg.txs.forEach(tx => {
          if (!this.emitter.pending[`tx_${tx.toString("hex")}`]) {
            this.emit("new_tx", tx);
          }
        });

        msg.blocks.forEach(block => {
          if (!this.emitter.pending[`block_${block.toString("hex")}`]) {
            this.emit("new_block", block);
          }
        });

        if (msg.dsproofs.length !== 0) {
          msg.dsproofs.forEach(dsproof => {
            if (!this.emitter.pending[`dsproof_${dsproof.toString("hex")}`]) {
              this.emit("new_dsproof", dsproof);
            }
          });
        }
      }

      this.nextInvIsMessageResponse = false;
    } else if (command === "block") {
      if (!stream) {
        const block = Block.fromBuffer(payload);
        block.options = { validate };
        if (this.listenerCount("block_transactions") > 0) {
          block.getTransactionsAsync((params) => {
            this.emit("block_transactions", { ...params, ticker, node, port });
          });
        }
        const blockHash = block.getHash();
        debug.client(`block`, blockHash.toString("hex"));
        this.emitter.emit(`block_${blockHash.toString("hex")}`, block);
        this.emit("block", block);
      }
    } else if (command === "tx") {
      this.emit("tx", payload);
      const txHash = Hash.sha256sha256(payload).reverse();
      this.emitter.emit(`tx_${txHash.toString("hex")}`, payload);
    } else if (command === "notfound") {
      const notfound = Inv.read(payload);
      debug.client(`notfound`, notfound);
      notfound.blocks.map((hash) =>
        this.emitter.emit(
          `notfound_block_${hash.toString("hex")}`,
          `Block ${hash.toString("hex")} not found`
        )
      );
      notfound.txs.map((hash) =>
        this.emitter.emit(
          `notfound_tx_${hash.toString("hex")}`,
          `Transaction ${hash.toString("hex")} not found`
        )
      );
      notfound.dsproofs.map((hash) =>
        this.emitter.emit(
          `notfound_dsproof_${hash.toString("hex")}`,
          `DSProof ${hash.toString("hex")} not found`
        )
      );
      this.emit(`notfound`, notfound);
    } else if (command === "alert") {
      debug.warning(`client: alert ${payload.toString()}`);
      this.emit(`alert`, { ticker, node, port, payload });
    } else if (command === "getdata") {
      const msg = GetData.read(payload);
      msg.txs.map((hash) => {
        this.emitter.emit(`getdata_tx_${hash.toString("hex")}`);
      });
      msg.dsproofs.map((hash) => {
        this.emitter.emit(`getdata_dsproof_${hash.toString("hex")}`);
      });
      this.emit(`getdata`, msg);
    } else if (command === "reject") {
      const msg = Reject.read(payload);
      debug.client(`reject`, msg);
      if (msg.data)
        this.emitter.emit(`reject_${msg.data.toString("hex")}`, msg.reason);
      this.emit(`reject`, msg);
    } else if (command === "addr") {
      const addrs = Address.readAddr(payload);
      debug.client(`addr`, addrs);
      this.emitter.emit("addr", addrs);
      this.emit("addr", addrs);
    } else if (command === "getheaders") {
      debug.client(`getheaders`);
      this.emit(`getheaders`, { ticker, node, port });
    } else if (command === "sendcmpct") {
      debug.client(`sendcmpct ${payload.toString("hex")}`);
      this.emit(`sendcmpct`, { ticker, node, port, payload });
    } else if (command === "sendheaders") {
      debug.client(`sendheaders`);
      this.emit(`sendheaders`, { ticker, node, port, payload });
    } else if (command === "feefilter") {
      debug.client(`feefilter`);
      this.emit(`feefilter`, { ticker, node, port, payload });
    } else if (command === "dsproof-beta" || command === "dsproof") {
      debug.client(`dsproof`);
      this.emit("dsproof", payload);
      const dspId = Hash.sha256sha256(payload).reverse();
      this.emitter.emit(`dsproof_${dspId.toString("hex")}`, payload);
    } else {
      debug.client(`Unknown command ${command}, ${payload?.toString("hex")} ${
            payload?.length
          } bytes`
        );
      this.emit(`unknown_msg`, { ticker, node, port, command, payload });
    }
    this.emit("message", { ticker, node, port, command, payload });

    if (remainingBuffer.length > 0) {
      this.readMessage(remainingBuffer);
    }
  }

  connect(options = this.connectOptions): Promise<void> {
    if (!this.promiseConnect) {
      this.promiseConnect = new Promise<void>((resolve, reject) => {
        this.connectOptions = options;
        this.socket = new Socket(); //Net.Socket();
        const {
          socket,
          buffers,
          ticker,
          version,
          userAgent,
          startHeight,
          listenRelay,
          node,
          port,
          useSSL
        } = this;
        debug.client(`Connecting to ${node} on port ${port}`);
        const timeout = setTimeout(() => {
          this.disconnect(this.autoReconnect);
          reject(Error(`timeout`));
        }, this.timeoutConnect);
        socket.on("connect", () => {
          try {
            debug.client(`Connected to ${node} on port ${port}`);
            const payload = Version.write({
              ticker,
              version,
              userAgent,
              startHeight,
              mempoolTxs: listenRelay,
              options,
            });
            this.sendMessage("version", payload, true);
            this.emit("connect", { ticker, node, port });
          } catch {
            this.disconnect(this.autoReconnect);
          }
        });
        socket.on("error", (error: any) => {
          debug.errors(`client: Socket error`, error);
          this.emit("error_socket", { ticker, node, port, error });
          this.disconnect(this.autoReconnect);
          clearTimeout(timeout);
          reject(Error(`disconnected (error)`));
        });
        socket.on("end", (tryReconnect: boolean) => {
          debug.warning(`client: Socket disconnected ${node}. Reconnecting: ${tryReconnect && this.autoReconnect}`);
          this.disconnect(tryReconnect && this.autoReconnect);
          clearTimeout(timeout);
          reject(Error(`disconnected (end)`));
        });
        socket.on("data", (data: any) => {
          // debug.client(`data`, data.toString('hex'))
          try {
            if (buffers.downloadingBlock) {
              this.streamBlock(data);
            } else {
              buffers.length += data.length;
              buffers.data.push(data);
            }

            if (buffers.length >= buffers.needed) {
              this.readMessage(Buffer.concat(buffers.data as any));
            }
          } catch (error: any) {
            const buffer = Buffer.concat(buffers.data as any);
            debug.errors(`client: on data error. Disconnecting. buffer: ${buffer.toString(
                  "hex"
                )}`,
                error
              );
            const { magic, extmsg } = this;
            this.emit("error_message", {
              ticker,
              node,
              port,
              error,
              magic,
              extmsg,
              buffer,
            });
            this.disconnect(this.autoReconnect); // TODO: Recover!
          }
        });
        let connectVerack = false;
        let connectVersion = false;
        const isConnected = () => {
          if (connectVerack && connectVersion) {
            clearTimeout(timeout);
            this.connected = true;
            resolve();
            this.emit("connected", { ticker, node, port });
            this.setupKeepAlive();
          }
        };
        this.emitter.once("verack", () => {
          connectVerack = true;
          isConnected();
        });
        this.emitter.once("version", () => {
          connectVersion = true;
          isConnected();
        });

        if (this.wsProxyNode && this.wsProxyPort) {
          socket.connect(node, port, useSSL ? "wss" : "ws", this.timeoutConnect + 5000, this.wsProxyNode, this.wsProxyPort);
        } else {
          socket.connect(node, port, useSSL ? "tcp_tls" : "tcp", this.timeoutConnect + 5000);
        }

        DefaultParameters.DEBUG_LOG = this.DEBUG_LOG;
      });
    }
    return this.promiseConnect;
  }

  disconnect(autoReconnect = false) {
    this.clearKeepAlive();

    this.autoReconnect = !!autoReconnect;
    if (this.socket) {
      debug.warning(`client: Disconnected from ${this.node}`);
      this.socket.destroy();
      this.socket = null;
      this.connected = false;
      this.disconnects++;
      this.buffers = {
        data: [],
        needed: 0,
        length: 0,
        chunkNum: 0,
        block: new Block({ validate: this.validate }),
        downloadingBlock: false,
      };

      delete this.promiseConnect;
      this.emitter.removeAllListeners("disconnected");

      const { ticker, node, port, disconnects } = this;
      this.emit("disconnected", { ticker, node, port, disconnects });

      if (autoReconnect && typeof this.autoReconnectWait === "number") {
        setTimeout(
          () => this.connect().catch(() => {}),
          this.autoReconnectWait
        ); // Wait before reconnecting
      }
    }
  }

  async getHeaders({
    from,
    to,
    timeoutSeconds = 60 * 1,
  }: {
    from?: GetHeadersOptions["from"];
    to?: GetHeadersOptions["to"];
    timeoutSeconds?: number;
  }): Promise<Header[]> {
    return this.withRetry(async () => {
      const { version } = this;
      const payload = Headers.getheaders({ from, to, version });
      this.sendMessage("getheaders", payload);
      const headers: Header[] = await this.emitter.wait(
        "headers",
        null,
        timeoutSeconds
      );
      return headers;
    });
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
    const { version } = this;
    const payload = Headers.getheaders({ from, to, version });
    this.sendMessage("getblocks", payload);
    this.nextInvIsMessageResponse = true;
    const promise = this.emitter.wait(
      "inv",
      null,
      timeoutSeconds
    );
    const inv = await promise;
    return inv?.blocks || [];
  }

  async getMempool(): Promise<Buffer[]> {
    return this.withRetry(async () => {
      this.sendMessage("mempool", null);
      this.nextInvIsMessageResponse = true;
      const inv = await this.emitter.wait("inv");
      return inv.txs;
    });
  }

  async getMempoolTransactions(): Promise<Transaction[]> {
    const txHashes = await this.getMempool();
    return this.getTransactions(txHashes);
  }

  // broadcast already signed transaction
  async broadcastTransaction(transaction: Transaction, timeoutSeconds: number = 60 * 1) {
    const [result] = await this.broadcastTransactions([transaction], timeoutSeconds);
    return result;
  }

  // broadcast already signed transactions
  async broadcastTransactions(
    transactions: Transaction[],
    timeoutSeconds: number = 60 * 5
  ): Promise<Buffer[]> {
    if (transactions.length > MAX_PER_MSG)
      throw Error(`Too many transactions (${MAX_PER_MSG} max)`);

    const txs = transactions.map((t) => t.getHash());
    const payload = Inv.write({ txs });
    this.sendMessage("inv", payload);
    const result = await Promise.allSettled(
      transactions.map(async (tx) => {
        const txId = tx.getTxid();
        const txHash = tx.getHash();
        return await Promise.race<Buffer>([
          new Promise(async (resolve) => {
            await this.emitter.wait(
              `getdata_tx_${txId}`,
              `reject_${txId}`,
              timeoutSeconds
            );
            this.sendMessage("tx", tx.toBuffer());
            resolve(txHash);
          }),
          // new Promise((_, reject) => setTimeout(() => reject(Error(`Transaction ${txId} is already known to peer`)), 2000))])
          new Promise((resolve, _) => setTimeout(() => {
            this.emitter.resetTimeout(`getdata_tx_${txId}`, 0);
            resolve(txHash);
          }, 5000))])
      })
    );

    const rejected = result.filter(val => val.status === "rejected");
    if (rejected.length) {
      throw Error(rejected.map(val => JSON.stringify((val as PromiseRejectedResult).reason?.message)).join("\n"));
    }

    return result.map(val => (val as PromiseFulfilledResult<Buffer>).value);
  }

  async getRawTransactions(txHashes: Buffer[]): Promise<Buffer[]> {
    return this.withRetry(async () => {
      if (txHashes.length === 0) return [];
      if (txHashes.length > MAX_PER_MSG)
        throw Error(`Too many transactions (${MAX_PER_MSG} max)`);

      const payload = GetData.write({ txs: txHashes });
      this.sendMessage("getdata", payload);
      const result = await Promise.allSettled(txHashes.map(tx => this.emitter.wait(`tx_${tx.toString("hex")}`, [`notfound_tx_${tx.toString("hex")}`, `reject_${tx.toString("hex")}`])));
      const rejected = result.filter(val => val.status === "rejected");
      if (rejected.length) {
        throw Error(rejected.map(val => JSON.stringify((val as PromiseRejectedResult).reason?.message)).join("\n"));
      }

      return result.map(val => (val as PromiseFulfilledResult<Buffer>).value);
    });
  }

  async getRawTransaction(txHash: Buffer): Promise<Buffer> {
    const [result] = await this.getRawTransactions([txHash]);
    return result;
  }

  async getTransactions(txHashes: Buffer[]): Promise<Transaction[]> {
    const rawTransactions: Buffer[] = await this.getRawTransactions(txHashes);
    return rawTransactions.map(rawTx => Transaction.fromBuffer(rawTx));
  }

  async getTransaction(txHash: Buffer): Promise<Transaction> {
    const [result] = await this.getTransactions([txHash]);
    return result;
  }

  async getBlocks(blockHashes: Buffer[]): Promise<Block[]> {
    return this.withRetry(async () => {
      if (blockHashes.length === 0) return [];
      if (blockHashes.length > MAX_PER_MSG)
        throw Error(`Too many blocks (${MAX_PER_MSG} max)`);

      const payload = GetData.write({ blocks: blockHashes });
      this.sendMessage("getdata", payload);
      const result = await Promise.allSettled(blockHashes.map(async (blockHash) => {
        const hex = blockHash.toString("hex");
        return await Promise.race([
          this.emitter.wait(`block_${hex}`, [`notfound_block_${hex}`, `reject_${hex}`]),
          new Promise((_, reject) => setTimeout(() => reject(Error(`Block ${hex} not found`)), blockHashes.length * 10000))
        ])
      }));
      const rejected = result.filter(val => val.status === "rejected");
      if (rejected.length) {
        throw Error(rejected.map(val => JSON.stringify((val as PromiseRejectedResult).reason?.message)).join("\n"));
      }

      return result.map(val => (val as PromiseFulfilledResult<Block>).value);
    });
  }

  async getBlock(blockHash: Buffer): Promise<Block> {
    const [result] = await this.getBlocks([blockHash]);
    return result;
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
    if (dspIds.length === 0) return [];
    if (dspIds.length > MAX_PER_MSG)
      throw Error(`Too many transactions (${MAX_PER_MSG} max)`);

    const payload = GetData.write({ dsproofs: dspIds });
    this.sendMessage("getdata", payload);
    const result = await Promise.allSettled(dspIds.map(dspId => this.emitter.wait(`dsproof_${dspId.toString("hex")}`, [`notfound_dsproof_${dspId.toString("hex")}`, `reject_${dspId.toString("hex")}`])));
    const rejected = result.filter(val => val.status === "rejected");
    if (rejected.length) {
      throw Error(rejected.map(val => JSON.stringify((val as PromiseRejectedResult).reason?.message)).join("\n"));
    }

    return result.map(val => (val as PromiseFulfilledResult<Buffer>).value);
  }

  async getRawDSProof(dspId: Buffer): Promise<Buffer> {
    const [result] = await this.getRawDSProofs([dspId]);
    return result;
  }

  async getDSProofs(dspIds: Buffer[]): Promise<DSProof[]> {
    const rawDSProofs: Buffer[] = await this.getRawDSProofs(dspIds);
    return rawDSProofs.map(rawTx => DSProof.fromBuffer(rawTx));
  }

  async getDSProof(dspId: Buffer): Promise<DSProof> {
    const [result] = await this.getDSProofs([dspId]);
    return result;
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

  async getPeerAddresses(timeoutSeconds: number = 60 * 2): Promise<NetAddress[]> {
    // 2 minute default timeout
    this.sendMessage("getaddr", null);
    return await this.emitter.wait("addr", null, timeoutSeconds);
  }

  async ping(timeoutSeconds: number = 30): Promise<number> {
    // 30 second default timeout
    const nonce = Crypto.randomBytes(8);
    const id = nonce.toString("hex");
    const date = +new Date();
    this.sendMessage("ping", nonce);
    await this.emitter.wait(`pong_${id}`, null, timeoutSeconds);
    return +new Date() - date;
  }

  private delays = [10, 100, 500, 2000, 10000, 20000]

  async withRetry<T>(
    fn: () => Promise<T>,
  ): Promise<T> {
    let retry = 0;
    while (true) {
      const delay = this.delays[retry] ?? this.delays[this.delays.length - 1];
      try {
        return await fn();
      } catch (err: any) {
        this.logger.warn({
          reason: err.message,
        }, 'p2p call failure. retrying in ' + delay + 'ms');
        await new Promise((resolve) => setTimeout(resolve, delay));
        retry++;
      }
    }
  }
}

import { Peer } from "./peer";

export type CancelWatch = () => void;

export interface Options {
  useSSL?: boolean; // use TCP TLS or WSS protocols
  ticker?: string; // network ticker
  stream?: boolean; // stream blocks
  validate?: boolean; // validate blocks
  timeoutConnect?: number; // time to wait before considering new connections failed
  autoReconnect?: boolean; // attempt auto reconnections
  autoReconnectWait?: number; // time to wait before reconnecting
  reconnectTimeout?: number; // How long to wait before attempting to reconnect, in milliseconds.
  pingInterval?: number; // Time between ping messages, in milliseconds
  disableExtmsg?: boolean; // extended message format, BSV only
  DEBUG_LOG?: boolean; // log debug info to console
  magic?: Buffer; // network magic to serialize messages, see MAGIC_NUMS
  version?: number; // protocol version to communicate to the remote peers
  userAgent?: string; // user agent to communicate to the remote peers
  startHeight?: number; // maximum block height to report to communicate to remote peers
  listenRelay?: boolean; // listen for newly relayed transactions, blocks and dsProofs
	logger?: any; // custom logger, defaults to `console`
}

export interface PeerOptions extends Options {
  node: string; // remote node address to connect to
  port?: number; // remote node port
  wsProxyNode?: string; // wsproxy address to route Websocket traffic through
  wsProxyPort?: number; // wsproxy port to route Websocket traffic through
}

export interface ClusterOptions extends Options {
	confidence?: number, // wait for this number of hosts to provide identical results.
	distribution?: number, // request information from this number of hosts.
	order?: ClusterOrder, // lect hosts to communicate with in this order.
}

// Connection options used with TLS connections.
export interface ConnectionOptions
{
	rejectUnauthorized?: boolean;
	serverName?: string;
}

const debugLogger = (name: string) => {
  return (...log: any) => {
    if (DefaultParameters.DEBUG_LOG) {
      if (name.includes("warning"))
        console.warn(name, ...log);
      else if (name.includes("error"))
        console.error(name, ...log);
      else
        console.log(name, ...log);
    }
  }
}

// Create the debug logs.
export const debug =
{
	client:  debugLogger('p2p-cash:client '),
	cluster: debugLogger('p2p-cash:cluster'),
	errors:  debugLogger('p2p-cash:error  '),
	warning: debugLogger('p2p-cash:warning'),
	network: debugLogger('p2p-cash:network'),
	ping:    debugLogger('p2p-cash:pulses '),
};


export interface ClusterStrategy
{
	// Number of clients to distribute a request to
	distribution: number;

	// Number of clients to await a response from
	confidence: number;

	// How to select clients for requests
	order: ClusterOrder;
}

export interface ClientConfig
{
	// Availability of the client's connection
	state: ClientState;

	// The client's connection
	connection: Peer;

  // The client's connection options
  options: PeerOptions;
}

/**
 * A list of possible responses to requests.
 */
export type RequestResponse = object | string | number | boolean | null | RequestResponse[];

// Define how we store tracking information for subscription callbacks.
export interface SubscriptionTracker
{
	method: string;
	payload: string;
}

// Subscribe callbacks are provided by the user to process subscription events.
export type SubscribeCallback = (errorOrData: Error | RequestResponse) => void;

// Request resolvers are used to process the response of a request. This takes either
// an error object or any stringified data, while the other parameter is omitted.
export type RequestResolver = (error?: Error, data?: string) => void;

// Promise types
export type ResolveFunction<T> = (value: T | PromiseLike<T>) => void;
export type RejectFunction = (reason?: any) => void;

export interface VersionRejected
{
	error: RPCError;
}

export interface VersionNegotiated
{
	software: string;
	protocol: string;
}

export const isVersionRejected = function(object: any): object is VersionRejected
{
	return 'error' in object;
};

export const isVersionNegotiated = function(object: any): object is VersionNegotiated
{
	return 'software' in object && 'protocol' in object;
};

/**
 * Possible Transport Schemes for communication with the Electrum server
 */
export type TransportScheme = 'tcp' | 'tcp_tls' | 'ws' | 'wss';

// Connection options used with TLS connections.
export interface ConnectionOptions
{
	rejectUnauthorized?: boolean;
	serverName?: string;
}


// Acceptable parameter types for RPC messages
export type RPCParameter = string | number | boolean | Object | null;

// The base type for all RPC messages
export interface RPCBase
{
	jsonrpc: string;
}

// An RPC message that sends a notification requiring no response
export interface RPCNotification extends RPCBase
{
	method: string;
	params?: RPCParameter[];
}

// An RPC message that sends a request requiring a response
export interface RPCRequest extends RPCBase
{
	id: number | null;
	method: string;
	params?: RPCParameter[];
}

// An RPC message that returns the response to a successful request
export interface RPCStatement extends RPCBase
{
	id: number | null;
	result: string;
}

export interface RPCError
{
	code: number;
	message: string;
	data?: any;
}

// An RPC message that returns the error to an unsuccessful request
export interface RPCErrorResponse extends RPCBase
{
	id: number | null;
	error: RPCError;
}

// A response to a request is either a statement (successful) or an error (unsuccessful)
export type RPCResponse = RPCErrorResponse | RPCStatement;

// RPC messages are notifications, requests, or responses
export type RPCMessage = RPCNotification | RPCRequest | RPCResponse;

// Requests and responses can also be sent in batches
export type RPCResponseBatch = RPCResponse[];
export type RPCRequestBatch = RPCRequest[];

export const isRPCErrorResponse = function(message: RPCBase): message is RPCErrorResponse
{
	return 'id' in message && 'error' in message;
};

export const isRPCStatement = function(message: RPCBase): message is RPCStatement
{
	return 'id' in message && 'result' in message;
};

export const isRPCNotification = function(message: RPCBase): message is RPCNotification
{
	return !('id' in message) && 'method' in message;
};

export const isRPCRequest = function(message: RPCBase): message is RPCRequest
{
	return 'id' in message && 'method' in message;
};




// Disable indent rule for this file because it is broken (https://github.com/typescript-eslint/typescript-eslint/issues/1824)
/* eslint-disable @typescript-eslint/indent */

/**
 * Enum that denotes the ordering to use in an ElectrumCluster.
 * @enum {number}
 * @property {0} RANDOM     Send requests to randomly selected servers in the cluster.
 * @property {1} PRIORITY   Send requests to servers in the cluster in the order they were added.
 */
export enum ClusterOrder
{
	RANDOM = 0,
	PRIORITY = 1,
}

/**
 * Enum that denotes the distribution setting to use in an ElectrumCluster.
 * @enum {number}
 * @property {0} ALL   Send requests to all servers in the cluster.
 */
export enum ClusterDistribution
{
	ALL = 0,
}

/**
 * Enum that denotes the ready status of an ElectrumCluster.
 * @enum {number}
 * @property {0} DISABLED    The cluster is disabled and unusable.
 * @property {1} DEGRADED    The cluster is degraded but still usable.
 * @property {2} READY       The cluster is healthy and ready for use.
 */
export enum ClusterStatus
{
	DISABLED = 0,
	DEGRADED = 1,
	READY = 2,
}

/**
 * Enum that denotes the availability of an ElectrumClient.
 * @enum {number}
 * @property {0} UNAVAILABLE   The client is currently not available.
 * @property {1} AVAILABLE     The client is available for use.
 */
export enum ClientState
{
	UNAVAILABLE = 0,
	AVAILABLE = 1,
}

/**
 * Enum that denotes the connection status of an ElectrumConnection.
 * @enum {number}
 * @property {0} DISCONNECTED    The connection is disconnected.
 * @property {1} AVAILABLE       The connection is connected.
 * @property {2} DISCONNECTING   The connection is disconnecting.
 * @property {3} CONNECTING      The connection is connecting.
 * @property {4} RECONNECTING    The connection is restarting.
 */
export enum ConnectionStatus
{
	DISCONNECTED = 0,
	CONNECTED = 1,
	DISCONNECTING = 2,
	CONNECTING = 3,
	RECONNECTING = 4,
}



/**
 * Object containing the commonly used ports and schemes for specific Transports.
 * @example const electrum = new ElectrumClient('Electrum client example', '1.4.1', 'bch.imaginary.cash', Transport.WSS.Port, Transport.WSS.Scheme);
 *
 * @property {object} TCP       Port and Scheme to use unencrypted TCP sockets.
 * @property {object} TCP_TLS   Port and Scheme to use TLS-encrypted TCP sockets.
 * @property {object} WS        Port and Scheme to use unencrypted WebSockets.
 * @property {object} WSS       Port and Scheme to use TLS-encrypted WebSockets.
 */
export const ElectrumTransport =
{
	TCP:     { Port: 50001, Scheme: 'tcp' as TransportScheme },
	TCP_TLS: { Port: 50002, Scheme: 'tcp_tls' as TransportScheme },
	WS:      { Port: 50003, Scheme: 'ws' as TransportScheme },
	WSS:     { Port: 50004, Scheme: 'wss' as TransportScheme },
};

export const DefaultParameters =
{
	// Port number for TCP TLS connections
	PORT: ElectrumTransport.TCP_TLS.Port,

	// Transport to connect to the Electrum server
	TRANSPORT_SCHEME: ElectrumTransport.TCP_TLS.Scheme,

	// How long to wait before attempting to reconnect, in milliseconds.
	RECONNECT: 10 * 1000,

	// How long to wait for network operations before following up, in milliseconds.
	TIMEOUT: 12 * 1000,

	// Time between ping messages, in milliseconds. Pinging keeps the connection alive.
	// The reason for pinging this frequently is to detect connection problems early.
	PING_INTERVAL: 5 * 1000,

	// How many servers are required before we trust information provided.
	CLUSTER_CONFIDENCE: 1,

	// How many servers we send requests to.
	CLUSTER_DISTRIBUTION: ClusterDistribution.ALL,

	// What order we select servers to send requests to.
	CLUSTER_ORDER: ClusterOrder.RANDOM,

  DEBUG_LOG: false,
};


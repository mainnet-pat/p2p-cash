p2p-cash

# p2p-cash

## Table of contents

### Enumerations

- [ClientState](enums/ClientState.md)
- [ClusterDistribution](enums/ClusterDistribution.md)
- [ClusterOrder](enums/ClusterOrder.md)
- [ClusterStatus](enums/ClusterStatus.md)
- [ConnectionStatus](enums/ConnectionStatus.md)

### Classes

- [Cluster](classes/Cluster.md)
- [Peer](classes/Peer.md)

### Interfaces

- [ClientConfig](interfaces/ClientConfig.md)
- [ClusterOptions](interfaces/ClusterOptions.md)
- [ClusterStrategy](interfaces/ClusterStrategy.md)
- [ConnectionOptions](interfaces/ConnectionOptions.md)
- [Options](interfaces/Options.md)
- [PeerOptions](interfaces/PeerOptions.md)
- [RPCBase](interfaces/RPCBase.md)
- [RPCError](interfaces/RPCError.md)
- [RPCErrorResponse](interfaces/RPCErrorResponse.md)
- [RPCNotification](interfaces/RPCNotification.md)
- [RPCRequest](interfaces/RPCRequest.md)
- [RPCStatement](interfaces/RPCStatement.md)
- [SubscriptionTracker](interfaces/SubscriptionTracker.md)
- [VersionNegotiated](interfaces/VersionNegotiated.md)
- [VersionRejected](interfaces/VersionRejected.md)

### Type Aliases

- [CancelWatch](README.md#cancelwatch)
- [RPCMessage](README.md#rpcmessage)
- [RPCParameter](README.md#rpcparameter)
- [RPCRequestBatch](README.md#rpcrequestbatch)
- [RPCResponse](README.md#rpcresponse)
- [RPCResponseBatch](README.md#rpcresponsebatch)
- [RejectFunction](README.md#rejectfunction)
- [RequestResolver](README.md#requestresolver)
- [RequestResponse](README.md#requestresponse)
- [ResolveFunction](README.md#resolvefunction)
- [SubscribeCallback](README.md#subscribecallback)
- [TransportScheme](README.md#transportscheme)

### Variables

- [Address](README.md#address)
- [DefaultParameters](README.md#defaultparameters)
- [ElectrumTransport](README.md#electrumtransport)
- [GetData](README.md#getdata)
- [Headers](README.md#headers)
- [Inv](README.md#inv)
- [MAGIC\_NUMS](README.md#magic_nums)
- [MAX\_PER\_MSG](README.md#max_per_msg)
- [Message](README.md#message)
- [Reject](README.md#reject)
- [USER\_AGENTS](README.md#user_agents)
- [VERSIONS](README.md#versions)
- [Version](README.md#version)
- [debug](README.md#debug)

### Functions

- [isRPCErrorResponse](README.md#isrpcerrorresponse)
- [isRPCNotification](README.md#isrpcnotification)
- [isRPCRequest](README.md#isrpcrequest)
- [isRPCStatement](README.md#isrpcstatement)
- [isVersionNegotiated](README.md#isversionnegotiated)
- [isVersionRejected](README.md#isversionrejected)

## Type Aliases

### CancelWatch

Ƭ **CancelWatch**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/interfaces.ts:3](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L3)

___

### RPCMessage

Ƭ **RPCMessage**: [`RPCNotification`](interfaces/RPCNotification.md) \| [`RPCRequest`](interfaces/RPCRequest.md) \| [`RPCResponse`](README.md#rpcresponse)

#### Defined in

[src/interfaces.ts:199](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L199)

___

### RPCParameter

Ƭ **RPCParameter**: `string` \| `number` \| `boolean` \| `Object` \| ``null``

#### Defined in

[src/interfaces.ts:151](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L151)

___

### RPCRequestBatch

Ƭ **RPCRequestBatch**: [`RPCRequest`](interfaces/RPCRequest.md)[]

#### Defined in

[src/interfaces.ts:203](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L203)

___

### RPCResponse

Ƭ **RPCResponse**: [`RPCErrorResponse`](interfaces/RPCErrorResponse.md) \| [`RPCStatement`](interfaces/RPCStatement.md)

#### Defined in

[src/interfaces.ts:196](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L196)

___

### RPCResponseBatch

Ƭ **RPCResponseBatch**: [`RPCResponse`](README.md#rpcresponse)[]

#### Defined in

[src/interfaces.ts:202](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L202)

___

### RejectFunction

Ƭ **RejectFunction**: (`reason?`: `any`) => `void`

#### Type declaration

▸ (`reason?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `any` |

##### Returns

`void`

#### Defined in

[src/interfaces.ts:114](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L114)

___

### RequestResolver

Ƭ **RequestResolver**: (`error?`: `Error`, `data?`: `string`) => `void`

#### Type declaration

▸ (`error?`, `data?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `Error` |
| `data?` | `string` |

##### Returns

`void`

#### Defined in

[src/interfaces.ts:110](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L110)

___

### RequestResponse

Ƭ **RequestResponse**: `object` \| `string` \| `number` \| `boolean` \| ``null`` \| [`RequestResponse`](README.md#requestresponse)[]

A list of possible responses to requests.

#### Defined in

[src/interfaces.ts:96](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L96)

___

### ResolveFunction

Ƭ **ResolveFunction**<`T`\>: (`value`: `T` \| `PromiseLike`<`T`\>) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` \| `PromiseLike`<`T`\> |

##### Returns

`void`

#### Defined in

[src/interfaces.ts:113](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L113)

___

### SubscribeCallback

Ƭ **SubscribeCallback**: (`errorOrData`: `Error` \| [`RequestResponse`](README.md#requestresponse)) => `void`

#### Type declaration

▸ (`errorOrData`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `errorOrData` | `Error` \| [`RequestResponse`](README.md#requestresponse) |

##### Returns

`void`

#### Defined in

[src/interfaces.ts:106](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L106)

___

### TransportScheme

Ƭ **TransportScheme**: ``"tcp"`` \| ``"tcp_tls"`` \| ``"ws"`` \| ``"wss"``

Possible Transport Schemes for communication with the Electrum server

#### Defined in

[src/interfaces.ts:140](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L140)

## Variables

### Address

• `Const` **Address**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `read` | (`payload`: `default` \| `Buffer`, `versionMessage`: `boolean`) => `NetAddress` |
| `readAddr` | (`payload`: `Buffer`) => `NetAddress`[] |
| `write` | (`__namedParameters`: `MessageAddress`) => `Buffer` |

#### Defined in

[src/messages/address.ts:99](https://github.com/mainnet-pat/p2p-cash/blob/master/src/messages/address.ts#L99)

___

### DefaultParameters

• `Const` **DefaultParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CLUSTER_CONFIDENCE` | `number` |
| `CLUSTER_DISTRIBUTION` | [`ALL`](enums/ClusterDistribution.md#all) |
| `CLUSTER_ORDER` | [`ClusterOrder`](enums/ClusterOrder.md) |
| `DEBUG_LOG` | `boolean` |
| `PING_INTERVAL` | `number` |
| `PORT` | `number` |
| `RECONNECT` | `number` |
| `TIMEOUT` | `number` |
| `TRANSPORT_SCHEME` | [`TransportScheme`](README.md#transportscheme) |

#### Defined in

[src/interfaces.ts:316](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L316)

___

### ElectrumTransport

• `Const` **ElectrumTransport**: `Object`

Object containing the commonly used ports and schemes for specific Transports.

**`Example`**

```ts
const electrum = new ElectrumClient('Electrum client example', '1.4.1', 'bch.imaginary.cash', Transport.WSS.Port, Transport.WSS.Scheme);
```

**`Property`**

Port and Scheme to use unencrypted TCP sockets.

**`Property`**

Port and Scheme to use TLS-encrypted TCP sockets.

**`Property`**

Port and Scheme to use unencrypted WebSockets.

**`Property`**

Port and Scheme to use TLS-encrypted WebSockets.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `TCP` | { `Port`: `number` = 50001; `Scheme`: [`TransportScheme`](README.md#transportscheme)  } |
| `TCP.Port` | `number` |
| `TCP.Scheme` | [`TransportScheme`](README.md#transportscheme) |
| `TCP_TLS` | { `Port`: `number` = 50002; `Scheme`: [`TransportScheme`](README.md#transportscheme)  } |
| `TCP_TLS.Port` | `number` |
| `TCP_TLS.Scheme` | [`TransportScheme`](README.md#transportscheme) |
| `WS` | { `Port`: `number` = 50003; `Scheme`: [`TransportScheme`](README.md#transportscheme)  } |
| `WS.Port` | `number` |
| `WS.Scheme` | [`TransportScheme`](README.md#transportscheme) |
| `WSS` | { `Port`: `number` = 50004; `Scheme`: [`TransportScheme`](README.md#transportscheme)  } |
| `WSS.Port` | `number` |
| `WSS.Scheme` | [`TransportScheme`](README.md#transportscheme) |

#### Defined in

[src/interfaces.ts:308](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L308)

___

### GetData

• `Const` **GetData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `read` | (`buffer`: `Buffer`) => { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `dsproofs`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  } |
| `write` | (`__namedParameters`: `WriteGetDataOptions`) => `Buffer` |

#### Defined in

[src/messages/getdata.ts:97](https://github.com/mainnet-pat/p2p-cash/blob/master/src/messages/getdata.ts#L97)

___

### Headers

• `Const` **Headers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getheaders` | (`__namedParameters`: `GetHeadersOptions`) => `Buffer` |
| `parseHeaders` | (`payload`: `Buffer`) => { `headers`: `default`[] ; `txs`: `number`[]  } |

#### Defined in

[src/messages/headers.ts:41](https://github.com/mainnet-pat/p2p-cash/blob/master/src/messages/headers.ts#L41)

___

### Inv

• `Const` **Inv**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `read` | (`buffer`: `Buffer`) => { `blocks`: `Buffer`[] ; `compact_blocks`: `Buffer`[] ; `dsproofs`: `Buffer`[] ; `errors`: `Buffer`[] ; `filtered_blocks`: `Buffer`[] ; `other`: [`Buffer`, `number`][] ; `txs`: `Buffer`[]  } |
| `write` | (`__namedParameters`: `WriteInvOptions`) => `Buffer` |

#### Defined in

[src/messages/inv.ts:98](https://github.com/mainnet-pat/p2p-cash/blob/master/src/messages/inv.ts#L98)

___

### MAGIC\_NUMS

• `Const` **MAGIC\_NUMS**: `Object`

#### Index signature

▪ [key: `string`]: `Buffer`

#### Defined in

[src/config.ts:1](https://github.com/mainnet-pat/p2p-cash/blob/master/src/config.ts#L1)

___

### MAX\_PER\_MSG

• `Const` **MAX\_PER\_MSG**: ``50000``

#### Defined in

[src/config.ts:30](https://github.com/mainnet-pat/p2p-cash/blob/master/src/config.ts#L30)

___

### Message

• `Const` **Message**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `read` | (`__namedParameters`: `ReadMessageOptions`) => { `command`: `string` ; `end?`: `number` ; `needed`: `number` ; `payload`: `Buffer`  } |
| `write` | (`__namedParameters`: `WriteMessageOptions`) => `Buffer` |

#### Defined in

[src/messages/message.ts:122](https://github.com/mainnet-pat/p2p-cash/blob/master/src/messages/message.ts#L122)

___

### Reject

• `Const` **Reject**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `read` | (`payload`: `Buffer`) => `ReadRejectResult` |

#### Defined in

[src/messages/reject.ts:24](https://github.com/mainnet-pat/p2p-cash/blob/master/src/messages/reject.ts#L24)

___

### USER\_AGENTS

• `Const` **USER\_AGENTS**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/config.ts:21](https://github.com/mainnet-pat/p2p-cash/blob/master/src/config.ts#L21)

___

### VERSIONS

• `Const` **VERSIONS**: `Object`

#### Index signature

▪ [key: `string`]: `number`

#### Defined in

[src/config.ts:12](https://github.com/mainnet-pat/p2p-cash/blob/master/src/config.ts#L12)

___

### Version

• `Const` **Version**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `read` | (`payload`: `default` \| `Buffer`) => { `addrFrom`: `NetAddress` ; `addrRecv`: `NetAddress` ; `nonce`: `Buffer` ; `relay`: `number` ; `services`: `Buffer` ; `startHeight`: `number` ; `timestamp`: `number` ; `userAgent`: `string` ; `version`: `number`  } |
| `write` | (`__namedParameters`: `WriteVersionOptions`) => `Buffer` |

#### Defined in

[src/messages/version.ts:119](https://github.com/mainnet-pat/p2p-cash/blob/master/src/messages/version.ts#L119)

___

### debug

• `Const` **debug**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client` | (...`log`: `any`) => `void` |
| `cluster` | (...`log`: `any`) => `void` |
| `errors` | (...`log`: `any`) => `void` |
| `network` | (...`log`: `any`) => `void` |
| `ping` | (...`log`: `any`) => `void` |
| `warning` | (...`log`: `any`) => `void` |

#### Defined in

[src/interfaces.ts:58](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L58)

## Functions

### isRPCErrorResponse

▸ **isRPCErrorResponse**(`message`): message is RPCErrorResponse

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`RPCBase`](interfaces/RPCBase.md) |

#### Returns

message is RPCErrorResponse

#### Defined in

[src/interfaces.ts:205](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L205)

___

### isRPCNotification

▸ **isRPCNotification**(`message`): message is RPCNotification

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`RPCBase`](interfaces/RPCBase.md) |

#### Returns

message is RPCNotification

#### Defined in

[src/interfaces.ts:215](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L215)

___

### isRPCRequest

▸ **isRPCRequest**(`message`): message is RPCRequest

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`RPCBase`](interfaces/RPCBase.md) |

#### Returns

message is RPCRequest

#### Defined in

[src/interfaces.ts:220](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L220)

___

### isRPCStatement

▸ **isRPCStatement**(`message`): message is RPCStatement

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`RPCBase`](interfaces/RPCBase.md) |

#### Returns

message is RPCStatement

#### Defined in

[src/interfaces.ts:210](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L210)

___

### isVersionNegotiated

▸ **isVersionNegotiated**(`object`): object is VersionNegotiated

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

object is VersionNegotiated

#### Defined in

[src/interfaces.ts:132](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L132)

___

### isVersionRejected

▸ **isVersionRejected**(`object`): object is VersionRejected

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

object is VersionRejected

#### Defined in

[src/interfaces.ts:127](https://github.com/mainnet-pat/p2p-cash/blob/master/src/interfaces.ts#L127)

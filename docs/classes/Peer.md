[p2p-cash](../README.md) / Peer

# Class: Peer

## Hierarchy

- `EventEmitter`

  ↳ **`Peer`**

## Table of contents

### Constructors

- [constructor](Peer.md#constructor)

### Properties

- [DEBUG\_LOG](Peer.md#debug_log)
- [autoReconnect](Peer.md#autoreconnect)
- [autoReconnectWait](Peer.md#autoreconnectwait)
- [buffers](Peer.md#buffers)
- [connectOptions](Peer.md#connectoptions)
- [connected](Peer.md#connected)
- [disableExtmsg](Peer.md#disableextmsg)
- [disconnects](Peer.md#disconnects)
- [emitter](Peer.md#emitter)
- [extmsg](Peer.md#extmsg)
- [keepAliveTimer](Peer.md#keepalivetimer)
- [listenRelay](Peer.md#listenrelay)
- [magic](Peer.md#magic)
- [nextInvIsMessageResponse](Peer.md#nextinvismessageresponse)
- [node](Peer.md#node)
- [peerVersion](Peer.md#peerversion)
- [pingInterval](Peer.md#pinginterval)
- [port](Peer.md#port)
- [promiseConnect](Peer.md#promiseconnect)
- [socket](Peer.md#socket)
- [startHeight](Peer.md#startheight)
- [stream](Peer.md#stream)
- [ticker](Peer.md#ticker)
- [timeoutConnect](Peer.md#timeoutconnect)
- [useSSL](Peer.md#usessl)
- [userAgent](Peer.md#useragent)
- [validate](Peer.md#validate)
- [version](Peer.md#version)
- [wsProxyNode](Peer.md#wsproxynode)
- [wsProxyPort](Peer.md#wsproxyport)
- [captureRejectionSymbol](Peer.md#capturerejectionsymbol)
- [captureRejections](Peer.md#capturerejections)
- [defaultMaxListeners](Peer.md#defaultmaxlisteners)
- [errorMonitor](Peer.md#errormonitor)

### Methods

- [addListener](Peer.md#addlistener)
- [broadcastTransaction](Peer.md#broadcasttransaction)
- [broadcastTransactions](Peer.md#broadcasttransactions)
- [clearKeepAlive](Peer.md#clearkeepalive)
- [connect](Peer.md#connect)
- [disconnect](Peer.md#disconnect)
- [emit](Peer.md#emit)
- [eventNames](Peer.md#eventnames)
- [getBlock](Peer.md#getblock)
- [getBlockHashes](Peer.md#getblockhashes)
- [getBlocks](Peer.md#getblocks)
- [getDSProof](Peer.md#getdsproof)
- [getDSProofs](Peer.md#getdsproofs)
- [getHeaders](Peer.md#getheaders)
- [getMaxListeners](Peer.md#getmaxlisteners)
- [getMempool](Peer.md#getmempool)
- [getMempoolTransactions](Peer.md#getmempooltransactions)
- [getPeerAddresses](Peer.md#getpeeraddresses)
- [getRawDSProof](Peer.md#getrawdsproof)
- [getRawDSProofs](Peer.md#getrawdsproofs)
- [getRawTransaction](Peer.md#getrawtransaction)
- [getRawTransactions](Peer.md#getrawtransactions)
- [getTransaction](Peer.md#gettransaction)
- [getTransactions](Peer.md#gettransactions)
- [listenerCount](Peer.md#listenercount)
- [listeners](Peer.md#listeners)
- [off](Peer.md#off)
- [on](Peer.md#on)
- [once](Peer.md#once)
- [ping](Peer.md#ping)
- [prependListener](Peer.md#prependlistener)
- [prependOnceListener](Peer.md#prependoncelistener)
- [rawListeners](Peer.md#rawlisteners)
- [readMessage](Peer.md#readmessage)
- [removeAllListeners](Peer.md#removealllisteners)
- [removeListener](Peer.md#removelistener)
- [sendMessage](Peer.md#sendmessage)
- [setMaxListeners](Peer.md#setmaxlisteners)
- [setupKeepAlive](Peer.md#setupkeepalive)
- [streamBlock](Peer.md#streamblock)
- [watchAddressTransactions](Peer.md#watchaddresstransactions)
- [watchDSProofIds](Peer.md#watchdsproofids)
- [watchDSProofs](Peer.md#watchdsproofs)
- [watchMempoolRawTransactions](Peer.md#watchmempoolrawtransactions)
- [watchMempoolTransactionHashes](Peer.md#watchmempooltransactionhashes)
- [watchMempoolTransactions](Peer.md#watchmempooltransactions)
- [watchNewBlocks](Peer.md#watchnewblocks)
- [watchRawDSProofs](Peer.md#watchrawdsproofs)
- [getEventListeners](Peer.md#geteventlisteners)
- [listenerCount](Peer.md#listenercount-1)
- [on](Peer.md#on-1)
- [once](Peer.md#once-1)
- [setMaxListeners](Peer.md#setmaxlisteners-1)

## Constructors

### constructor

• **new Peer**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`PeerOptions`](../interfaces/PeerOptions.md) |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/peer.ts:64](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L64)

## Properties

### DEBUG\_LOG

• **DEBUG\_LOG**: `boolean`

#### Defined in

[src/peer.ts:45](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L45)

___

### autoReconnect

• **autoReconnect**: `boolean`

#### Defined in

[src/peer.ts:37](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L37)

___

### autoReconnectWait

• **autoReconnectWait**: `number`

#### Defined in

[src/peer.ts:38](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L38)

___

### buffers

• **buffers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block` | `default` |
| `chunkNum` | `number` |
| `data` | `Buffer`[] |
| `downloadingBlock` | `boolean` |
| `length` | `number` |
| `needed` | `number` |

#### Defined in

[src/peer.ts:47](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L47)

___

### connectOptions

• `Optional` **connectOptions**: `VersionOptions`

#### Defined in

[src/peer.ts:56](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L56)

___

### connected

• **connected**: `boolean`

#### Defined in

[src/peer.ts:41](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L41)

___

### disableExtmsg

• **disableExtmsg**: `boolean`

#### Defined in

[src/peer.ts:40](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L40)

___

### disconnects

• **disconnects**: `number`

#### Defined in

[src/peer.ts:43](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L43)

___

### emitter

• **emitter**: `default`

#### Defined in

[src/peer.ts:46](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L46)

___

### extmsg

• **extmsg**: `boolean`

#### Defined in

[src/peer.ts:42](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L42)

___

### keepAliveTimer

• `Optional` **keepAliveTimer**: `Timeout`

#### Defined in

[src/peer.ts:60](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L60)

___

### listenRelay

• **listenRelay**: `boolean`

#### Defined in

[src/peer.ts:34](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L34)

___

### magic

• **magic**: `Buffer`

#### Defined in

[src/peer.ts:30](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L30)

___

### nextInvIsMessageResponse

• `Private` **nextInvIsMessageResponse**: `boolean` = `false`

#### Defined in

[src/peer.ts:62](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L62)

___

### node

• **node**: `string`

#### Defined in

[src/peer.ts:24](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L24)

___

### peerVersion

• `Optional` **peerVersion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addrFrom` | `NetAddress` |
| `addrRecv` | `NetAddress` |
| `nonce` | `Buffer` |
| `relay` | `number` |
| `services` | `Buffer` |
| `startHeight` | `number` |
| `timestamp` | `number` |
| `userAgent` | `string` |
| `version` | `number` |

#### Defined in

[src/peer.ts:58](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L58)

___

### pingInterval

• **pingInterval**: `number`

#### Defined in

[src/peer.ts:39](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L39)

___

### port

• **port**: `number`

#### Defined in

[src/peer.ts:25](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L25)

___

### promiseConnect

• `Optional` **promiseConnect**: `any`

#### Defined in

[src/peer.ts:57](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L57)

___

### socket

• `Optional` **socket**: ``null`` \| `Socket`

#### Defined in

[src/peer.ts:55](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L55)

___

### startHeight

• `Optional` **startHeight**: `number`

#### Defined in

[src/peer.ts:33](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L33)

___

### stream

• **stream**: `boolean`

#### Defined in

[src/peer.ts:35](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L35)

___

### ticker

• **ticker**: `string`

#### Defined in

[src/peer.ts:29](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L29)

___

### timeoutConnect

• **timeoutConnect**: `number`

#### Defined in

[src/peer.ts:44](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L44)

___

### useSSL

• `Optional` **useSSL**: `boolean`

#### Defined in

[src/peer.ts:28](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L28)

___

### userAgent

• `Optional` **userAgent**: `string`

#### Defined in

[src/peer.ts:32](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L32)

___

### validate

• **validate**: `boolean`

#### Defined in

[src/peer.ts:36](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L36)

___

### version

• **version**: `number`

#### Defined in

[src/peer.ts:31](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L31)

___

### wsProxyNode

• `Optional` **wsProxyNode**: `string`

#### Defined in

[src/peer.ts:26](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L26)

___

### wsProxyPort

• `Optional` **wsProxyPort**: `number`

#### Defined in

[src/peer.ts:27](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L27)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](Peer.md#capturerejectionsymbol)

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:328

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:333

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

EventEmitter.defaultMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:334

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](Peer.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

EventEmitter.errorMonitor

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:327

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`Peer`](Peer.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:354

___

### broadcastTransaction

▸ **broadcastTransaction**(`transaction`, `timeoutSeconds?`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `default` |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

[src/peer.ts:642](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L642)

___

### broadcastTransactions

▸ **broadcastTransactions**(`transactions`, `timeoutSeconds?`): `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactions` | `default`[] |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/peer.ts:648](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L648)

___

### clearKeepAlive

▸ **clearKeepAlive**(): `void`

#### Returns

`void`

#### Defined in

[src/peer.ts:148](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L148)

___

### connect

▸ **connect**(`options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| `VersionOptions` |

#### Returns

`any`

#### Defined in

[src/peer.ts:436](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L436)

___

### disconnect

▸ **disconnect**(`autoReconnect?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `autoReconnect` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/peer.ts:553](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L553)

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:610

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:669

___

### getBlock

▸ **getBlock**(`blockHash`): `Promise`<`default`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHash` | `Buffer` |

#### Returns

`Promise`<`default`\>

#### Defined in

[src/peer.ts:741](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L741)

___

### getBlockHashes

▸ **getBlockHashes**(`__namedParameters`): `Promise`<`default`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.from?` | `Buffer` \| `Buffer`[] |
| `__namedParameters.timeoutSeconds?` | `number` |
| `__namedParameters.to?` | `Buffer` |

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/peer.ts:607](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L607)

___

### getBlocks

▸ **getBlocks**(`blockHashes`): `Promise`<`default`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHashes` | `Buffer`[] |

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/peer.ts:719](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L719)

___

### getDSProof

▸ **getDSProof**(`dspId`): `Promise`<`default`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dspId` | `Buffer` |

#### Returns

`Promise`<`default`\>

#### Defined in

[src/peer.ts:828](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L828)

___

### getDSProofs

▸ **getDSProofs**(`dspIds`): `Promise`<`default`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dspIds` | `Buffer`[] |

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/peer.ts:823](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L823)

___

### getHeaders

▸ **getHeaders**(`__namedParameters`): `Promise`<`default`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.from?` | `Buffer` \| `Buffer`[] |
| `__namedParameters.timeoutSeconds?` | `number` |
| `__namedParameters.to?` | `Buffer` |

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/peer.ts:587](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L587)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](Peer.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:526

___

### getMempool

▸ **getMempool**(): `Promise`<`Buffer`[]\>

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/peer.ts:629](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L629)

___

### getMempoolTransactions

▸ **getMempoolTransactions**(): `Promise`<`default`[]\>

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/peer.ts:636](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L636)

___

### getPeerAddresses

▸ **getPeerAddresses**(`timeoutSeconds?`): `Promise`<`NetAddress`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<`NetAddress`[]\>

#### Defined in

[src/peer.ts:860](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L860)

___

### getRawDSProof

▸ **getRawDSProof**(`dspId`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dspId` | `Buffer` |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

[src/peer.ts:818](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L818)

___

### getRawDSProofs

▸ **getRawDSProofs**(`dspIds`): `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dspIds` | `Buffer`[] |

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/peer.ts:802](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L802)

___

### getRawTransaction

▸ **getRawTransaction**(`txHash`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txHash` | `Buffer` |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

[src/peer.ts:704](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L704)

___

### getRawTransactions

▸ **getRawTransactions**(`txHashes`): `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txHashes` | `Buffer`[] |

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/peer.ts:688](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L688)

___

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<`default`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txHash` | `Buffer` |

#### Returns

`Promise`<`default`\>

#### Defined in

[src/peer.ts:714](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L714)

___

### getTransactions

▸ **getTransactions**(`txHashes`): `Promise`<`default`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txHashes` | `Buffer`[] |

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/peer.ts:709](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L709)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:616

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:539

___

### off

▸ **off**(`eventName`, `listener`): [`Peer`](Peer.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`Peer`](Peer.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`Peer`](Peer.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:414

___

### ping

▸ **ping**(`timeoutSeconds?`): `Promise`<`number`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeoutSeconds` | `number` | `30` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/peer.ts:866](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L866)

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Peer`](Peer.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Peer`](Peer.md)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:650

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`Since`**

v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:569

___

### readMessage

▸ **readMessage**(`buffer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Buffer` |

#### Returns

`void`

#### Defined in

[src/peer.ts:247](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L247)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Peer`](Peer.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Peer`](Peer.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:494

___

### sendMessage

▸ **sendMessage**(`command`, `payload`, `force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `command` | `string` | `undefined` |
| `payload` | ``null`` \| `Buffer` | `undefined` |
| `force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/peer.ts:158](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L158)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Peer`](Peer.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Peer`](Peer.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:520

___

### setupKeepAlive

▸ **setupKeepAlive**(): `void`

#### Returns

`void`

#### Defined in

[src/peer.ts:133](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L133)

___

### streamBlock

▸ **streamBlock**(`chunk`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `Buffer` |

#### Returns

`void`

#### Defined in

[src/peer.ts:175](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L175)

___

### watchAddressTransactions

▸ **watchAddressTransactions**(`cashaddr`, `callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cashaddr` | `string` |
| `callback` | (`transaction`: `default`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:780](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L780)

___

### watchDSProofIds

▸ **watchDSProofIds**(`callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`dspId`: `Buffer`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:833](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L833)

___

### watchDSProofs

▸ **watchDSProofs**(`callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`dsProof`: `default`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:850](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L850)

___

### watchMempoolRawTransactions

▸ **watchMempoolRawTransactions**(`callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`rawTransaction`: `Buffer`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:760](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L760)

___

### watchMempoolTransactionHashes

▸ **watchMempoolTransactionHashes**(`callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`txHash`: `Buffer`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:753](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L753)

___

### watchMempoolTransactions

▸ **watchMempoolTransactions**(`callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`transaction`: `default`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:770](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L770)

___

### watchNewBlocks

▸ **watchNewBlocks**(`callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`blockHash`: `Buffer`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:746](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L746)

___

### watchRawDSProofs

▸ **watchRawDSProofs**(`callback`): [`CancelWatch`](../README.md#cancelwatch)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`rawDsProof`: `Buffer`) => `void` |

#### Returns

[`CancelWatch`](../README.md#cancelwatch)

#### Defined in

[src/peer.ts:840](https://github.com/mainnet-pat/p2p-cash/blob/master/src/peer.ts#L840)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`Since`**

v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.getEventListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:299

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:271

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`Since`**

v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:254

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`Since`**

v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:194

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:195

___

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, ...`eventTargets`): `void`

```js
const {
  setMaxListeners,
  EventEmitter
} = require('events');

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

**`Since`**

v15.4.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | - |

#### Returns

`void`

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:317

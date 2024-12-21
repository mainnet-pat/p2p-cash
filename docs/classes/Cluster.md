[p2p-cash](../README.md) / Cluster

# Class: Cluster

High-level electrum client that provides transparent load balancing, confidence checking and/or low-latency polling.

## Hierarchy

- `EventEmitter`

  ↳ **`Cluster`**

## Table of contents

### Constructors

- [constructor](Cluster.md#constructor)

### Properties

- [clients](Cluster.md#clients)
- [clusterOptions](Cluster.md#clusteroptions)
- [connections](Cluster.md#connections)
- [requestCounter](Cluster.md#requestcounter)
- [requestLock](Cluster.md#requestlock)
- [requestPromises](Cluster.md#requestpromises)
- [responseLock](Cluster.md#responselock)
- [status](Cluster.md#status)
- [strategy](Cluster.md#strategy)
- [timeout](Cluster.md#timeout)
- [unsubscribes](Cluster.md#unsubscribes)
- [captureRejectionSymbol](Cluster.md#capturerejectionsymbol)
- [captureRejections](Cluster.md#capturerejections)
- [defaultMaxListeners](Cluster.md#defaultmaxlisteners)
- [errorMonitor](Cluster.md#errormonitor)

### Methods

- [addListener](Cluster.md#addlistener)
- [addServer](Cluster.md#addserver)
- [broadcastTransaction](Cluster.md#broadcasttransaction)
- [broadcastTransactions](Cluster.md#broadcasttransactions)
- [connect](Cluster.md#connect)
- [disconnect](Cluster.md#disconnect)
- [emit](Cluster.md#emit)
- [eventNames](Cluster.md#eventnames)
- [getBlock](Cluster.md#getblock)
- [getBlockHashes](Cluster.md#getblockhashes)
- [getBlocks](Cluster.md#getblocks)
- [getDSProof](Cluster.md#getdsproof)
- [getDSProofs](Cluster.md#getdsproofs)
- [getHeaders](Cluster.md#getheaders)
- [getMaxListeners](Cluster.md#getmaxlisteners)
- [getMempool](Cluster.md#getmempool)
- [getMempoolTransactions](Cluster.md#getmempooltransactions)
- [getPeerAddresses](Cluster.md#getpeeraddresses)
- [getRawDSProof](Cluster.md#getrawdsproof)
- [getRawDSProofs](Cluster.md#getrawdsproofs)
- [getRawTransaction](Cluster.md#getrawtransaction)
- [getRawTransactions](Cluster.md#getrawtransactions)
- [getTransaction](Cluster.md#gettransaction)
- [getTransactions](Cluster.md#gettransactions)
- [listenerCount](Cluster.md#listenercount)
- [listeners](Cluster.md#listeners)
- [off](Cluster.md#off)
- [on](Cluster.md#on)
- [once](Cluster.md#once)
- [ping](Cluster.md#ping)
- [prependListener](Cluster.md#prependlistener)
- [prependOnceListener](Cluster.md#prependoncelistener)
- [rawListeners](Cluster.md#rawlisteners)
- [ready](Cluster.md#ready)
- [removeAllListeners](Cluster.md#removealllisteners)
- [removeListener](Cluster.md#removelistener)
- [request](Cluster.md#request)
- [setMaxListeners](Cluster.md#setmaxlisteners)
- [shutdown](Cluster.md#shutdown)
- [startup](Cluster.md#startup)
- [subscribe](Cluster.md#subscribe)
- [watchAddressTransactions](Cluster.md#watchaddresstransactions)
- [watchDSProofIds](Cluster.md#watchdsproofids)
- [watchDSProofs](Cluster.md#watchdsproofs)
- [watchMempoolRawTransactions](Cluster.md#watchmempoolrawtransactions)
- [watchMempoolTransactionHashes](Cluster.md#watchmempooltransactionhashes)
- [watchMempoolTransactions](Cluster.md#watchmempooltransactions)
- [watchNewBlocks](Cluster.md#watchnewblocks)
- [watchRawDSProofs](Cluster.md#watchrawdsproofs)
- [getEventListeners](Cluster.md#geteventlisteners)
- [listenerCount](Cluster.md#listenercount-1)
- [on](Cluster.md#on-1)
- [once](Cluster.md#once-1)
- [setMaxListeners](Cluster.md#setmaxlisteners-1)

## Constructors

### constructor

• **new Cluster**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ClusterOptions`](../interfaces/ClusterOptions.md) |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/cluster.ts:69](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L69)

## Properties

### clients

• **clients**: `Object` = `{}`

#### Index signature

▪ [index: `string`]: [`ClientConfig`](../interfaces/ClientConfig.md)

#### Defined in

[src/cluster.ts:37](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L37)

___

### clusterOptions

• **clusterOptions**: [`ClusterOptions`](../interfaces/ClusterOptions.md)

#### Defined in

[src/cluster.ts:59](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L59)

___

### connections

• **connections**: `number` = `0`

#### Defined in

[src/cluster.ts:40](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L40)

___

### requestCounter

• **requestCounter**: `number` = `0`

#### Defined in

[src/cluster.ts:46](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L46)

___

### requestLock

• **requestLock**: `Mutex`

#### Defined in

[src/cluster.ts:52](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L52)

___

### requestPromises

• **requestPromises**: `Object` = `{}`

#### Index signature

▪ [index: `number`]: `Promise`<`Error` \| [`RequestResponse`](../README.md#requestresponse)\>[]

#### Defined in

[src/cluster.ts:49](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L49)

___

### responseLock

• **responseLock**: `Mutex`

#### Defined in

[src/cluster.ts:55](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L55)

___

### status

• **status**: [`ClusterStatus`](../enums/ClusterStatus.md) = `ClusterStatus.DISABLED`

#### Defined in

[src/cluster.ts:43](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L43)

___

### strategy

• **strategy**: [`ClusterStrategy`](../interfaces/ClusterStrategy.md)

#### Defined in

[src/cluster.ts:34](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L34)

___

### timeout

• **timeout**: `number` = `DefaultParameters.TIMEOUT`

#### Defined in

[src/cluster.ts:61](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L61)

___

### unsubscribes

• **unsubscribes**: `WeakMap`<`object`, `Function`\>

#### Defined in

[src/cluster.ts:57](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L57)

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

▸ **addListener**(`eventName`, `listener`): [`Cluster`](Cluster.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Cluster`](Cluster.md)

#### Overrides

EventEmitter.addListener

#### Defined in

[src/cluster.ts:107](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L107)

___

### addServer

▸ **addServer**(`options`, `autoConnect?`): `Promise`<`void`\>

Adds a server to the cluster.

**`Throws`**

if the cluster's version is not a valid version string.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `options` | [`PeerOptions`](../interfaces/PeerOptions.md) | `undefined` | - |
| `autoConnect` | `boolean` | `true` | flag indicating whether the server should automatically connect (default true) |

#### Returns

`Promise`<`void`\>

a promise that resolves when the connection has been initiated.

#### Defined in

[src/cluster.ts:141](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L141)

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

[src/cluster.ts:748](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L748)

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

[src/cluster.ts:753](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L753)

___

### connect

▸ **connect**(): `Promise`<`boolean`\>

Force connect all added servers

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/cluster.ts:629](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L629)

___

### disconnect

▸ **disconnect**(): `Promise`<`void`[]\>

Alias for shutdown

#### Returns

`Promise`<`void`[]\>

#### Defined in

[src/cluster.ts:676](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L676)

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

[src/cluster.ts:780](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L780)

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

[src/cluster.ts:727](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L727)

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

[src/cluster.ts:776](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L776)

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

[src/cluster.ts:852](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L852)

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

[src/cluster.ts:848](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L848)

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

[src/cluster.ts:715](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L715)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](Cluster.md#defaultmaxlisteners).

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

[src/cluster.ts:739](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L739)

___

### getMempoolTransactions

▸ **getMempoolTransactions**(): `Promise`<`default`[]\>

#### Returns

`Promise`<`default`[]\>

#### Defined in

[src/cluster.ts:743](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L743)

___

### getPeerAddresses

▸ **getPeerAddresses**(`timeoutSeconds?`): `Promise`<`NetAddress`[][]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeoutSeconds` | `number` |

#### Returns

`Promise`<`NetAddress`[][]\>

#### Defined in

[src/cluster.ts:883](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L883)

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

[src/cluster.ts:844](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L844)

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

[src/cluster.ts:840](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L840)

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

[src/cluster.ts:764](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L764)

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

[src/cluster.ts:760](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L760)

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

[src/cluster.ts:772](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L772)

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

[src/cluster.ts:768](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L768)

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

▸ **off**(`eventName`, `listener`): [`Cluster`](Cluster.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Cluster`](Cluster.md)

#### Overrides

EventEmitter.off

#### Defined in

[src/cluster.ts:116](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L116)

___

### on

▸ **on**(`eventName`, `listener`): [`Cluster`](Cluster.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Cluster`](Cluster.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/cluster.ts:102](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L102)

___

### once

▸ **once**(`eventName`, `listener`): [`Cluster`](Cluster.md)

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

[`Cluster`](Cluster.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:414

___

### ping

▸ **ping**(`timeoutSeconds?`): `Promise`<`number`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeoutSeconds` | `number` | `30` |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/cluster.ts:887](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L887)

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Cluster`](Cluster.md)

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

[`Cluster`](Cluster.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Cluster`](Cluster.md)

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

[`Cluster`](Cluster.md)

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

### ready

▸ **ready**(): `Promise`<`boolean`\>

Provides a method to check or wait for the cluster to become ready.

#### Returns

`Promise`<`boolean`\>

a promise that resolves when the required servers are available.

#### Defined in

[src/cluster.ts:580](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L580)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Cluster`](Cluster.md)

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

[`Cluster`](Cluster.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Cluster`](Cluster.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Cluster`](Cluster.md)

#### Overrides

EventEmitter.removeListener

#### Defined in

[src/cluster.ts:120](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L120)

___

### request

▸ **request**(`requireIntegrity`, `method`, ...`parameters`): `Promise`<[`RequestResponse`](../README.md#requestresponse)\>

Calls a method on the remote server with the supplied parameters.

 *

**`Throws`**

if not enough clients are connected

**`Throws`**

if no response is received with sufficient integrity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requireIntegrity` | `boolean` | ensure all connections within strategy respond with the same data |
| `method` | `string` | name of the method to call. |
| `...parameters` | [`RPCParameter`](../README.md#rpcparameter)[] | one or more parameters for the method. |

#### Returns

`Promise`<[`RequestResponse`](../README.md#requestresponse)\>

a promise that resolves with the result of the method.

#### Defined in

[src/cluster.ts:291](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L291)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Cluster`](Cluster.md)

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

[`Cluster`](Cluster.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:520

___

### shutdown

▸ **shutdown**(`retainSubscriptions?`): `Promise`<`void`[]\>

Disconnects all servers from the cluster. Removes all event listeners and
handlers from all underlying clients and connections. This includes all
active subscriptions, unless retainSubscriptions is set to true.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `retainSubscriptions` | `boolean` | `false` | retain subscription data so they will be restored on reconnection. |

#### Returns

`Promise`<`void`[]\>

a list with the disconnection result for every client

#### Defined in

[src/cluster.ts:689](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L689)

___

### startup

▸ **startup**(): `Promise`<`void`[]\>

Connects all servers from the cluster and attaches event listeners and handlers
for all underlying clients and connections.

**`Throws`**

if the cluster's version is not a valid version string.

#### Returns

`Promise`<`void`[]\>

#### Defined in

[src/cluster.ts:640](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L640)

___

### subscribe

▸ **subscribe**(`callback`, `method`): `Promise`<`Function`\>

Subscribes to the method at the cluster and attaches the callback function to the event feed.

**`Throws`**

if not enough clients are connected

**`Throws`**

if no response is received with sufficient integrity for the initial request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`SubscribeCallback`](../README.md#subscribecallback) | a function that should get notification messages. |
| `method` | `string` | one of the subscribable methods the server supports. |

#### Returns

`Promise`<`Function`\>

a promise resolving to true when the subscription is set up.

#### Defined in

[src/cluster.ts:491](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L491)

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

[src/cluster.ts:818](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L818)

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

[src/cluster.ts:856](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L856)

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

[src/cluster.ts:873](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L873)

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

[src/cluster.ts:798](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L798)

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

[src/cluster.ts:791](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L791)

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

[src/cluster.ts:808](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L808)

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

[src/cluster.ts:784](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L784)

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

[src/cluster.ts:863](https://github.com/mainnet-pat/p2p-cash/blob/master/src/cluster.ts#L863)

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

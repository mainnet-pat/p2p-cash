import { BufferWriter } from "bitcoin-minimal/lib/utils";
import { Peer } from "../src/peer";
import { GetData } from "../src/messages";
import { NetAddress } from "../src/messages/address";
import Message from "../src/messages/message";
import { Header, Transaction } from "bitcoin-minimal";
import { MAGIC_NUMS, MAX_PER_MSG } from "../src/config";

import { Cluster } from "../src/cluster";
import { PeerOptions } from "../src/interfaces";

(async () => {
  const options: PeerOptions = {
    ticker: "BCH",
    // node: "[2401:d002:3902:0700:d28e:56b6:a15b:8f41]:8333",
    // node: "2401:d002:3902:0700:d28e:56b6:a15b:8f41",
    // node: `95.217.42.32:8333`,
    // node: `3.142.98.179`,
    node: `194.156.188.60`,
    // node: `127.0.0.1`,
    port: 8333,
    // port: 18444, // regtest
    // wsProxyNode: `127.0.0.1`,
    wsProxyNode: `wsproxy.mainnet-pat.me`,
    // wsProxyPort: 8333,
    wsProxyPort: 443,
    useSSL: true,
    // node: `127.0.0.1`,
    // port: 8333,
    DEBUG_LOG: true,
    listenRelay: true,
    stream: false,
    // magic: MAGIC_NUMS["REGTEST"]
  };

  const cluster = new Cluster({confidence: 1});
  cluster.addServer(options);
  // cluster.addServer({...options, node: "3.142.98.179" });
  // cluster.addServer({...options, node: "3.211.190.198" });

  cluster.once("connected", () => {
    console.log(`Connected event!`);
  });

  const callback = (...args: any[]) => {
    console.log("zzz");
  };

  // const cancelFn = await cluster.subscribe(callback, "dsproof");
  // const cancelFn2 = await cluster.subscribe(callback, "dsproof");

  // cluster.on("new_tx", (txId) => {
  //   console.log("mempool", txId);
  // })
    // const cancelFn2 = await cluster.subscribe((txId) => {
    //     console.log("mempool", txId);
    //   }, "new_tx");

  // cluster.watchDSProofs((dsproof) => {
  //   console.log(dsproof);
  // });
  await cluster.ready();


  cluster.getTransaction(Buffer.from("6e15bc882612a0aaf30277b02492d03eaa515db51a8e4d81a8f9b29c44e1b350", "hex"));


  // console.log(await cluster.request(true, "getMempool"));


  // await cluster.getDSProof(Buffer.from("72987033139ac8da30c7a52b6df825a7d8b8c8ea7d0f6448d6ab887dd3ad5a96", "hex"))
  // console.log(1, 
  //   );

  // await new Promise((r) => setTimeout(r, 1000 * 5));

  // // Object.keys(cluster.clients).forEach(val => {
  // //   console.log(cluster.clients[val].connection.subscriptionCallbacks);
  // // })

  // // await cluster.unsubscribe(callback, "dsproof");
  // cancelFn();
  // cancelFn2();

  // await cluster.getDSProof(Buffer.from("72987033139ac8da30c7a52b6df825a7d8b8c8ea7d0f6448d6ab887dd3ad5a96", "hex"))
  // console.log(2, 
  //   );

  // console.log( await cluster.ping() );

  console.log(`Connected`);
  // const delay = await cluster.ping();
  // console.log(`cluster responded in ${delay} ms`);

  await new Promise((r) => setTimeout(r, 1000 * 3000));
  cluster.shutdown();
})();



// (async () => {
//   const options: PeerOptions = {
//     ticker: "BCH",
//     // node: "[2401:d002:3902:0700:d28e:56b6:a15b:8f41]:8333",
//     // node: "2401:d002:3902:0700:d28e:56b6:a15b:8f41",
//     // node: `95.217.42.32:8333`,
//     // node: `3.142.98.179`,
//     node: `127.0.0.1`,
//     port: 18444,
//     // node: `127.0.0.1`,
//     // port: 8333,
//     DEBUG_LOG: true,
//     mempoolTxs: true,
//     stream: false,
//     magic: Buffer.from("dab5bffa", "hex")
//   };
//   const peer = new BitcoinP2P(options);
//   peer.once("connected", () => {
//     console.log(`Connected event!`);
//   });

//   // peer.on("transactions", ({ transactions, header, started, finished }) => {
//   //   console.trace(JSON.stringify({ transactions, header, started, finished }, null, 2))
//   //   process.exit(0);
//   //   if (header) {
//   //     console.log(
//   //       `Received ${transactions.length} block txs ${
//   //         started ? `started` : finished ? "finished" : ""
//   //       }`
//   //     );
//   //   } else {
//   //     console.log(`Received ${transactions.length} mempool txs`);
//   //   }
//   // });

//   peer.on("error_message", ({ error, buffer, magic, extmsg }) => {
//     try {
//       const message = Message.read({ buffer, magic, extmsg });
//       // const { command, payload, end, needed } = message;
//       console.error(`ERROR MESSAGE`, message, error);
//     } catch (err) {
//       console.error(`ERROR MESSAGE: Message parse error`, error, err);
//     }
//   });
//   peer.on("block_chunk", (obj) => {
//     console.log(`Received block chunk`, obj);
//   });
//   peer.on("block", (obj) => {
//     console.log(`Received block`, obj);
//   });
//   peer.on("headers", (obj) => {
//     // console.log(`Received headers`, obj);
//   });
//   peer.on("addr", ({ addrs }: { addrs: NetAddress[] }) => {
//     // addrs.map((addr) => console.log(addr));
//   });
//   peer.on("disconnected", ({ disconnects }) => {
//     console.trace(`Disconnected to peer`);
//   });

//   peer.on("inv", (txs) => {
//     if (txs.length) {
//       peer.sendMessage("tx", txs[0]);
//     }
//   });

//   peer.watchAddressTransactions("bchreg:qpttdv3qg2usm4nm7talhxhl05mlhms3ys43u76rn0", (transaction) => {
//     console.log(transaction);
//   });

//   await peer.connect();

//   // peer.sendMessage("getblocks", payload);
//   // const headers: Header[] = await peer.emitter.wait(
//   //   "headers",
//   //   null,
//   //   30000
//   // );
//   // console.log(headers);

//   peer.on("command", (args) => {
//     console.log(args);
//   })
//   // console.log(3333, await peer._getTxs([
//   //   Buffer.from("e529ebdd7e1468573d358a8b59806d1507d3ff5866cd16e9fe5193013c1566b2", "hex"),
//   //   Buffer.from("f8d93ffa6cd40b270e435157ba4515856ce9f0aee0fc48576e1caebae19c5b02", "hex")]));

//   // console.log(3333, await peer.getBlocks([
//   //   Buffer.from("000000000000000001ff9b0e0e90e37a08f29ab5b3cbd937f4040d454e08e109", "hex"),
//   // ]));

//   // console.log(3333, await peer.getBlockHashes({
//   //   from: Buffer.from("0000000000000000011f935eda516c1eb358f17f5d65f1f6e81b8154c59daa22", "hex"),
//   //   to: Buffer.from("0000000000000000011f935eda516c1eb358f17f5d65f1f6e81b8154c59daa22", "hex"),
//   // }));
//   // console.log(3333, await peer._getMempoolTransactions());

//           // const promise = peer.emitter.wait("inv");

//           // peer.emitter.emit("inv", {
//           //   txs: Array.from({length: MAX_PER_MSG-1}, (e, i)=> i)
//           // })
//           // peer.emitter.emit("inv", {
//           //   txs: Array.from({length: 100}, (e, i)=> i)
//           // })

//           // console.log((await promise).txs.length);

//   // peer.watchMempoolTransactions((transaction) => {
//   //   console.log(12);
//   // });
//   // await peer.getMempool();

//   // peer.fetchMempoolTxs((txids: Buffer[]) => txids);

//   // peer.watchDSProofIds((dsproofid) => {
//   //   console.log("0", dsproofid);
//   // })
//   // peer.watchRawDSProofs(rawproof => {
//   //   console.log("1", rawproof);
//   // })
//   // peer.watchDSProofs(dsproof => {
//   //   console.log("2", dsproof);
//   // })

//   // console.log(await peer.broadcastTransactions([Transaction.fromBuffer(Buffer.from("0200000001b5a45b6cd1d4a9f172a888074c519403bc5f522f5e42c129ac8149d2926fb35700000000644123c2a55d382632483ffaa52b4c551ec68c8f2cf5dbbb15b67b76e997e92ca37d54f8e3528f7abba60442bbf9d37635e3d5d17d4505a2d8cc5e182925ea31bf2e412103410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a70000000002e8030000000000001976a91456b6b22042b90dd67bf2fbfb9aff7d37fbee112488ac3ced052a010000001976a91456b6b22042b90dd67bf2fbfb9aff7d37fbee112488ac00000000","hex")),
//   //   Transaction.fromBuffer(Buffer.from("0200000001b5a45b6cd1d4a9f172a888074c519403bc5f522f5e42c129ac8149d2926fb35700000000644123c2a55d382632483ffaa52b4c551ec68c8f2cf5dbbb15b67b76e997e92ca37d54f8e3528f7abba60442bbf9d37635e3d5d17d4505a2d8cc5e182925ea31bf2e412103410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a70000000002e8030000000000001976a91456b6b22042b90dd67bf2fbfb9aff7d37fbee112488ac3ced052a010000001976a91456b6b22042b90dd67bf2fbfb9aff7d37fbee112488ac00000000","hex"))]));
//   // await peer.broadcastTx(Transaction.fromBuffer(Buffer.from("0200000001b5a45b6cd1d4a9f172a888074c519403bc5f522f5e42c129ac8149d2926fb35700000000644123c2a55d382632483ffaa52b4c551ec68c8f2cf5dbbb15b67b76e997e92ca37d54f8e3528f7abba60442bbf9d37635e3d5d17d4505a2d8cc5e182925ea31bf2e412103410ef048b3da351793f6ed14cc2fde460becc5b658d9138443b9a3000707a6a70000000002e8030000000000001976a91456b6b22042b90dd67bf2fbfb9aff7d37fbee112488ac3ced052a010000001976a91456b6b22042b90dd67bf2fbfb9aff7d37fbee112488ac00000000","hex")));
//   // console.log(await peer.getDSProof(Buffer.from("ec56e083aec716e30bd9aae9f32676543744205c5bff4337ed5a27fcc74e99e3", "hex")));
//   // console.log((await peer.getRawDSProof(Buffer.from("ec56e083aec716e30bd9aae9f32676543744205c5bff4337ed5a27fcc74e99e3", "hex"))).toString("hex"));


//   // peer.watchDSProofs((dsproof) => {
//   //   console.log("a", dsproof);
//   // })

//   console.log(`Connected`);
//   const delay = await peer.ping();
//   console.log(`Peer responded in ${delay} ms`);

//   await new Promise((r) => setTimeout(r, 1000 * 3));
//   // console.log(`Getting peers of peers`);
//   // let addrs = await peer.getAddr();
//   // console.log(addrs);

//   // const headers = await peer.getHeaders({});
//   // console.log(`Headers`, headers);

//   // const headers = await peer.getBlockHashes({});
//   // console.log(`Headers`, headers);

//   // peer.fetchMempoolTxs((txids) => txids); // Return filtered txids to download mempool txs
//   // peer.fetchNewBlocks((hashes) => hashes); // Return filtered block hashes to download new blocks

//   // await new Promise((r) => setTimeout(r, 1000 * 3));
//   // console.log(`Getting block...`);
//   // let blockInfo = await peer.getBlock(
//   //   "000000000000002245b638f45da58d88a31f51b0847fe20c0767401dc239d8b5"
//   // );
//   // console.log(blockInfo);
//   await new Promise((r) => setTimeout(r, 1000 * 3000));
//   peer.disconnect();
// })();

import { utils } from "bitcoin-minimal";

import crypto from "crypto";
import Address, { MessageAddress } from "./address";
import { VERSIONS, USER_AGENTS } from "../config";

const { BufferReader, BufferWriter } = utils;

const VERSION_OBJ = {
  // version: 70001,
  // services: Buffer.alloc(8, 0),
  // version: VERSION,
  services: Buffer.from("0000000000000000", "hex"),
  // services: new BN(0),
  // timestamp: ,
  addrRecv: {
    services: Buffer.alloc(8, 0),
    // services: new BN(0),
    ip: Buffer.alloc(16, 0),
    port: 0,
  },
  addrFrom: {
    services: Buffer.alloc(8, 0),
    // services: new BN(0),
    ip: Buffer.alloc(16, 0),
    port: 0,
  },
  nonce: crypto.randomBytes(8),
  // userAgent: ,
  // startHeight: 0,
  relay: Buffer.from([1]), // Receive mempool txs
} as const;

function read(payload: Buffer | utils.BufferReader) {
  let br = payload;
  if (Buffer.isBuffer(br)) br = new BufferReader(br);
  // We don't NEED to explicityly type this, but it'll
  // be helpful so others can re-use the interface
  const result = {
    version: br.readUInt32LE(),
    // services : br.readUInt64LE(,
    services: br.readReverse(8),
    timestamp: br.readUInt64LE(),
    addrRecv: Address.read(br, true),
    addrFrom: Address.read(br, true),
    nonce: br.read(8),
    userAgent: br.readVarLengthBuffer().toString(),
    startHeight: br.readUInt32LE(),
    relay: br.readUInt8(),
  };
  // if (!br.eof()) throw new Error(`Invalid payload`)
  return result;
}

export type VersionOptions = {
  userAgent?: string;
  timestamp?: bigint;
  version?: number;
  services?: Buffer;
  addrRecv?: MessageAddress;
  addrFrom?: MessageAddress;
  nonce?: Buffer;
  startHeight?: number;
  relay?: Buffer;
};

export interface WriteVersionOptions {
  ticker: string;
  userAgent?: string;
  startHeight?: number;
  mempoolTxs: boolean;
  version: number;
  options?: VersionOptions;
}

function write({
  ticker,
  userAgent: _userAgent,
  startHeight: _startHeight,
  mempoolTxs,
  version: _version,
  options,
}: WriteVersionOptions) {
  options = {
    ...VERSION_OBJ,
    userAgent: _userAgent,
    startHeight: _startHeight,
    version: _version,
    relay: mempoolTxs ? Buffer.from([1]) : Buffer.from([0]),
    ...options,
  };
  let {
    version = VERSIONS[ticker] || VERSIONS.DEFAULT,
    services = VERSION_OBJ.services,
    timestamp = BigInt(Math.round(+new Date() / 1000)),
    addrRecv = VERSION_OBJ.addrRecv,
    addrFrom = VERSION_OBJ.addrFrom,
    nonce = VERSION_OBJ.nonce,
    userAgent = USER_AGENTS[ticker] || USER_AGENTS.DEFAULT,
    startHeight = 0,
    relay = VERSION_OBJ.relay,
  } = options;

  const bw = new BufferWriter();
  bw.writeUInt32LE(version);
  // bw.writeUInt64LE(services)
  bw.writeReverse(services);
  bw.writeUInt64LE(timestamp);
  bw.write(Address.write(addrRecv));
  bw.write(Address.write(addrFrom));
  bw.write(nonce);
  bw.writeVarintNum(Buffer.from(userAgent).length);
  bw.write(Buffer.from(userAgent));
  bw.writeUInt32LE(startHeight);
  bw.write(relay);
  return bw.toBuffer();
}

const Version = {
  read,
  write,
};

export default Version;

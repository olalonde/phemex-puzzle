const { bn2buf, buf2bn, prime21, b58decode } = require("./utils");
const { all: hashFns, sha256, doubleSha256, ripemd160 } = require("./hashes");
const { cartesianProduct } = require("./permutations");
const secp256k1 = require("secp256k1");
const bip32 = require("bip32");
const wif = require("wif");
const crypto = require("crypto");

const MAX_BN = 2n ** 256n;

const privkeyToCompressedPubkey = privkeyN => {
  const privkeyBuf = bn2buf(privkeyN, 32);
  if (privkeyBuf.length != 32) {
    console.log(privkeyBuf.length);
    console.log(privkeyBuf);
  }
  const compressedPubKey = secp256k1.publicKeyCreate(privkeyBuf);
  return buf2bn(compressedPubKey);
};

// encodes privKey in BigInt format to WIF compressed
const toWIF = bn => {
  const buf = bn2buf(bn);
  const BITCOIN_MAINNET = 0x80;
  const compressed = true;
  return wif.encode(BITCOIN_MAINNET, buf, compressed);
};

// taken from https://www.blockchain.com/btc/tx/367c0e15b246dd48e5e6504beb50f4f184b48012c1ecd3cff5f576dd0463f703
// also see https://github.com/olalonde/phemex-puzzle/blob/master/notebooks/pubkey%20(found%20from%20spend%20transaction).ipynb
const phemexCompressedPubkey = 0x02b4a72e4aaa69ba04b80c6891df01f50d191a65eccc61e4e9862d1e421ce815b3n;

const verifyPrivKey = (
  privKey,
  expectedCompressedPubkey = phemexCompressedPubkey
) => {
  const compressedPubKey = privkeyToCompressedPubkey(privKey);
  const matches = compressedPubKey === expectedCompressedPubkey;
  if (matches) {
    console.log("priv key found!!! ", toWIF(privKey));
  }
  return matches;
};

const verifyBip32Node = (
  node,
  k = 0, // optional index
  expectedCompressedPubkey = phemexCompressedPubkey,
  paths_ = false
) => {
  // that should more or less covers it
  const paths = paths_
    ? paths_
    : [
        "m/0",
        "m/1",
        `m/${k}`,
        "m/0/0",
        "m/0/1",
        `m/0/${k}`,
        "m/1/0",
        "m/1/1",
        `m/1/${k}`,
        `m/${k}/0`,
        `m/${k}/1`,
        `m/0'/0`,
        `m/0'/1`,
        `m/0'/${k}`,
        `m/${k}'/0`,
        `m/${k}'/1`,
        // bitcoin core
        `m/0'/0'/0'`,
        `m/0'/0'/1'`,
        `m/0'/0'/${k}'`,
        // ledger
        `m/44'/0'/0'/0`,
        `m/44'/0'/0'/1`,
        `m/44'/0'/0'/${k}`,
        `m/44'/0'/1'/0`,
        `m/44'/0'/1'/1`,
        `m/44'/0'/1'/${k}`,
        `m/44'/0'/${k}'/0`,
        `m/44'/0'/${k}'/1`,
        `m/44'/${k}'/0'/0`,
        `m/44'/${k}'/1'/0`,
        `m/44'/${k}'/0'/1`,
        `m/44'/${k}'/1'/1`,
        // blockchain.info
        `m/44'/0'/0'/0`,
        `m/44'/0'/0'/${k}`,
        // bip44
        `m/44'/0'/0'/0/0`,
        `m/44'/0'/0'/0/1`,
        `m/44'/0'/0'/0/${k}`,
        `m/44'/0'/0'/1/${k}`,
        `m/44'/0'/${k}'/0/0`,
        `m/44'/0'/${k}'/1/0`,
        `m/44'/0'/${k}'/0/1`,
        `m/44'/0'/${k}'/1/1`
      ];
  const childNodes = paths.map(path => node.derivePath(path));

  // try a few derived keys
  return [node, ...childNodes]
    .map(childNode => {
      const privKey = buf2bn(childNode.privateKey);
      return verifyPrivKey(privKey, expectedCompressedPubkey);
    })
    .includes(true);
};

const verifyBip32 = (bn, ...args) => {
  const bnBuf = bn2buf(bn, 32);
  const prime21Buf = bn2buf(prime21, 32);
  const nodeFromSeed = bip32.fromSeed(bn2buf(bn, 16));
  // use num27 as priv key and prime21 as chain code
  const nodeFromPrivKey1 = bip32.fromPrivateKey(bnBuf, prime21Buf);
  // use prime21 as priv key and num27 as chain code
  const nodeFromPrivKey2 = bip32.fromPrivateKey(prime21Buf, bnBuf);
  // try a few derived keys
  return [nodeFromSeed, nodeFromPrivKey1, nodeFromPrivKey2]
    .map(node => {
      return verifyBip32Node(node, ...args);
    })
    .includes(true);
};

const verifyNum_ = (bn, expectedCompressedPubkey = phemexCompressedPubkey) => {
  return [
    // verify directly as private key directly
    verifyPrivKey(bn, expectedCompressedPubkey),
    // verify as seed for bip32
    verifyBip32(bn, 0, expectedCompressedPubkey, [
      "m/0",
      "m/0'/0",
      "m/0/0",
      "m/44'/0'/0'/0/0"
    ])
    //berifyBip32Seed(bn, 0, expectedCompressedPubkey)
    // verifyBip32(bn, 21, expectedCompressedPubkey)
  ].includes(true);
};

// applies hashes to bn before verifying
const verifyNum = (bn, expectedCompressedPubkey = phemexCompressedPubkey) => {
  // verify num but also the result of a few hashes
  const bnAscii = buf2bn(Buffer.from(`${bn}`, "ascii"));
  return [
    bn,
    // convert number to ascii string
    bnAscii < MAX_BN ? bnAscii : 1,
    // apply hashes,
    ...[sha256].map(hash => hash(bn)),
    ...[sha256].map(hash => hash(bnAscii))
    // ...[sha256, doubleSha256, ripemd160].map(hash => hash(bn)),
    // ...[sha256, doubleSha256, ripemd160].map(hash => hash(bnAscii))
    // ...hashFns.map(hash => hash(bn)),
    // ...hashFns.map(hash => hash(bnAscii))
  ]
    .map(bn_ => verifyNum_(bn_, expectedCompressedPubkey))
    .includes(true);
};

const hmac = (algo, key, input_) => {
  let input = input_;
  if (typeof input === "bigint") {
    input = bn2buf(input);
  }
  const h = crypto.createHmac(algo, key);
  h.update(input);
  return buf2bn(h.digest());
};

const verify27Num = n => {
  // const Phemex = b58decode("Phemex");
  // combine with prime21 in different ways
  return [
    n,
    prime21 * n,
    // n % prime21,
    // (n * Phemex) % prime21,
    // (n + Phemex) % prime21,
    prime21 + n,
    prime21 ^ n, // xor
    // buf2bn(Buffer.from(`${n}${prime21}`, "ascii")),
    // buf2bn(Buffer.from(`${prime21}${n}`, "ascii")),
    BigInt(`${prime21}${n}`),
    BigInt(`${n}${prime21}`)
    // produce a bunch of hmac signatures
    /*
    ...cartesianProduct(
      ...[
        ["sha256", "sha512"],
        ["Phemex", `${prime21}`, `${n}`],
        [n, prime21, `${n}`, `${prime21}`]
      ]
    ).map(([algo, key, input]) => {
      return hmac(algo, key, input);
    }),
    */
    // bytewise concat
    // buf2bn(Buffer.concat([bn2buf(prime21), bn2buf(n)])),
    // buf2bn(Buffer.concat([bn2buf(n), bn2buf(prime21)]))

    /*
    ...hashFns.map(hash => {
      return hash(prime21) ^ hash(n);
    })
    */
  ]
    .filter(num => num < MAX_BN)
    .map(num => verifyNum(num))
    .includes(true);
};

module.exports = {
  prime21,
  verifyNum,
  verify27Num,
  privkeyToCompressedPubkey,
  verifyBip32
};

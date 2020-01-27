const { bn2buf, buf2bn, prime21 } = require("./utils");
const secp256k1 = require("secp256k1");
const bip32 = require("bip32");
const wif = require("wif");

const privkeyToCompressedPubkey = privkeyN => {
  const privkeyBuf = bn2buf(privkeyN, 32);
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

const verifyBip32Seed = (
  bn,
  k = 0, // optional index
  expectedCompressedPubkey = phemexCompressedPubkey
) => {
  const masterNode = bip32.fromSeed(bn2buf(bn, 16));
  // that should more or less covers it
  const childNodes = [
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
  ].map(path => masterNode.derivePath(path));

  // try a few derived keys
  return [masterNode, ...childNodes]
    .map(node => {
      const privKey = buf2bn(node.privateKey);
      return verifyPrivKey(privKey, expectedCompressedPubkey);
    })
    .includes(true);
};

const verifyNum = (bn, expectedCompressedPubkey = phemexCompressedPubkey) => {
  return [
    // use as private key directly
    verifyPrivKey(bn, expectedCompressedPubkey),
    // use as seed for bip32
    verifyBip32Seed(bn, 0, expectedCompressedPubkey),
    verifyBip32Seed(bn, 21, expectedCompressedPubkey)
  ].includes(true);
};

const verify27Num = n => {
  verifyNum(n);
  verifyNum(prime21 * n);
  verifyNum(prime21 + n);
  verifyNum(BigInt(`${prime21}${n}`));
  verifyNum(BigInt(`${n}${prime21}`));
};

module.exports = {
  prime21,
  verifyNum,
  verify27Num,
  privkeyToCompressedPubkey,
  verifyBip32Seed
};

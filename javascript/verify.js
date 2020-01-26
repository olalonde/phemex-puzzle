const { bn2buf, buf2bn, prime21 } = require("./utils");
const secp256k1 = require("secp256k1");

const privkeyToCompressedPubkey = privkeyN => {
  const privkeyBuf = bn2buf(privkeyN, 32);
  const compressedPubKey = secp256k1.publicKeyCreate(privkeyBuf);
  return buf2bn(compressedPubKey);
};

// taken from https://www.blockchain.com/btc/tx/367c0e15b246dd48e5e6504beb50f4f184b48012c1ecd3cff5f576dd0463f703
// also see https://github.com/olalonde/phemex-puzzle/blob/master/notebooks/pubkey%20(found%20from%20spend%20transaction).ipynb
const phemexCompressedPubkey = 0x02b4a72e4aaa69ba04b80c6891df01f50d191a65eccc61e4e9862d1e421ce815b3n;
const verifyNum = (bn, expectedCompressedPubkey = phemexCompressedPubkey) => {
  const compressedPubKey = privkeyToCompressedPubkey(bn);
  const matches = compressedPubKey === expectedCompressedPubkey;
  if (matches) {
    console.log("priv key found!!! ", bn);
  }
  return matches;
};

const verify27Num = n => {
  verifyNum(n);
  verifyNum(prime21 * n);
  verifyNum(prime21 + n);
  verifyNum(BigInt(`${prime21}${n}`));
  verifyNum(BigInt(`${n}${prime21}`));
};

module.exports = { prime21, verifyNum, verify27Num, privkeyToCompressedPubkey };

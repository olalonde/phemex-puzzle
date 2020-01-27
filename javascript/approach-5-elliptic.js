const {
  ec: EC,
  curves: { PresetCurve }
} = require("elliptic");
const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { verify27Num } = require("./verify");

const XRP = b58decode("XRP");
const ETH = b58decode("ETH");
const BTC = b58decode("BTC");
const Phemex = b58decode("Phemex");

/*
{
  const origCurve = new PresetCurve({
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    // hash: hash.sha256,
    gRed: false,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"
    ]
  });

  const ec = new EC(origCurve);
  const privKey = ec.keyFromPrivate(
    "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    "hex"
  );

  // 025f81956d5826bad7d30daed2b5c8c98e72046c1ec8323da336445476183fb7ca
  console.log(privKey.getPublic(true, "hex"));
}


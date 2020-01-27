const EC = require("elliptic").ec;
const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { verify27Num } = require("./verify");

const XRP = b58decode("XRP");
const ETH = b58decode("ETH");
const BTC = b58decode("BTC");
const Phemex = b58decode("Phemex");

const ec = new EC("secp256k1");

//todo

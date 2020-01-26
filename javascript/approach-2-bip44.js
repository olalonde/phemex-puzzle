const { b58decode, countDigits, compose, bn2buf } = require("./utils");
const { prime21 } = require("./constants");
const { verifyNum } = require("./verify");

const words = ["XRP", "ETH", "BTC", "Phemex"];

// https://github.com/bitcoinjs/bip44-constants/blob/master/index.js
const XRP = 0x80000090n;
const ETH = 0x8000003cn;
const BTC = 0x80000000n;

console.log(countDigits(XRP)); // 10 digits
console.log(countDigits(XRP * ETH * BTC)); // 28 digits

// verifyNum(BigInt(`${prime21}${num}`));
// verifyNum(BigInt(`${num}${prime21}`));

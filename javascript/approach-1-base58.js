const { b58decode, countDigits, compose, bn2buf } = require("./utils");
const { prime21 } = require("./constants");
const { verifyNum } = require("./verify");

const concat = (acc, x) => `${acc}${x}`;
const words = ["XRP", "ETH", "BTC", "Phemex"];

// a)
let nums = words.map(b58decode);
// console.log(words.reduce(concat, ""));
let num = BigInt(words.map(b58decode).reduce(concat, ""));
console.log(countDigits(num));
// 27 digits
verifyNum(num);
verifyNum(prime21 * num);
verifyNum(BigInt(`${prime21}${num}`));
verifyNum(BigInt(`${num}${prime21}`));

// b)
num = b58decode("Phemex");
console.log(countDigits(num * num * num));
// 31 digits
//

// c)
const XRP = b58decode("XRP");
const ETH = b58decode("ETH");
const BTC = b58decode("BTC");
const Phemex = b58decode("Phemex");

// XRP^1 * ETH^2 * BTC^3
console.log(countDigits(XRP * ETH * ETH * BTC * BTC * BTC));
// 28 digits
// XRP^3 * ETH^2 * BTC^1
console.log(countDigits(XRP * XRP * XRP * ETH * ETH * BTC));
// 29 digits
// XRP^1 + ETH^2 + BTC^3
console.log(countDigits(XRP + ETH * ETH + BTC * BTC * BTC));
// 14 digits

console.log(countDigits(Phemex * Phemex));
// 21 digits
console.log(countDigits(Phemex * Phemex * Phemex));
// 31 digits

const { b58decode, countDigits, compose, bn2buf } = require("./utils");
const { prime21 } = require("./constants");
const { verifyNum } = require("./verify");

const concat = (acc, x) => `${acc}${x}`;
const words = ["XRP", "ETH", "BTC", "Phemex"];

let nums = words.map(b58decode);
console.log(words.reduce(concat, ""));
let num = BigInt(words.map(b58decode).reduce(concat, ""));
console.log(countDigits(num));
verifyNum(num);
verifyNum(prime21 * num);
verifyNum(BigInt(`${prime21}${num}`));
verifyNum(BigInt(`${num}${prime21}`));

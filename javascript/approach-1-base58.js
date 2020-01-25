const { b58decode, countDigits } = require("./utils");
const { prime21 } = require("./constants");
const { verifyNum } = require("./verify");

const words = ["XRP", "ETH", "BTC", "Phemex"];

const nums = words.map(b58decode);
const concat = (acc, x) => `${acc}${x}`;
console.log(words.reduce(concat, ""));
const num = BigInt(words.map(b58decode).reduce(concat, ""));
console.log(countDigits(num));
verifyNum(num);
verifyNum(prime21 * num);
verifyNum(BigInt(`${prime21}${num}`));
verifyNum(BigInt(`${num}${prime21}`));

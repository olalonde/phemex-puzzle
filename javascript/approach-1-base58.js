const { b58decode, countDigits } = require("./utils");
const { prime21 } = require("./constants");
const { verifyNum } = require("./verify");

const words = ["XRP", "ETH", "BTC", "Phemex"];

const nums = words.map(b58decode);
console.log(nums);
const concat = (acc, x) => `${acc}${x}`;
console.log(words.map(b58decode).reduce(concat, ""));
const num = BigInt(words.map(b58decode).reduce(concat, ""));
console.log(countDigits(num));
verifyNum(num);

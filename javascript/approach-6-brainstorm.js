const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { verify27Num } = require("./verify");
const { powerpermute, permutations } = require("./permutations");

const words = ["Ethereum", "Bitcoin", "Ripple", "Phemex"];

const toAscii = str => {
  return buf2bn(Buffer.from(str, "ascii"));
};

// sentence wise
const testWords = words => {
  const nums = words.map(toAscii);
  // console.log(words.map(b58decode));
  // const nums = [2482646n, 38437386n, 747753n, 743639n];
  permutations(nums).map(ns => {
    verify27Num(ns.reduce((acc, x) => acc * x, 1n));
    verify27Num(ns.reduce((acc, x) => acc + x, 0n));
    verify27Num(BigInt(ns.join("")));
  });
};

testWords(["ETH", "BTC", "XRP"]);
testWords(["ETH", "BTC", "XRP", "Phemex"]);
testWords(["Ethereum", "Bitcoin", "Ripple"]);
testWords(["Ethereum", "Bitcoin", "Ripple", "Phemex"]);

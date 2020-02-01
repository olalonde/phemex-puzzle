const basex = require("base-x");

const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { verify27Num } = require("./verify");
const { permutations } = require("./permutations");

const symbols = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

const baseWords = ["XRP", "ETH", "BTC", "Phemex"];

// all rotations of string
const rotations = str => {
  const result = [str];
  let chars = str.split("");
  for (let i = 0; i < str.length - 1; i++) {
    const c = chars.pop();
    chars = [c, ...chars];
    result.push([...chars].join(""));
  }
  return result;
};

// console.log(rotations(symbols));

{
  rotations(symbols).forEach(alphabet => {
    const b58decode = str => buf2bn(basex(alphabet).decode(str));
    permutations(baseWords).forEach(words => {
      verify27Num(b58decode(words.join("")));
      verify27Num(BigInt(words.map(b58decode).join("")));
    });
  });
}

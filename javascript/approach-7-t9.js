const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { t9 } = require("./encodings");
const { verify27Num } = require("./verify");
const { powerpermute } = require("./permutations");

const words = ["XRP", "ETH", "BTC", "Phemex"];

{
  powerpermute(words).forEach(ws => {
    const nums = ws.map(t9.decode).map(w => BigInt(w.join("")));
    let num = BigInt(nums.map(n => `${n}`).join(""));
    verify27Num(num);
    num = buf2bn(Buffer.concat(nums.map(bn2buf)));
    verify27Num(num);
    num = nums.reduce((acc, x) => acc + x, 0n);
    verify27Num(num);
    num = nums.reduce((acc, x) => acc * x, 1n);
    verify27Num(num);
  });
}

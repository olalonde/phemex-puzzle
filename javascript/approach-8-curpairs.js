const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { verify27Num } = require("./verify");
const { powerpermute, permutations } = require("./permutations");

const words = ["XRP", "BTC", "ETH", "BTC", "USD", "USD"];

/*
{
  permutations(words).map(words => {
    const num = b58decode(words.join(""));
    console.log(countDigits(num));
    verify27Num(num);
  });
}
*/

{
  permutations(words).map(words => {
    const nums = words.map(b58decode);
    const num = nums.reduce((acc, x) => acc * x, 1n);
    console.log(countDigits(num));
    // verify27Num(num);
  });
}

// sentence wise
/*
{
  console.log(countDigits(b58decode("XRPETHBTC")));
  // 16
  console.log(countDigits(b58decode(words.join(""))));
  // 27
  console.log(b58decode(words.join("")));
  // 148305363320012921807472785n
  powerpermute(words).forEach(words => {
    const n = b58decode(words.join(""));
    // if (countDigits(n) === 27) {
    verify27Num(n);
    // }
  });
}
*/

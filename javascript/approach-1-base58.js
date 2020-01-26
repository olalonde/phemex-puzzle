const { b58decode, countDigits, compose, bn2buf, prime21 } = require("./utils");
const { verify27Num } = require("./verify");
const permuations = require("./permutations");

const concat = (acc, x) => `${acc}${x}`;
const words = ["XRP", "ETH", "BTC", "Phemex"];

// sentence wise
{
  console.log(countDigits(b58decode("XRPETHBTC")));
  // 16
  console.log(countDigits(b58decode(words.join(""))));
  // 27
  console.log(b58decode(words.join("")));
  // 148305363320012921807472785n
  permuations(words).forEach(words => {
    verify27Num(b58decode(words.join("")));
  });
}

// word wise
{
  permuations(words).forEach(words => {
    const nums = words.map(b58decode);
    const num = BigInt(nums.map(n => `${n}`).join(""));
    // 27 digits
    verify27Num(num);
  });
}

// b)
{
  num = b58decode("Phemex");
  console.log(countDigits(num * num * num));
  // 31 digits
}

// c)
{
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
}

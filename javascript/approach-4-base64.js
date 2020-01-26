const { countDigits, compose, bn2buf, buf2bn } = require("./utils");
const { verify27Num } = require("./verify");
const permuations = require("./permutations");

const words = ["XRP", "ETH", "BTC", "Phemex"];

// a)
{
  const n = buf2bn(Buffer.from(words.join(""), "base64"));
  console.log(countDigits(n)); // 27 digits
  verify27Num(n);
}

// b)
{
  permuations(words).forEach(words => {
    const n = buf2bn(Buffer.from(words.join(""), "base64"));
    verify27Num(n);
    const n2 = words
      .map(w => buf2bn(Buffer.from(w, "base64")))
      .reduce((acc, x) => acc * x, 1n);
    // console.log(countDigits(n2));
    // 21 digits
    verify27Num(n2);
  });
}

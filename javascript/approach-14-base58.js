const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { verify27Num } = require("./verify");
const { powerpermute } = require("./permutations");

const words = ["XRP", "ETH", "BTC", "Phemex"];

// letter wise
{
  powerpermute(words).forEach(words => {
    const sentence = words.join("");
    const nums = sentence.split("").map(letter => {
      return b58decode(letter);
    });
    console.log(nums); // 30 digits
  });
}

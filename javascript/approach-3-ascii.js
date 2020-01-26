const { countDigits, buf2bn } = require("./utils");

const concat = (acc, x) => `${acc}${x}`;
const prod = (acc, x) => acc * x;
const sum = (acc, x) => acc + x;
const words = ["XRP", "ETH", "BTC", "Phemex"];

// whole sentence
{
  const n = buf2bn(Buffer.from(words.join(""), "utf8"));
  console.log(countDigits(n));
  // 36!
}

// word per word
{
  const nums = words.map(w => {
    return buf2bn(Buffer.from(w, "utf8"));
  });
  // nums.map(countDigits).forEach(n => console.log(n));
  // 7 7 7 14
  // console.log(countDigits(nums.reduce(prod, 1n)));
  // 35 digits
  // console.log(countDigits(nums.reduce(sum, 0n)));
  // 14 digits
}
{
  // decode letter by letter
  nums = words
    .map(w => {
      const buf = Buffer.from(w, "utf8");
      const result = [];
      buf.forEach(byte => result.push(byte));
      return result;
    })
    .flat();

  console.log(countDigits(nums.reduce(sum)));
  // 4

  console.log(countDigits(nums.reduce(prod)));
  // 21
  console.log(countDigits(nums.reduce(concat)));
  // 35

  // verifyNum(num); verifyNum(prime21 * num);
  // verifyNum(BigInt(`${prime21}${num}`));
  // verifyNum(BigInt(`${num}${prime21}`));
  //
}

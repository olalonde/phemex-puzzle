const { b58decode, countDigits, bn2buf, buf2bn, prime21 } = require("./utils");
const { verify27Num } = require("./verify");
const { permutations } = require("./permutations");

const words = ["XRP", "ETH", "BTC", "Phemex"];

// sentence wise
{
  console.log(words.map(b58decode).map(n => n % prime21));
  console.log(
    words
      .map(b58decode)
      .map(n => n % prime21)
      .join("").length
  );
  console.log(
    countDigits(
      words
        .map(b58decode)
        .map(n => n % prime21)
        .reduce((acc, x) => acc * x, 1n)
    )
  );

  permutations(words).forEach(ws => {
    const n = BigInt(
      ws
        .map(b58decode)
        .map(n => n % prime21)
        .join("")
    );
    // console.log(n);
    verify27Num(n);
  });

  // 25 digit nums...
  /*
  permutations(words).forEach(ws => {
    const n = ws
      .map(b58decode)
      .map(n => n % prime21)
      .reduce((acc, n) => acc * n, 1n);
    console.log(countDigits(n));
  });
  */
}

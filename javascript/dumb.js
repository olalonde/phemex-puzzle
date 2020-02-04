const { verify27Num, prime21 } = require("./verify");

// all 6 digit numbers
for (let i = 100000; i < 999999; i++) {
  verify27Num(BigInt(`${prime21}${i}`));
  verify27Num(BigInt(`${i}${prime21}`));
}

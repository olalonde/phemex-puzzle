const {
  b58decode,
  countDigits,
  bn2buf,
  buf2bn,
  prime21,
  b58encode
} = require("./utils");
const { verify27Num } = require("./verify");
const { permutations, cartesianProduct } = require("./permutations");

const XRP = [1, 1, 2013];
const ETH = [7, 30, 2015];
const BTC = [1, 9, 2009];
const Phemex = [11, 25, 2019];

// dates possibly associated with string [day, month, year]
const possibleDates = cartesianProduct(
  ...[
    // XRP
    [
      [1, 1, 2013],
      [1, 2, 2013]
    ],
    // ETH
    [[7, 30, 2015]],
    // BTC
    [[1, 9, 2009]],
    // Phemex
    [[11, 25, 2019]]
  ]
);

console.log(possibleDates);

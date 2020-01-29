const {
  b58decode,
  countDigits,
  bn2buf,
  buf2bn,
  prime21,
  b58encode
} = require("./utils");
const { verify27Num } = require("./verify");
const { permutations } = require("./permutations");

// creation date [date, month, yeat]
// release date
const XRP = [11, 2013];
// 	30 July 2015
const ETH = [7, 30, 2015];
const BTC = [1, 9, 2009];
const Phemex = [11, 25, 2019];

// TODO: ledger start date
//
//
const words = [XRP, ETH, BTC, Phemex];

const concated = words.flat().join("");

console.log(countDigits(concated));

const test = words => {
  permutations(words).forEach(ws => {
    n = BigInt(ws.flat().join(""));
    console.log(n);
    verify27Num(n);
  });
};

// test([XRP, ETH, BTC, Phemex])
// d-m-y
test([
  [1, 1, 2013],
  [30, 7, 2015],
  [9, 1, 2009],
  [25, 11, 2019]
]);

// y-m-d
test([
  [2013, 1, 1],
  [2015, 7, 30],
  [2009, 1, 9],
  [2019, 11, 25]
]);

// m-d-y
test([
  [1, 1, 2013],
  [7, 30, 2015],
  [1, 9, 2009],
  [11, 25, 2019]
]);

// y-d-m
test([
  [2013, 1, 1],
  [2015, 30, 7],
  [2009, 9, 1],
  [2019, 25, 11]
]);

// block creation date
// d-m-y
test([
  [1, 1, 2013],
  [30, 7, 2015],
  [3, 1, 2009],
  [25, 11, 2019]
]);

// y-m-d
test([
  [2013, 1, 1],
  [2015, 7, 30],
  [2009, 1, 3],
  [2019, 11, 25]
]);

// m-d-y
test([
  [1, 1, 2013],
  [7, 30, 2015],
  [1, 3, 2009],
  [11, 25, 2019]
]);

// y-d-m
test([
  [2013, 1, 1],
  [2015, 30, 7],
  [2009, 3, 1],
  [2019, 25, 11]
]);

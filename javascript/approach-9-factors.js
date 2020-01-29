const {
  b58decode,
  countDigits,
  bn2buf,
  buf2bn,
  prime21,
  b58encode
} = require("./utils");
const { verify27Num } = require("./verify");
const { powerpermute } = require("./permutations");

const XRP = b58decode("XRP");
// 102334
// Prime factorisation: 2×19×2693
const ETH = b58decode("ETH");
// 45256
// Factorisation: 8×5657
const BTC = b58decode("BTC");
// 35159
// Is prime number
const Phemex = b58decode("Phemex");
// 14899878097
// Prime factorisation: 13*1146144469

console.log("XRP", XRP);
console.log("ETH", ETH);
console.log("BTC", BTC);

// console.log("Phemex", Phemex);
//

const d = [
  // prime factors of b58decode('XRP')
  2,
  19,
  2693,
  // prime factors of b58decode('ETH')
  8,
  5657,
  // prime factors of b58decode('BTC')
  35159,
  // prime fracotrs of b58decode('Phemex')
  13,
  1146144469
];

// oops there was msitake

// 37
console.log(d.join("").length);
console.log(countDigits(d.reduce((acc, n) => acc * n, 1)));
console.log(countDigits(BTC * ETH * XRP));

console.log(b58encode(prime21));

console.log(countDigits(b58decode("fKadCnaZKb7U" + "BTCETHXRP")));

verify27Num(553744374221261132422162613n);


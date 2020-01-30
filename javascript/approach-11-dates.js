const {
  b58decode,
  countDigits,
  bn2buf,
  buf2bn,
  prime21,
  b58encode,
  dateRange
} = require("./utils");
const { verify27Num } = require("./verify");
const { permutations, cartesianProduct } = require("./permutations");
const cliProgress = require("cli-progress");

// dates possibly associated with string [day, month, year]
const dateCombos = cartesianProduct(
  ...[
    // XRP
    // some time in 2013
    dateRange([1, 1, 2012], [3, 1, 2013]),
    // ETH
    [
      // genesis block
      [30, 7, 2015]
    ],
    // BTC
    [
      [9, 1, 2009] /* release date from wikipedia */,
      [3, 1, 2009] /* genesis block */
    ],
    // Phemex
    // some time in 2019
    dateRange([1, 1, 2019], [1, 1, 2020])
  ]
);

// 4 possible date formattings: d/m/y , m/d/y, y/d/m, y/m/d
const formats = [
  [0, 1, 2],
  [1, 0, 2],
  [1, 2, 0],
  [2, 1, 0]
];

const transformDate = ([d, m, y], [datePos, monthPos, yearPos]) => {
  const res = new Array(3);
  res[datePos] = d;
  res[monthPos] = m;
  res[yearPos] = y;
  return res;
};

const total = dateCombos.length * formats.length;
console.log(`date combos: ${total}`);
let i = 0;
const progress = new cliProgress.SingleBar({});
progress.start(total, 0);

formats.forEach(format => {
  dateCombos
    .map(combo => combo.map(date => transformDate(date, format)))
    .forEach(combo => {
      const str = combo.map(date => date.join("")).join("");
      const n = BigInt(str);
      if (countDigits(n) === 27) {
        verify27Num(n);
      }
      i++;
      progress.update(i);
    });
});

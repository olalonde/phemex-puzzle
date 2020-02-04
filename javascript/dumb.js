const { verify27Num, prime21 } = require("./verify");
const cliProgress = require("cli-progress");

// all 6 digit numbers
const start = 100000;
const end = 999999;
const total = end - start;

const progress = new cliProgress.SingleBar({});
progress.start(total, 0);

for (let i = start; i < end; i++) {
  progress.update(i - start);
  verify27Num(BigInt(`${prime21}${i}`));
  verify27Num(BigInt(`${i}${prime21}`));
}

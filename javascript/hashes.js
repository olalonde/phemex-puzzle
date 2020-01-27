const crypto = require("crypto");
const { compose, buf2bn, bn2buf } = require("./utils");

const createHashFn = algo => _input => {
  let input = _input;
  if (typeof input === "bigint") {
    input = bn2buf(input);
  }
  const hash = crypto.createHash(algo);
  hash.update(input);
  const buf = hash.digest();
  return buf2bn(buf);
};

const sha256 = createHashFn("sha256");
const doubleSha256 = compose(sha256, sha256);
const ripemd160 = createHashFn("ripemd160");
const sha256ripemd160 = compose(ripemd160, sha256);
const doubleSha256Ripemd160 = compose(ripemd160, doubleSha256);
const ripemd160Sha256 = compose(sha256, ripemd160);
const ripemd160DoubleSha256 = compose(doubleSha256, ripemd160);

const all = [
  sha256,
  doubleSha256,
  sha256ripemd160,
  doubleSha256Ripemd160,
  ripemd160Sha256,
  ripemd160DoubleSha256
];

module.exports = {
  all,
  sha256,
  doubleSha256,
  sha256ripemd160,
  doubleSha256Ripemd160,
  ripemd160Sha256,
  ripemd160DoubleSha256
};

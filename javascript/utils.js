const base58 = require("bs58");

const prime21 = 957496696762772407663n;

const bn2buf = (n, minBytes = 0) => {
  let hex = n.toString(16);
  // if odd number of hex chars, node will silently ignore the last one!
  if (hex.length % 2 !== 0) hex = `0${hex}`;
  buf = Buffer.from(hex, "hex");
  if (buf.length >= minBytes) return buf;
  const delta = minBytes - buf.length;
  return Buffer.concat([Buffer.from("00".repeat(delta), "hex"), buf]);
};

const buf2bn = buf => {
  var hex = [];
  u8 = Uint8Array.from(buf);
  u8.forEach(i => {
    let h = i.toString(16);
    if (h.length % 2) {
      h = "0" + h;
    }
    hex.push(h);
  });

  return BigInt("0x" + hex.join(""));
};

const b58decode = str => {
  const buf = base58.decode(str);
  return buf2bn(buf);
};

const b58encode = n => {
  const buf = bn2buf(n);
  return base58.encode(buf);
};

const countDigits = bn => {
  return bn.toString().length;
};

const compose = (...functions) => args =>
  functions.reduceRight((arg, fn) => fn(arg), args);

const toDateObject = ([d, m, y]) => new Date(`${y}-${m}-${d}`);

// [start, end[
const dateRange = (start, end) => {
  const startDate = toDateObject(start);
  const endDate = toDateObject(end);

  const res = [];
  let d = startDate;
  while (d < endDate) {
    res.push(d);
    const tomorrow = new Date(d.getTime());
    tomorrow.setDate(d.getDate() + 1);
    d = tomorrow;
  }
  return res.map(d => [d.getDate(), d.getMonth() + 1, d.getFullYear()]);
};

// [start, end[
const range = (start, end) => {
  return [...Array(end - start).keys()].map(d => d + start);
};

module.exports = {
  bn2buf,
  buf2bn,
  b58decode,
  countDigits,
  compose,
  prime21,
  b58encode,
  dateRange,
  range
};

const { bn2buf, buf2bn } = require("./utils");

test("bn2buf 0xdeadbeef", () => {
  buf = bn2buf(0xdeadbeefn);
  expect(buf.toString("hex")).toEqual("deadbeef");
  expect(buf2bn(buf)).toEqual(0xdeadbeefn);
});

test("bn2buf 0x000102030405060708090a0b0c0d0e0f", () => {
  buf = bn2buf(0x000102030405060708090a0b0c0d0e0fn);
  expect(buf.toString("hex")).toEqual("0102030405060708090a0b0c0d0e0f");
});

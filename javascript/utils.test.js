const { bn2buf, buf2bn } = require("./utils");

test("bigIntToBuf", () => {
  buf = bn2buf(0xdeadbeefn);
  expect(buf.toString("hex")).toEqual("deadbeef");
  expect(buf2bn(buf)).toEqual(0xdeadbeefn);
});

const { sha256, doubleSha256, all } = require("./hashes");

test("sha256 string", () => {
  const bn = sha256("test");
  expect(bn).toEqual(
    0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08n
  );
});

test("doubleSha256", () => {
  const bn = doubleSha256("test");
  expect(bn).toEqual(sha256(sha256("test")));
});

test("all hashes", () => {
  all.forEach(hashFn => {
    hashFn("test");
  });
});

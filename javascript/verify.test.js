const { verifyNum, privkeyToCompressedPubkey } = require("./verify");

test("privkeyToCompressedPubkey", () => {
  privkey = 0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08n;
  expected_pubkey = 0x025f81956d5826bad7d30daed2b5c8c98e72046c1ec8323da336445476183fb7can;
  x = privkeyToCompressedPubkey(privkey);
  expect(x).toEqual(expected_pubkey);
});

test("verifyNum works", () => {
  const matches = verifyNum(
    0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08n,
    0x025f81956d5826bad7d30daed2b5c8c98e72046c1ec8323da336445476183fb7can
  );
  expect(matches).toEqual(true);
});

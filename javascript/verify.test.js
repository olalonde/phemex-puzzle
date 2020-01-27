const {
  verifyNum,
  privkeyToCompressedPubkey,
  verifyBip32Seed
} = require("./verify");

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

test("verify bip32 seed", () => {
  // taken from https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors
  const matches = verifyBip32Seed(
    0x000102030405060708090a0b0c0d0e0fn,
    0,
    0x0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2n
  );
  expect(matches).toEqual(true);
});

test("verify bip32 seed (match with child pubkey)", () => {
  // taken from https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors
  const matches = verifyBip32Seed(
    0x000102030405060708090a0b0c0d0e0fn,
    0,
    // chain m/0'/1
    0x03501e454bf00751f24b1b489aa925215d66af2234e3891c3b21a52bedb3cd711cn
  );
  expect(matches).toEqual(true);
});

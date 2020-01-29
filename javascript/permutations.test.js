const {
  cartesianProduct,
  permutations,
  powerpermute,
  combine
} = require("./permutations");

test("permuations", () => {
  expect(permutations(["a", "b", "c"])).toEqual([
    ["a", "b", "c"],
    ["a", "c", "b"],
    ["b", "a", "c"],
    ["b", "c", "a"],
    ["c", "a", "b"],
    ["c", "b", "a"]
  ]);
});

test("cartesianProduct", () => {
  console.log(
    cartesianProduct([
      ["sha256", "sha512"],
      ["prime21", "n"]
    ])
  );
  expect(
    cartesianProduct([
      ["sha256", "sha512"],
      ["prime21", "n"]
    ])
  ).toEqual([
    ["sha256", "prime21"],
    ["sha256", "n"],
    ["sha512", "prime21"],
    ["sha512", "n"]
  ]);
});

test("powerpermute", () => {
  expect(powerpermute(["a", "b"])).toEqual([
    ["a"],
    ["b"],
    ["a", "b"],
    ["b", "a"]
  ]);
});

test("combine", () => {
  expect(combine(["BTC", "ETH", "XRP"], 2)).toEqual();
});

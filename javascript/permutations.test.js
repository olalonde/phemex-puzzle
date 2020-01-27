const { permutations, powerpermute } = require("./permutations");

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

test("powerpermute", () => {
  expect(powerpermute(["a", "b"])).toEqual([
    ["a"],
    ["b"],
    ["a", "b"],
    ["b", "a"]
  ]);
});

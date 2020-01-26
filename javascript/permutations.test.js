const permutations = require("./permutations");

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

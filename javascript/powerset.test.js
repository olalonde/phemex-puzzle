const powerset = require("./powerset");

test("powerset", () => {
  expect(powerset(["a", "b", "c"])).toEqual([
    [],
    ["a"],
    ["b"],
    ["a", "b"],
    ["c"],
    ["a", "c"],
    ["b", "c"],
    ["a", "b", "c"]
  ]);
});

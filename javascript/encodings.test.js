const { t9 } = require("./encodings");

test("t9 (keypad)", () => {
  expect(t9.decode("tesT")).toEqual([8, 3, 7, 8]);
});

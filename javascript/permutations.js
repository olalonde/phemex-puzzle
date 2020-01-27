const powerset = require("./powerset");

// https://stackoverflow.com/a/20871714/96855
const permutations = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const powerpermute = arr =>
  powerset(arr)
    .map(permutations)
    .flat()
    .filter(arr => arr.length);

module.exports = { permutations, powerpermute };

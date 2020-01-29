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

const cartesianProduct = arr => {
  return arr.reduce(
    (a, b) => {
      return a
        .map(x => {
          return b.map(y => {
            return x.concat(y);
          });
        })
        .reduce((a, b) => {
          return a.concat(b);
        }, []);
    },
    [[]]
  );
};

// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/combinations/combineWithoutRepetitions.js
/**
 * @param {*[]} comboOptions
 * @param {number} comboLength
 * @return {*[]}
 */
const combineWithoutRepetitions = (comboOptions, comboLength) => {
  // If the length of the combination is 1 then each element of the original array
  // is a combination itself.
  if (comboLength === 1) {
    return comboOptions.map(comboOption => [comboOption]);
  }

  // Init combinations array.
  const combos = [];

  // Extract characters one by one and concatenate them to combinations of smaller lengths.
  // We need to extract them because we don't want to have repetitions after concatenation.
  comboOptions.forEach((currentOption, optionIndex) => {
    // Generate combinations of smaller size.
    const smallerCombos = combineWithoutRepetitions(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1
    );

    // Concatenate currentOption with all combinations of smaller size.
    smallerCombos.forEach(smallerCombo => {
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
};

module.exports = {
  permutations,
  cartesianProduct,
  powerpermute,
  combine: combineWithoutRepetitions
};

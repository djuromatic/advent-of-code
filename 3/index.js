const { input } = require("../input");

//Generate alphabet with lowercase and uppercase
const alphabet = [
  ...[...Array(26)].map((_, i) => String.fromCharCode(i + 97)),
  ...[...Array(26)].map((_, i) => String.fromCharCode(i + 65)),
];

// check score for one latter
const latter = process.argv[2];

//character is scored based of index in array
const getScore = (element) => {
  return alphabet.indexOf(element) + 1;
};

const compareInputs = (input) => {
  let score = 0;

  let i = 0;
  return {
    next: () => {
      if (i >= input.length) return false;
      const row = input[i];

      const half = Math.floor(row.length / 2);

      const first = row.substr(0, half);
      const second = row.substr(half);

      console.log(first, second);

      for (const char of first) {
        if (second.indexOf(char) >= 0) {
          console.log("got it ", char);
          score += getScore(char);
          break;
        }
      }

      i++;
      return true;
    },
    next2: () => {
      if (i >= input.length) return false;
      const getGroup = input.slice(i, i + 3);
      i += 3;

      for (const char of getGroup[0]) {
        console.log(
          getGroup[1].indexOf(char) > 0 && getGroup[2].indexOf(char) > 0
        );
        if (getGroup[1].indexOf(char) >= 0 && getGroup[2].indexOf(char) >= 0) {
          score += getScore(char);
          break;
        }
      }
      console.log(getGroup);
      return true;
    },
    getScore: () => {
      return score;
    },
  };
};

const main = async () => {
  const getInput = await input(3);

  const data = getInput.data.trim().split("\n");

  const init = compareInputs(data);

  while (init.next2()) {}
  console.log(init.getScore());
};

if (latter) {
  console.log(getScore(latter));
} else main();

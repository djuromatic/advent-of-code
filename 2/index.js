/* 

first column
A = ROCK
B = Paper
C = Scissors

second column - response one
X = ROCK
Y = Paper
Z = Scissors

Score

    shape you selected
    1. ROCK
    2. Paper
    3. Scissors
    
    outcome of the round
    0. if lost
    3. draw
    6. won



    A | A || A | B || A | C

*/

const { input } = require("../input");
const fs = require("fs");
const cases = {
  ax: "draw",
  ay: "win",
  az: "lose",
  bx: "lose",
  by: "draw",
  bz: "win",
  cx: "win",
  cy: "lose",
  cz: "draw",
};

const selectedShapeScore = (s) => {
  switch (s) {
    case "x":
      return 1; // ROCK
    case "y":
      return 2; // PAPER
    case "z":
      return 3; // SCISSORS
  }
};

const gameScore = (result) => {
  switch (result) {
    case "win":
      return 6;
    case "lose":
      return 0;
    case "draw":
      return 3;
  }
};

const playGame = (a, b, c = false) => {
  const shapeScore = selectedShapeScore(b.toLowerCase());
  const result = cases[(a + b).toLowerCase()];

  if (c) console.log(`sequence ${result}`);
  const gamePoints = gameScore(result);
  return shapeScore + gamePoints;
};

const getWhatResultNeedsToBe = (result) => {
  switch (result) {
    case "X":
      return "lose";
    case "Z":
      return "win";
    case "Y":
      return "draw";
  }
};

// returns b for given result
const sequenceGame = (a, result) => {
  let newB = "";
  "XYZ".split("").forEach((item) => {
    const caseNext = (a + item).toLowerCase();
    if (cases[caseNext] === result) {
      newB = item;
    }
  });
  return newB;
};

const playSequenceGame = (input) => {
  let score = 0;
  let log = [];

  let i = 0;
  return {
    next: () => {
      const a = input[i][0];
      const b = input[i][1];
      const result = getWhatResultNeedsToBe(b);

      const newB = sequenceGame(a, result);

      score += playGame(a, newB);

      log.push(
        ` select to: ${result} actuly did: ${
          cases[(a + newB).toLowerCase()]
        } would be ${
          cases[(a + b).toLowerCase()]
        } info: ${a} - ${b} info: ${a} - ${newB}
          number: ${i}
        `
      );
      i++;
      if (i >= input.length) {
        return false;
      }
      //has next
      return true;
    },

    getScore: () => {
      return score;
    },
    getLog: () => {
      return log;
    },
  };
};

const main = async () => {
  const getInput = await input(2);

  // need to trim geting empty item on last position with split
  const formatOuterArray = getInput.data.trim().split("\n");

  const formatInnerArray = formatOuterArray.map((item) => {
    return item.split(" ");
  });
  let score = 0;
  formatInnerArray.forEach((item) => {
    score += playGame(item[0], item[1]);
  });

  const sequenceGame = playSequenceGame(formatInnerArray);

  do {
    const hasNext = sequenceGame.next();
    if (hasNext === false) break;
  } while (sequenceGame.next());

  console.log("Phase 1 Score", score);
  console.log("Phase 2 Score", sequenceGame.getScore());
};

main();

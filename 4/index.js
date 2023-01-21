const { input } = require("../input");

// first half of puzzle
const checkFullOverlap = (pair) => {
  if (
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1])
  )
    return true;

  return false;
};

const checkForAnyOverLap = (pair) => {
  if (
    (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][0]) ||
    (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
    (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1])
  )
    return true;

  return false;
};

const main = async () => {
  const adventInput = await input(4);
  const formatInput = adventInput.data.trim().split("\n");

  const pairs = formatInput.map((io) =>
    io
      .split(",")
      .map((pair) => [...pair.split("-")].map((pair) => parseInt(pair)))
  );

  console.log("total pairs:", pairs.length);
  // first half of puzzle
  const fullRangeOverlap = pairs.filter((pair) => checkFullOverlap(pair));
  console.log("within a range: ", fullRangeOverlap.length);

  const anyRangeOverlap = pairs.filter((pair) => checkForAnyOverLap(pair));
  console.log("any overlap in:", anyRangeOverlap.length);
  // second half of puzzle
};

main();

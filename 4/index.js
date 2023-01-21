const { input } = require("../input");

const checkPair = (pair) => {
  if (
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1])
  ) {
    console.log(`true ${pair[0]} - ${pair[1]}`);
    return true;
  } else {
    // console.log(`false ${pair[0]} - ${pair[1]}`);
    return false;
  }
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

  const sameRange = pairs.filter((pair) => checkPair(pair));
  console.log("within a range: ", sameRange.length);
};

main();

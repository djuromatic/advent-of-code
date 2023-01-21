const { input } = require("../input");

const main = async () => {
  const response = await input(1);
  const data = response.data.split("\n");

  firstPart(data);
};

const firstPart = (data) => {
  console.log(data);

  let i = 0;

  const result = data
    .reduce((acc, curr) => {
      if (curr === "") {
        i++;
        return acc;
      }

      const number = parseInt(curr);

      acc[i] = acc[i] ? acc[i] + number : number;

      return acc;
    }, [])
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr);

  console.log(result);
};

main();

const input = await Deno.readTextFile("./input.txt");

const numbersWord = new RegExp(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].join(
    "|",
  ),
);

const numbersWordReverse = new RegExp(
  ["eno", "owt", "eerht", "ruof", "evif", "xis", "neves", "thgie", "enin"].join(
    "|",
  ),
);

const map = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const mapReverse = {
  eno: "1",
  owt: "2",
  eerht: "3",
  ruof: "4",
  evif: "5",
  xis: "6",
  neves: "7",
  thgie: "8",
  enin: "9",
};

const lines = input.split("\n");
const calibrationValues = lines.map((line) => {
  const firstNumberIndex = line
    .split("")
    .findIndex((char) => !isNaN(parseInt(char)));
  const lastNumberIndex = line
    .split("")
    .reverse()
    .findIndex((char) => !isNaN(parseInt(char)));

  const firstWordNumber = line.match(numbersWord);
  const lastWordNumber = line
    .split("")
    .reverse()
    .join("")
    .match(numbersWordReverse);

  const firstNumber =
    firstNumberIndex != -1
      ? firstWordNumber != undefined
        ? firstNumberIndex < firstWordNumber?.index
          ? line[firstNumberIndex]
          : map[firstWordNumber[0]]
        : line[firstNumberIndex]
      : map[firstWordNumber];

  const lastNumber =
    lastNumberIndex != -1
      ? lastWordNumber != undefined
        ? lastNumberIndex < lastWordNumber?.index
          ? line.split("").reverse()[lastNumberIndex]
          : mapReverse[lastWordNumber[0]]
        : line.split("").reverse()[lastNumberIndex]
      : mapReverse[lastWordNumber];

  return parseInt(firstNumber + lastNumber);
});

const sum = calibrationValues.reduce((acc, curr) => acc + curr, 0);
console.log(`sum of calibration values: ${sum}`);

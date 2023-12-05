const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
const matrix = lines.map((line) => line);

const numberRegex = new RegExp(/\d+/g);

const allNumbers: RegExpMatchArray[][] = [];

matrix.forEach((line) => {
  allNumbers.push([...line.matchAll(numberRegex)]);
});

const numbers: number[] = [];

matrix.forEach((line, row) => {
  line.split("").forEach((char, i) => {
    if (char === "*") {
      const possibleNumbersToMultiply: number[] = [];

      // check up
      allNumbers[row - 1].forEach((numberMatch) => {
        const indexesNumber = Array.from(
          { length: numberMatch[0].length },
          (_, i) => numberMatch.index + i,
        );

        if (
          indexesNumber.includes(i - 1) ||
          indexesNumber.includes(i) ||
          indexesNumber.includes(i + 1)
        ) {
          possibleNumbersToMultiply.push(numberMatch[0]);
        }
      });

      // check sides
      allNumbers[row].forEach((numberMatch) => {
        const indexesNumber = Array.from(
          { length: numberMatch[0].length },
          (_, i) => numberMatch.index + i,
        );

        if (indexesNumber.includes(i - 1) || indexesNumber.includes(i + 1)) {
          possibleNumbersToMultiply.push(numberMatch[0]);
        }
      });

      // check down
      allNumbers[row + 1].forEach((numberMatch) => {
        const indexesNumber = Array.from(
          { length: numberMatch[0].length },
          (_, i) => numberMatch.index + i,
        );

        if (
          indexesNumber.includes(i - 1) ||
          indexesNumber.includes(i) ||
          indexesNumber.includes(i + 1)
        ) {
          possibleNumbersToMultiply.push(numberMatch[0]);
        }
      });

      if (possibleNumbersToMultiply.length === 2) {
        const result =
          parseInt(possibleNumbersToMultiply[0]) *
          parseInt(possibleNumbersToMultiply[1]);

        numbers.push(result);
      }
    }
  });
});

const sum = numbers.reduce((acc, curr) => acc + parseInt(curr), 0);

console.log(sum);

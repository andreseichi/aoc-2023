const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
const matrix = lines.map((line) => line);

const numberRegex = new RegExp(/\d+/g);

const allNumbers: RegExpMatchArray[][] = [];

matrix.forEach((line) => {
  allNumbers.push([...line.matchAll(numberRegex)]);
});

const numbers = [];

allNumbers.forEach((numberMatchRow, row) => {
  numberMatchRow.forEach((numberMatch) => {
    const indexesNumber = Array.from(
      { length: numberMatch[0].length },
      (_, i) => numberMatch.index + i,
    );

    if (indexesNumber[0] !== 0) indexesNumber.unshift(indexesNumber[0] - 1);
    if (indexesNumber[indexesNumber.length - 1] !== matrix[row].length - 1)
      indexesNumber.push(indexesNumber[indexesNumber.length - 1] + 1);

    // left right
    if (
      (isNaN(
        parseInt(matrix[row][numberMatch[0].length + numberMatch.index]),
      ) &&
        matrix[row][numberMatch[0].length + numberMatch.index] !== undefined &&
        matrix[row][numberMatch[0].length + numberMatch.index] !== ".") ||
      (isNaN(parseInt(matrix[row][numberMatch.index - 1])) &&
        matrix[row][numberMatch.index - 1] !== undefined &&
        matrix[row][numberMatch.index - 1] !== ".")
    ) {
      numbers.push(numberMatch[0]);
      return;
    }

    // down
    if (row < matrix.length - 1) {
      matrix[row + 1].split("").forEach((char, i) => {
        if (
          isNaN(parseInt(matrix[row + 1][i])) &&
          char !== "." &&
          indexesNumber.includes(i)
        ) {
          numbers.push(numberMatch[0]);
        }
      });
    }

    // up
    if (row === 0) return;
    matrix[row - 1].split("").forEach((char, i) => {
      if (
        isNaN(parseInt(matrix[row - 1][i])) &&
        char !== "." &&
        indexesNumber.includes(i)
      ) {
        numbers.push(numberMatch[0]);
      }
    });
  });
});

const sum = numbers.reduce((acc, curr) => acc + parseInt(curr), 0);

console.log(sum);

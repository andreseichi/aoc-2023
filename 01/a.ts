const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
const calibrationValues = lines.map((line) => {
  const numbers: string[] = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!isNaN(parseInt(char))) {
      numbers.push(char);
    }
  }

  return parseInt(numbers[0] + numbers[numbers.length - 1]);
});

const sum = calibrationValues.reduce((acc, curr) => acc + curr, 0);
console.log(`sum of calibration values: ${sum}`);

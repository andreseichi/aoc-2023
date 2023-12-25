const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const [times, distances] = lines.map((line) =>
  line
    .split(": ")
    .filter((_, i) => i === 1)
    .map((x) => x.split(" ").filter((y) => y !== ""))
    .flat()
    .map(Number),
);

const amountToBeat = [];

for (let i = 0; i < times.length; i++) {
  const timeRace = times[i];
  const distanceRecord = distances[i];

  let waysToBeat = 0;

  for (let j = 1; j < timeRace; j++) {
    const timeLeft = timeRace - j;
    const distance = timeLeft * j;

    const doesBeatRecord = distance > distanceRecord;

    doesBeatRecord && waysToBeat++;
  }
  amountToBeat.push(waysToBeat);
}

const result = amountToBeat.reduce((acc, curr) => acc * curr, 1);

console.log(result);

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const settings = lines.map((line) =>
  line
    .split(": ")
    .filter((_, i) => i === 1)
    .map((x) => x.split(" ").filter((y) => y !== ""))
    .flat()
    .join(""),
);

const timeRace = Number(settings[0]);
const distanceRecord = Number(settings[1]);

let lowestTimeToBeat = -1;
let highestTimeToBeat = -1;

for (let i = 0; i <= timeRace; i++) {
  const timeLeft = timeRace - i;
  const distance = timeLeft * i;

  const doesBeatRecord = distance > distanceRecord;

  if (doesBeatRecord) {
    lowestTimeToBeat = i;
    break;
  }
}

for (let i = timeRace; i >= 0; i--) {
  const timeLeft = timeRace - i;
  const distance = timeLeft * i;

  const doesBeatRecord = distance > distanceRecord;

  if (doesBeatRecord) {
    highestTimeToBeat = i;
    break;
  }
}

const result = highestTimeToBeat - lowestTimeToBeat + 1;

console.log(result);

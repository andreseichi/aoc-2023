const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n").filter((line) => line.length > 0);

const command = lines.shift() as string;
const map = lines;

let whereIAmNow = "AAA";

const maps = map.map((line) => {
  const [left, right] = line.split(" = ");

  const paths = right.slice(1, -1).split(", ");

  return [left, paths];
});

let steps = 0;

const go = (network, command) => {
  let newDestination = "";

  if (command === "L") {
    newDestination = network[1][0];
  } else {
    newDestination = network[1][1];
  }
  steps++;

  whereIAmNow = newDestination;
};

while (whereIAmNow !== "ZZZ") {
  for (let i = 0; i < command?.length; i++) {
    const actualMap = maps.find((map) => map[0] === whereIAmNow);

    go(actualMap, command[i]);

    if (whereIAmNow === "ZZZ") {
      break;
    }
  }
}

console.log(steps);

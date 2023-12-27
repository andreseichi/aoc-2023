const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n").filter((line) => line.length > 0);

const command = lines.shift() as string;
const map = lines;

const nodes = {};
for (let i = 0; i < map.length; i++) {
  const line = map[i];
  nodes[line.substring(0, 3)] = {
    L: line.substring(7, 10),
    R: line.substring(12, 15),
  };
}

const starts = [];
for (const key in nodes) {
  if (Object.prototype.hasOwnProperty.call(nodes, key) && key[2] === "A") {
    starts.push(key);
  }
}

const lengths = starts.map((start) => {
  let steps = 0;
  let curr = start;

  for (let i = 0; curr[2] !== "Z"; i = (i + 1) % command.length) {
    steps++;
    curr = nodes[curr][command[i]];
  }
  return steps;
});

const gcd = (a: number, b: number) => {
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const result = lengths.reduce((n, x) => lcm(x, n), 1);
console.log(result);

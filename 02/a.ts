const input = await Deno.readTextFile("./input.txt");

const originalBag = {
  red: 12,
  green: 13,
  blue: 14,
} as { [key: string]: number };

const lines = input.split("\n");
const games = lines.map((line) => line.split(": ")[1].split("; "));

console.log({ games });

const possibleGames: boolean[] = [];

games.forEach((game) => {
  let i = true;
  game.forEach((set) => {
    set.split(", ").forEach((color) => {
      const amount = color.split(" ");
      const colorAmount = parseInt(amount[0]);
      const colorName = amount[1];

      if (colorAmount > originalBag[colorName]) {
        i = false;
        return false;
      }
    });
  });
  possibleGames.push(i);
});

const sum = possibleGames.reduce((acc, curr, index) => {
  if (curr) {
    return acc + index + 1;
  }
  return acc;
}, 0);

console.log(`sum of possible games IDs: ${sum}`);

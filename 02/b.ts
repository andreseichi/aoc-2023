const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
const games = lines.map((line) => line.split(": ")[1].split("; "));

console.log({ games });

const powerGames: number[] = [];

games.forEach((game) => {
  const fewestCubes = {
    red: 0,
    green: 0,
    blue: 0,
  } as { [key: string]: number };

  game.forEach((set) => {
    set.split(", ").forEach((color) => {
      const amount = color.split(" ");
      const colorAmount = parseInt(amount[0]);
      const colorName = amount[1];

      if (colorAmount > fewestCubes[colorName]) {
        fewestCubes[colorName] = colorAmount;
        return false;
      }
    });
  });

  powerGames.push(
    Object.values(fewestCubes).reduce((acc, curr) => (acc *= curr), 1),
  );
});

const sum = powerGames.reduce((acc, curr) => acc + curr, 0);

console.log(`sum of power games: ${sum}`);

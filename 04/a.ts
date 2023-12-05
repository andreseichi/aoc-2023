const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
const cards = lines.map((line) => line.split(": ")[1]);
const games = cards.map((card) => card.split(" | "));

const numbersMatch = games.map((game) => {
  const [winningNumbers, myNumbers] = game.map((numbers) =>
    numbers.split(" ").filter((number) => number !== ""),
  );

  const match: number[] = [];

  winningNumbers.forEach((number) => {
    if (myNumbers.includes(number)) {
      match.push(parseInt(number));
    }
  });

  return match;
});

const result = numbersMatch.map((match) => {
  const ammount = match.length;

  if (ammount === 0) return 0;

  return 2 ** (ammount - 1);
});

const sum = result.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

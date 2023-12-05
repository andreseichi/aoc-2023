const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
const cards = lines.map((line) => line.split(": ")[1]);
const games = cards.map((card) => card.split(" | "));

const instancesCards = Array.from({ length: games.length }, () => 1);

games.forEach((game, cardIndex) => {
  const [winningNumbers, myNumbers] = game.map((numbers) =>
    numbers.split(" ").filter((number) => number !== ""),
  );

  let ammount = 0;

  winningNumbers.forEach((number) => {
    if (myNumbers.includes(number)) {
      ammount++;
    }
  });

  for (let i = cardIndex; i < ammount + cardIndex; i++) {
    for (let j = 0; j < instancesCards[cardIndex]; j++) {
      instancesCards[i + 1]++;
    }
  }
});

const sum = instancesCards.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

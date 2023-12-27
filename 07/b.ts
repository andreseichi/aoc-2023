const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const hands = lines.map((line) => line.split(" "));

const cardValue = {
  A: 14,
  K: 13,
  Q: 12,
  T: 11,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

const getValue = (card: string) => {
  return cardValue[card] || Number(card);
};

function compareHands(hand1, hand2) {
  for (let i = 0; i < hand1[0].length; i++) {
    const cardHand1 = hand1[0][i];
    const cardHand2 = hand2[0][i];

    const valueCard1 = getValue(cardHand1);
    const valueCard2 = getValue(cardHand2);

    if (valueCard1 < valueCard2) {
      return -1;
    } else if (valueCard1 > valueCard2) {
      return 1;
    }
  }

  return 0;
}

Array.prototype.multiIndexOf = function (el) {
  var idxs = [];
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] === el) {
      idxs.unshift(i);
    }
  }
  return idxs;
};

const types = hands.map((hand) => {
  const hashTable = new Map();
  for (let i = 0; i < hand[0].length; i++) {
    hashTable[hand[0][i]] = (hashTable[hand[0][i]] || 0) + 1;
  }

  // five of a kind
  if (Object.keys(hashTable).length === 1) {
    return 7;
  } else if (
    Object.keys(hashTable).length === 2 &&
    Object.values(hashTable).includes(4)
  ) {
    if (Object.keys(hashTable).includes("J")) {
      // five of a kind
      return 7;
    }

    // four of a kind
    return 6;
  } else if (Object.keys(hashTable).length === 2) {
    if (Object.keys(hashTable).includes("J")) {
      // five of a kind
      return 7;
    }

    // full house
    return 5;
  } else if (
    Object.keys(hashTable).length === 3 &&
    Object.values(hashTable).includes(3)
  ) {
    if (Object.keys(hashTable).includes("J")) {
      // four or a kind
      return 6;
    }

    // three of a kind
    return 4;
  } else if (Object.keys(hashTable).length === 3) {
    if (hashTable["J"] === 1) {
      // full house
      return 5;
    }
    if (hashTable["J"] === 2) {
      // four or a kind
      return 6;
    }

    // two pairs
    return 3;
  } else if (Object.keys(hashTable).length === 4) {
    if (Object.keys(hashTable).includes("J")) {
      // three of a kind
      return 4;
    }

    // one pair
    return 2;
  } else {
    if (Object.keys(hashTable).includes("J")) {
      // one pair
      return 2;
    }

    // high card
    return 1;
  }
});

// i = types [1,7]
let rank = 1;
const bids = [];
for (let i = 1; i <= 7; i++) {
  const indexes = types.multiIndexOf(i);

  if (indexes.length === 1) {
    const bid = Number(hands[indexes[0]][1]);

    bids.push(bid * rank);
    rank++;
  }

  if (indexes.length > 1) {
    const handsSameType = indexes.map((index) => hands[index]);
    const handsOrdered = [...handsSameType];

    handsOrdered.sort(compareHands);

    handsOrdered.forEach((hand) => {
      const bid = Number(hand[1]);
      bids.push(bid * rank);
      rank++;
    });
  }
}

const result = bids.reduce((acc, curr) => acc + curr, 0);

console.log(result);

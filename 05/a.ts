const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n\n");

const seeds = lines[0].split("\n")[0].split(": ")[1].split(" ").map(Number);
const [, ...seedSoilMap] = lines[1].split("\n");
const [, ...soilFertilizerMap] = lines[2].split("\n");
const [, ...ferlizierWaterMap] = lines[3].split("\n");
const [, ...waterLightMap] = lines[4].split("\n");
const [, ...lightTemperatureMap] = lines[5].split("\n");
const [, ...temperatureHumidityMap] = lines[6].split("\n");
const [, ...humidityLocationMap] = lines[7].split("\n");

// const map = {
//   soil: {},
//   fertilizer: {},
//   water: {},
//   light: {},
//   temperature: {},
//   humidity: {},
//   location: {},
// } as Record<string, Record<string, number>>;

const convert = (map, seed) => {
  let convertedNumber = -1;

  for (const row of map) {
    const [end, start, length] = row
      .split(" ")
      .map((number) => parseInt(number));

    if (seed >= start && seed <= start + length) {
      convertedNumber = end - start + seed;
      break;
    }
  }
  return convertedNumber === -1 ? seed : convertedNumber;
};
const res = seeds
  .map((seed) => convert(seedSoilMap, seed))
  .map((seed) => convert(soilFertilizerMap, seed))
  .map((seed) => convert(ferlizierWaterMap, seed))
  .map((seed) => convert(waterLightMap, seed))
  .map((seed) => convert(lightTemperatureMap, seed))
  .map((seed) => convert(temperatureHumidityMap, seed))
  .map((seed) => convert(humidityLocationMap, seed));

const lowestLocation = Math.min(...res);

console.log(lowestLocation);

// seedSoilMap.forEach((line) => {
//   const numbers = line.split(" ");
//   const destinationStart = parseInt(numbers[0]);
//   const sourceStart = parseInt(numbers[1]);
//   const length = parseInt(numbers[2]);

//   for (let i = 0; i < length; i++) {
//     // map.soil[sourceStart + i] = destinationStart + i;
//     soilMap.set(sourceStart + i, destinationStart + i);
//   }
// });

// soilFertilizerMap.forEach((line) => {
//   const numbers = line.split(" ");
//   const destinationStart = parseInt(numbers[0]);
//   const sourceStart = parseInt(numbers[1]);
//   const length = parseInt(numbers[2]);

//   for (let i = 0; i < length; i++) {
//     map.fertilizer[sourceStart + i] = destinationStart + i;
//   }
// });

// ferlizierWaterMap.forEach((line) => {
//   const numbers = line.split(" ");
//   const destinationStart = parseInt(numbers[0]);
//   const sourceStart = parseInt(numbers[1]);
//   const length = parseInt(numbers[2]);

//   for (let i = 0; i < length; i++) {
//     map.water[sourceStart + i] = destinationStart + i;
//   }
// });

// waterLightMap.forEach((line) => {
//   const numbers = line.split(" ");
//   const destinationStart = parseInt(numbers[0]);
//   const sourceStart = parseInt(numbers[1]);
//   const length = parseInt(numbers[2]);

//   for (let i = 0; i < length; i++) {
//     map.light[sourceStart + i] = destinationStart + i;
//   }
// });

// lightTemperatureMap.forEach((line) => {
//   const numbers = line.split(" ");
//   const destinationStart = parseInt(numbers[0]);
//   const sourceStart = parseInt(numbers[1]);
//   const length = parseInt(numbers[2]);

//   for (let i = 0; i < length; i++) {
//     map.temperature[sourceStart + i] = destinationStart + i;
//   }
// });

// temperatureHumidityMap.forEach((line) => {
//   const numbers = line.split(" ");
//   const destinationStart = parseInt(numbers[0]);
//   const sourceStart = parseInt(numbers[1]);
//   const length = parseInt(numbers[2]);

//   for (let i = 0; i < length; i++) {
//     map.humidity[sourceStart + i] = destinationStart + i;
//   }
// });

// humidityLocationMap.forEach((line) => {
//   const numbers = line.split(" ");
//   const destinationStart = parseInt(numbers[0]);
//   const sourceStart = parseInt(numbers[1]);
//   const length = parseInt(numbers[2]);

//   for (let i = 0; i < length; i++) {
//     map.location[sourceStart + i] = destinationStart + i;
//   }
// });

// const finalLocations: number[] = [];

// seeds.forEach((seed) => {
//   const soil = map["soil"][seed] === undefined ? seed : map["soil"][seed];
//   const fertilizer =
//     map["fertilizer"][soil] === undefined ? soil : map["fertilizer"][soil];
//   const water =
//     map["water"][fertilizer] === undefined
//       ? fertilizer
//       : map["water"][fertilizer];
//   const light = map["light"][water] === undefined ? water : map["light"][water];
//   const temperature =
//     map["temperature"][light] === undefined ? light : map["temperature"][light];
//   const humidity =
//     map["humidity"][temperature] === undefined
//       ? temperature
//       : map["humidity"][temperature];
//   const location =
//     map["location"][humidity] === undefined
//       ? humidity
//       : map["location"][humidity];

//   finalLocations.push(location);
// });

// const lowestLocation = Math.min(...finalLocations);

// console.log(lowestLocation);

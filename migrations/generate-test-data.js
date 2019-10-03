function generateData(entries) {}

const CHECKSUMS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y"
];

function createIdentification() {
  // let date = generateDate();
  let year = generateYear();
  let month = generateMonth();
  let day = generateDay(month);
  let date = 10000 * day + 100 * month + year;
  let tail = generateTail();
  let number = date * 1000 + tail;
  let checksum = CHECKSUMS[number % 31];
  let leadingZero = date < 100000 ? "0" : "";
  return `${leadingZero}${date}${centuryChar()}${tail}${checksum}`;
}

function generateYear() {
  return 10 * randomInteger(0, 9) + randomInteger(0, 9);
}

function generateMonth() {
  let ones;
  let tens = randomInteger(0, 1);
  if (tens == 0) ones = randomInteger(1, 9);
  else ones = randomInteger(1, 2);
  return 10 * tens + ones;
}

function generateDay(month) {
  let tens, ones;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      tens = randomInteger(0, 3);
      if (tens == 3) ones = randomInteger(0, 1);
      else if ((tens = 0)) ones = randomInteger(1, 9);
      else ones = randomInteger(0, 9);
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      tens = randomInteger(0, 3);
      if (tens == 3) ones = 0;
      else if ((tens = 0)) ones = randomInteger(1, 9);
      else ones = randomInteger(0, 9);
      break;
    case 2:
      tens = randomInteger(0, 2);
      if (tens == 2) ones = randomInteger(0, 8);
      else if (tens == 0) ones = randomInteger(1, 9);
      else ones = randomInteger(0, 9);
      break;
    default:
      throw new Error(`Tämä: ${month}`);
  }
  return 10 * tens + ones;
}

function generateDate() {
  let date = 0;
  let last;
  let multiplier = 100000;
  for (let i = 0; i < 6; i++) {
    switch (i) {
      case 0:
        last = randomInteger(0, 3);
        date += multiplier * last;
        break;
      case 1:
        if (last == 0) last = randomInteger(1, 9);
        else if (last == 3) last = randomInteger(0, 1);
        date += multiplier * last;
        break;
      case 2:
        last = randomInteger(0, 1);
        date += multiplier * last;
        break;
      case 3:
        if (last == 0) last = randomInteger(1, 9);
        else last = randomInteger(1, 2);
        date += multiplier * last;
        break;
      case (4, 5):
        last = randomInteger(0, 9);
        date += multiplier * last;
        break;
      default:
        break;
    }
    multiplier = multiplier / 10;
  }
  return date;
}

function generateTail() {
  let tail = 0;
  let last;
  let multiplier = 100;
  for (let i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        last = randomInteger(0, 8);
        tail += multiplier * last;
        break;
      case 1:
        last = randomInteger(0, 9);
        tail += multiplier * last;
        break;
      case 2:
        last = randomInteger(0, 8);
        break;
      default:
        break;
    }
    multiplier = multiplier / 10;
  }
  return tail;
}

function centuryChar() {
  if (randomInteger(0, 1) == 1) return "A";
  return "-";
}

function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(createIdentification());

const Swiss = require('../src');

let teams = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

const r = new Swiss(teams);
const f = new Swiss(teams, 'fix');

let rPair1 = f.pairing(1);
// console.log(rPair1);
for (let pair of rPair1) {
  wrapper(1, pair[0], pair[1]);
}

// f.getReport();

let rPair2 = f.pairing(2);
// console.log(rPair2);
for (let pair of rPair2) {
  wrapper(2, pair[0], pair[1]);
}
// f.getReport();

let rPair3 = f.pairing(3);
// console.log(rPair3);
for (let pair of rPair3) {
  wrapper(3, pair[0], pair[1]);
}
// f.getReport();

let rPair4 = f.pairing(4);
// console.log(rPair4);
for (let pair of rPair4) {
  wrapper(4, pair[0], pair[1]);
}
f.getReport();

function wrapper (round, a, b) {
  if (Math.random() > 0.5) {
    f.reportMatch(round, a, b);
  } else {
    f.reportMatch(round, b, a);
  }
}

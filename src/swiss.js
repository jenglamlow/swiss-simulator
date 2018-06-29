'use strict';

const utils = require('./utils');

function Swiss (teams, format) {
  this.format = format || 'random'; // random or fix
  this.teams = teams;
  this.numOfRounds = Math.ceil(Math.log2(teams.length));
  this.match = [];
  let id = 1;
  this.pair_dict = {};
  this.teamRecord = teams.reduce((acc, cur) => {
    let obj = {
      id: id++,
      name: cur,
      win: 0,
      lose: 0
    };
    acc.push(obj);
    return acc;
  }, []);
}

Swiss.prototype.createPair = function (teams) {
  let newPair = [];
  for (let i = 0; i < teams.length; i += 2) {
    let pair = teams.slice(i, i + 2);
    newPair.push(pair);
    let key1 = teams[i] + teams[i + 1];
    let key2 = teams[i + 1] + teams[i];

    if (!(key1 in this.pair_dict)) {
      this.pair_dict[key1] = pair;
      if (!(key2 in this.pair_dict)) {
        this.pair_dict[key2] = pair;
      } else {
        console.log('DUPLICATE!!!', key2);
      }
    } else {
      console.log('DUPLICATE!!!', key1);
    }
  }

  return newPair;
};

Swiss.prototype.pairing = function (round) {
  let team = [];
  if (round === 1) {
    team = [...this.teams];
    if (this.format === 'random') {
      team = utils.shuffle(team);
    } else {
      // Match-fixing
    }
  } else {
    // Group by win number
    let groupNum = round;
    console.log(this.teamRecord.sort((a, b) => b.win - a.win || a.id - b.id));

    let arr = [];
    while (groupNum) {
      let equalTeam = this.teamRecord
        .filter(team => team.win === groupNum - 1)
        .map(team => team.name);

      console.log(equalTeam);

      if (equalTeam.length > 2) {
        let temp = [];
        let half = equalTeam.length / 2;
        for (let i = 0; i < half; i++) {
          temp.push(equalTeam[i]);
          temp.push(equalTeam[i + half]);
        }
        equalTeam = temp;
        console.log('after', equalTeam);
      }

      arr.push(equalTeam);
      groupNum--;
    }

    team = utils.flatten(arr);

    if (this.format === 'random') {
      // team = utils.shuffle(team);
    } else {
      // Match-fixing
    }
  }

  return this.createPair(team);
};

Swiss.prototype.reportMatch = function (round, winner, loser) {
  this.match.push([round, winner, loser]);

  // Update team record
  this.teamRecord.filter(team => team.name === winner)[0].win += 1;
  this.teamRecord.filter(team => team.name === loser)[0].lose += 1;
};

Swiss.prototype.getReport = function () {
  // console.log(this.match);
  let record = this.teamRecord.sort((a, b) => b.win - a.win || a.id - b.id);
  console.log(this.match);
  console.log(record);
};

module.exports = Swiss;

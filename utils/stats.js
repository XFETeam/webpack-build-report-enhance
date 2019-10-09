'use strict';

const fs = require('fs');
const path = require('path');

const STATS_FILE = path.resolve(process.cwd(), 'node_modules', '.build-stats.json');

function getSaved() {
  let savedStats;
  try {
    savedStats = JSON.parse(fs.readFileSync(STATS_FILE))
  } catch (err) {
    savedStats = {}
  }
  return savedStats
}

function save(stats, saveStats) {
  fs.writeFileSync(saveStats, JSON.stringify(stats, null, 2))
}

module.exports = {
  getSaved,
  save
};

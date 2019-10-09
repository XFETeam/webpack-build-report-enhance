'use strict';

const moment = require('dayjs');
const fs = require('fs');

const cliUtils = require('./cli');

function save(report, mode, output, callback) {
  if (mode !== 'append' && mode !== 'write') {
    cliUtils.log('unauthorized-mode', { mode });
    callback();
  }
  if (mode === 'append') {
    try {
      fs.readFileSync(output)
    } catch (err) {
      return save(report, 'write', output, callback)
    }
    report = `\n---\n${report}`
  }

  fs[`${mode}FileSync`].call(this, output, report);
  cliUtils.log('success', { output });
  callback()
}

function buildGenericInfo(stats) {
  let info = '';
  info += `- Date: **${moment().format('LLL')}**\n`;
  info += `- Time: **${stats.time}**ms\n`;
  info += `- Hash: **${stats.hash}**\n`;
  info += `- Version: webpack **${stats.version}**\n\n`;
  return info
}

module.exports = {
  buildGenericInfo,
  save
};

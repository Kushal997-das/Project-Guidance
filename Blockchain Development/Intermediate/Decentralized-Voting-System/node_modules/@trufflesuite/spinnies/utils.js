'use strict';

const readline = require('readline');
const stripAnsi = require('strip-ansi');
const { dashes, dots } = require('./spinners');
const chalk = require('chalk');

const VALID_STATUSES = ['succeed', 'fail', 'warn', 'spinning', 'non-spinnable', 'stopped'];

// See: https://github.com/chalk/chalk/blob/v4.1.2/index.d.ts#L6-L49
const VALID_COLORS = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
  'blackBright',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
  'bgGray',
  'bgGrey',
  'bgBlackBright',
  'bgRedBright',
  'bgGreenBright',
  'bgYellowBright',
  'bgBlueBright',
  'bgMagentaBright',
  'bgCyanBright',
  'bgWhiteBright',
  // the only non-chalk color - we handle this separately as a special placholder for default terminal foreground color
  'none'
];

function purgeSpinnerOptions(options) {
  const { text, status, indent } = options;
  const opts = { text, status, indent };
  const colors = colorOptions(options);
  const prefixes = prefixOptions(options);

  if (!VALID_STATUSES.includes(status)) delete opts.status;
  if (typeof text !== 'string') delete opts.text;
  if (typeof indent !== 'number') delete opts.indent;

  return { ...colors, ...prefixes, ...opts};
}

function purgeSpinnersOptions({ spinner, disableSpins, ...others }) {
  const colors = colorOptions(others);
  const prefixes = prefixOptions(others);
  const disableSpinsOption = typeof disableSpins === 'boolean' ? { disableSpins } : {};
  spinner = turnToValidSpinner(spinner);

  return { ...colors, ...prefixes, ...disableSpinsOption, spinner }
}

function turnToValidSpinner(spinner = {}) {
  const platformSpinner = terminalSupportsUnicode() ? dots : dashes;
  if (!typeof spinner === 'object') return platformSpinner;
  let { interval, frames } = spinner;
  if (!Array.isArray(frames) || frames.length < 1) frames = platformSpinner.frames;
  if (typeof interval !== 'number') interval = platformSpinner.interval;

  return { interval, frames };
}

function colorOptions({ textColor, prefixColor }) {
  const colors = { textColor, prefixColor };
  Object.keys(colors).forEach(key => {
    if (!VALID_COLORS.includes(colors[key])) delete colors[key];
  });

  return colors;
}

function prefixOptions({ succeedPrefix, failPrefix, warnPrefix, stoppedPrefix }) {
  if(terminalSupportsUnicode()) {
    succeedPrefix = succeedPrefix || '✓';
    failPrefix = failPrefix || '✖';
    warnPrefix = warnPrefix || '⚠';
  } else {
    succeedPrefix = succeedPrefix || '√';
    failPrefix = failPrefix || '×';
    warnPrefix = warnPrefix || '~';
  }

  stoppedPrefix = stoppedPrefix || "";

  return { succeedPrefix, failPrefix, warnPrefix, stoppedPrefix };
}

function breakText(text, prefixLength) {
  return text.split('\n')
    .map((line, index) => index === 0 ? breakLine(line, prefixLength) : breakLine(line, 0))
    .join('\n');
}

function breakLine(line, prefixLength) {
  const columns = process.stderr.columns || 95;
  return line.length  >= columns - prefixLength
    ? `${line.substring(0, columns - prefixLength - 1)}\n${
      breakLine(line.substring(columns - prefixLength - 1, line.length), 0)
    }`
    : line;
}

function getLinesLength(text, prefixLength) {
  return stripAnsi(text)
    .split('\n')
    .map((line, index) => index === 0 ? line.length + prefixLength : line.length);
}

function writeStream(stream, output, rawLines) {
  stream.write(output);
  readline.moveCursor(stream, 0, -rawLines.length);
}

function cleanStream(stream, rawLines) {
  rawLines.forEach((lineLength, index) => {
    readline.moveCursor(stream, lineLength, index);
    readline.clearLine(stream, 1);
    readline.moveCursor(stream, -lineLength, -index);
  });
  readline.moveCursor(stream, 0, rawLines.length);
  readline.clearScreenDown(stream);
  readline.moveCursor(stream, 0, -rawLines.length);
}

function terminalSupportsUnicode() {
    // The default command prompt and powershell in Windows do not support Unicode characters.
    // However, the VSCode integrated terminal and the Windows Terminal both do.
    return process.platform !== 'win32'
      || process.env.TERM_PROGRAM === 'vscode'
      || !!process.env.WT_SESSION
}

function applyColor(color, text) {
  if (color && color !== 'none') {
    return chalk[color](text);
  }

  return text;
}

module.exports = {
  purgeSpinnersOptions,
  purgeSpinnerOptions,
  colorOptions,
  prefixOptions,
  breakText,
  getLinesLength,
  writeStream,
  cleanStream,
  terminalSupportsUnicode,
  applyColor
}

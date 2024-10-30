'use strict';

const readline = require('readline');
const cliCursor = require('cli-cursor');
const { dashes, dots } = require('./spinners');

const { purgeSpinnerOptions, purgeSpinnersOptions, colorOptions, prefixOptions, breakText, getLinesLength, terminalSupportsUnicode, applyColor } = require('./utils');
const { isValidStatus, writeStream, cleanStream } = require('./utils');

class Spinnies {
  constructor(options = {}) {
    options = purgeSpinnersOptions(options);
    this.options = {
      prefixColor: 'none',
      textColor: 'none',
      spinner: terminalSupportsUnicode() ? dots : dashes,
      disableSpins: false,
      ...options
    };
    this.spinners = {};
    this.isCursorHidden = false;
    this.currentInterval = null;
    this.stream = process.stderr;
    this.lineCount = 0;
    this.currentFrameIndex = 0;
    this.spin = !this.options.disableSpins && !process.env.CI && process.stderr && process.stderr.isTTY;
    this.bindSigint();
  }

  pick(name) {
    return this.spinners[name];
  }

  add(name, options = {}) {
    if (typeof name !== 'string') {
      throw Error('A spinner reference name must be specified');
    }

    if (typeof options === "string") {
      options = { text: options };
    }

    if (!options.text) {
      options.text = name;
    }

    const spinnerProperties = {
      ...colorOptions(this.options),
      ...prefixOptions(this.options),
      status: 'spinning',
      ...purgeSpinnerOptions(options),
    };

    this.spinners[name] = spinnerProperties;
    this.updateSpinnerState();

    return spinnerProperties;
  }

  update(name, options = {}) {
    if (typeof options === "string") {
      options = { text: options };
    }

    const { status } = options;
    this.setSpinnerProperties(name, options, status);
    this.updateSpinnerState();

    return this.spinners[name];
  }

  succeed(name, options) {
    if (typeof options === "string") {
      options = {
        text: options,
        prefixColor: "green",
        textColor: "none"
      }
    }

    if (!options) {
      options = {
        prefixColor: "green",
        textColor: "none"
      };
    }

    this.setSpinnerProperties(name, options, 'succeed');
    this.updateSpinnerState();

    return this.spinners[name];
  }

  fail(name, options) {
    if (typeof options === "string") {
      options = {
        text: options,
        prefixColor: "red",
        textColor: "none"
      }
    }

    if (!options) {
      options = {
        prefixColor: "red",
        textColor: "none"
      };
    }

    this.setSpinnerProperties(name, options, 'fail');
    this.updateSpinnerState();

    return this.spinners[name];
  }

  warn(name, options) {
    if (typeof options === "string") {
      options = {
        text: options,
        prefixColor: "yellow",
        textColor: "none"
      }
    }

    if (!options) {
      options = {
        prefixColor: "yellow",
        textColor: "none"
      };
    }

    this.setSpinnerProperties(name, options, 'warn');
    this.updateSpinnerState();

    return this.spinners[name];
  }

  stop(name, options = {}) {
    if (typeof options === "string") {
      options = {
        text: options,
        prefixColor: "red",
        textColor: "none"
      }
    }

    this.setSpinnerProperties(name, options, 'stopped');
    this.updateSpinnerState();

    return this.spinners[name];
  }


  remove(name) {
    if (typeof name !== 'string') throw Error('A spinner reference name must be specified');
    const spinner = this.spinners[name];
    delete this.spinners[name];

    return spinner;
  }

  stopAll(newStatus = 'stopped') {
    Object.keys(this.spinners).forEach(name => {
      const { status: currentStatus } = this.spinners[name];
      const options = this.spinners[name];

      if (!['fail', 'succeed', 'warn', 'non-spinnable'].includes(currentStatus)) {
        if (!['succeed', 'fail', 'warn'].includes(newStatus)) {
          newStatus = 'stopped';
        }

        switch(newStatus) {
          case 'fail':
            options.prefixColor = 'red';
            options.textColor = 'none';
            break;
          case 'succeed':
            options.prefixColor = 'green';
            options.textColor = 'none';
            break;
          case 'warn':
            options.prefixColor = 'yellow';
            options.textColor = 'none';
            break;
          default:
            options.textColor = 'none';
        }

        options.status = newStatus;
      }
    });
    this.checkIfActiveSpinners();
    return this.spinners;
  }

  hasActiveSpinners() {
    return !!Object.values(this.spinners).find(({ status }) => status === 'spinning');
  }

  setSpinnerProperties(name, options, status) {
    if (typeof name !== 'string') throw Error('A spinner reference name must be specified');
    if (!this.spinners[name]) throw Error(`No spinner initialized with name ${name}`);
    options = purgeSpinnerOptions(options);
    status = status || 'spinning';

    this.spinners[name] = { ...this.spinners[name], ...options, status };
  }

  updateSpinnerState(name, options = {}, status) {
    if (this.spin) {
      clearInterval(this.currentInterval);
      this.currentInterval = this.loopStream();
      if (!this.isCursorHidden) cliCursor.hide();
      this.isCursorHidden = true;
      this.checkIfActiveSpinners();
    } else {
      this.setRawStreamOutput();
    }
  }

  loopStream() {
    const { frames, interval } = this.options.spinner;
    return setInterval(() => {
      this.setStreamOutput(frames[this.currentFrameIndex]);
      this.currentFrameIndex = this.currentFrameIndex === frames.length - 1 ? 0 : ++this.currentFrameIndex
      this.checkIfActiveSpinners();
    }, interval);
  }

  setStreamOutput(frame = '') {
    let output = '';
    const linesLength = [];
    const hasActiveSpinners = this.hasActiveSpinners();
    Object
      .values(this.spinners)
      .map(({ text, status, textColor, prefixColor, succeedPrefix, failPrefix, warnPrefix, stoppedPrefix, indent }) => {
        let line;
        let prefixLength = indent || 0;

        let prefix = '';

        switch(status) {
          case 'spinning':
            prefixLength += frame.length + 1;
            prefix = `${frame} `
            break;
          case 'succeed':
            prefixLength += succeedPrefix.length + 1;
            prefix = `${succeedPrefix} `;
            break;
          case 'fail':
            prefixLength += failPrefix.length + 1;
            prefix = `${failPrefix} `;
            break;
          case 'warn':
            prefixLength += warnPrefix.length + 1;
            prefix = `${warnPrefix} `;
            break;
          default:
            prefixLength += stoppedPrefix ? stoppedPrefix.length + 1 : 0;
            prefix = stoppedPrefix ? `${stoppedPrefix} ` : "";
            break;
        }

        if (status === 'spinning' || hasActiveSpinners) {
          text = breakText(text, prefixLength);
        }

        line = `${applyColor(prefixColor, prefix)}${applyColor(textColor, text)}`

        linesLength.push(...getLinesLength(text, prefixLength));
        output += indent ? `${' '.repeat(indent)}${line}\n` : `${line}\n`;
      });

    if(!hasActiveSpinners) readline.clearScreenDown(this.stream);
    writeStream(this.stream, output, linesLength);
    if (hasActiveSpinners) cleanStream(this.stream, linesLength);
    this.lineCount = linesLength.length;
  }

  setRawStreamOutput() {
    Object.values(this.spinners).forEach(i => {
      process.stderr.write(`- ${i.text}\n`);
    });
  }

  checkIfActiveSpinners() {
    if (!this.hasActiveSpinners()) {
      if (this.spin) {
        this.setStreamOutput();
        readline.moveCursor(this.stream, 0, this.lineCount);
        clearInterval(this.currentInterval);
        this.isCursorHidden = false;
        cliCursor.show();
      }
      this.spinners = {};
    }
  }

  bindSigint(lines) {
    process.removeAllListeners('SIGINT');
    process.on('SIGINT', () => {
      cliCursor.show();
      readline.moveCursor(process.stderr, 0, this.lineCount);
      process.exit(0);
    });
  }

}

module.exports = Spinnies;
module.exports.dots = dots;
module.exports.dashes = dashes;

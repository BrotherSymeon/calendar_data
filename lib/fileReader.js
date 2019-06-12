const fs = require('fs');
const rl = require('readline');

const lines = [];
let inFile = '';
let outFile = '';
let confTerminal = false;


const extractor = {
  extract(config, callback) {
    this.config(config);
    this.run(callback);
  },
  config(config) {
    // maybe we should just merge these using merge
    inFile = config.inFile;
    outFile = config.outFile;
    confTerminal = config.outTerminal;
  },
  getConfig() {
    return {
      inFile,
      outFile,
      outTerminal: confTerminal,
    };
  },
  run(cb) {
    try {
      fs.exists(inFile, (exists) => {
        if (exists) {
          const flInterface = rl.createInterface({
            input: fs.createReadStream(inFile),
            terminal: confTerminal,
          });

          flInterface.on('line', (line) => {
            lines.push(line);
          });
          flInterface.on('close', () => {
            fs.open(outFile, 'w', (err, fd) => {
              if (err) {
                cb(err);
              }
              const obj = cb(null, lines);
              if (Array.isArray(obj)) {
                // write it out line by line
                for (let i = 0; i < obj.length; i++) {
                  fs.writeSync(fd, `${obj[i]}\n`);
                }
              } else if (typeof obj === 'object') {
                fs.writeSync(fd, JSON.stringify(obj, null, ' '));
              }
            });
          });
        } else {
          cb(Error(`input data file: ${inFile} does not exist`));
        }
      });
    } catch (e) {
      return console.log('file not found');
    }
  },
};

module.exports = extractor;

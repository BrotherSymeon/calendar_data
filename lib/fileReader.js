var fs = require('fs')
var rl = require('readline')

var lines = []
var inFile = '';
var outFile = '';
var confTerminal = false;


var extractor = {
    extract: function (config, callback) {
        this.config(config);
        this.run(callback);
    },
    config: function (config) {
        //maybe we should just merge these using merge
        inFile = config.inFile;
        outFile = config.outFile;
        confTerminal = config.outTerminal;
    },
    getConfig: function () {
        return {
            inFile: inFile,
            outFile: outFile,
            outTerminal: confTerminal,
        }
    },
    run: function (cb) {
        try {
            fs.exists(inFile, (exists) => {
                if(exists){

                    var flInterface = rl.createInterface({
                        input: fs.createReadStream(inFile),
                        terminal: confTerminal
                    })

                    flInterface.on('line', function (line) {
                        lines.push(line.trim());
                    });
                    flInterface.on('close', function () {
                        fs.open(outFile, 'w', function (err, fd) {
                            if (err) {
                                cb(err)
                            }
                            var obj = cb(null, lines);
                            if (Array.isArray(obj)) {
                                //write it out line by line
                                for (var i = 0; i < obj.length; i++) {
                                    fs.writeSync(fd, obj[i] + '\n');
                                }
                            } else {
                                if (typeof obj === 'object') {
                                    fs.writeSync(fd, JSON.stringify(obj, null, ' '));
                                }
                            }
                        })

                    })

                }else{

                    cb(Error(`input data file: ${inFile} does not exist`))
                }
            });


        } catch (e) {
            return console.log(`file not found`)
        }

    },
}

module.exports = extractor;


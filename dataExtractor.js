
var fs = require('fs')
var rl = require('readline')

var lines = []
var inFile = '';
var outFile = '';

var confTerminal = false;
var extractor = {
  config: function(config){
    inFile = config.inFile;
    outFile = config.outFile;
  },
  getConfig: function(){
    return {
      inFile: inFile,
      outFile: outFile
    }
  },
  run: function(cb){
    var flInterface = rl.createInterface({
      input: fs.createReadStream(inFile),
      terminal: confTerminal
    })
    flInterface.on('line', function(line){
      lines.push(line.trim());
    });
    flInterface.on('close', function(){
      fs.open(outFile, 'w', function(err, fd){
        if(err){ cb(err) }
        var obj = cb(null, lines);
        if(Array.isArray(obj)){
          //write it out line by line
          for(var i = 0; i < obj.length; i++){
            fs.writeSync(fd, obj[i]+'\n');
          }
        }else{
          if(typeof obj === 'object'){
            fs.writeSync(fd, JSON.stringify(obj));
          }
        }
      })
    
    })

  },
}

module.exports = extractor;


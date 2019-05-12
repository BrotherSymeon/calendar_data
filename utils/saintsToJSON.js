//run this in the console to extract from
//the pipeseperated file
var fs = require('fs');
var readline = require('readline')

var arr = [];
var rl = readline.createInterface({
  input: fs.createReadStream("./data/pipeSeperatedSaintsData.txt"),
  terminal: false
})

function toObj(line){
  var items = line.split('|')
  return {
    name: items[0],
    monthName: items[1],
    month: items[2],
    day: items[3],
    show: (items[4] > 0),
    saintOfDay: (items[5] > 0)
  }

}

rl.on("line", function(ln){
  arr.push(toObj(ln.trim()))
})

rl.on("close", function(){

  fs.open("./data/saints.json", 'w',(err, fd) =>{
    if(err){return console.log(err)}
    var saints = {
      list: arr
    }
    fs.writeSync(fd,JSON.stringify(saints));

  })
})

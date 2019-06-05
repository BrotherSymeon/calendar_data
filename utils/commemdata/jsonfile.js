#!/usr/bin/env node 


// makes a flat file from the commemoration data
//
var extractor = require('../../lib/fileReader');
conf = {
  inFile: '',
  outFile: ''
}

conf.inFile = process.argv[2];
conf.outFile = process.argv[3];

console.log('outFile = ' + conf.outFile);
console.log('inFile = ' + conf.inFile);


extractor.config(conf);
extractor.run(function(err, lines){
  var out = [];
  var currentDate = '';
  var isSaintOfDay = 0;
  var newlyCapturedDate = false;
  var months = ['JANUARY','FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER', 'DECEMBER'];
  lines.forEach(function(currentLine, i, arr){
    var currentLine  = currentLine.replace(/\+/g, '').replace(/\~/g, '').trim();
    
    function mastersTest(line){
      return line.toLowerCase().indexOf('saviour') === -1 &&  line.toLowerCase().indexOf('theotokos') === -1
    }

    function isDateLine( line, months ){
      var ret = {
        isDateLine: false,
        month: '',
        day: ''
      }
      
      months.forEach(function(current){
        if(line.indexOf(current) > -1){
          ret.isDateLine = true;
          ret.month = line.split(' ')[0];
          ret.day = line.split(' ')[1];
        }
      })
      return ret;
    }
    
    var testForDate = isDateLine(currentLine, months)
    if(testForDate.isDateLine){
      currentDate = testForDate.month + ' ' + testForDate.day;
      newlyCapturedDate = true;
    }else {
      if(currentLine.length > 0){
        if (newlyCapturedDate) {
          out.push({month: (months.indexOf(currentDate.split(' ')[0]) + 1),
                    day: Number(currentDate.split(' ')[1]) ,
                    description: currentLine,
                    sod:mastersTest(currentLine)
                    })
          if(mastersTest(currentLine)){ newlyCapturedDate = false }

        } else { 
          out.push({month: (months.indexOf(currentDate.split(' ')[0]) + 1),
                    day: Number(currentDate.split(' ')[1]),
                    description: currentLine,
                    sod:false
                    })
        }
      }
    }
    
  })

  return {
    saints: out
  }


});



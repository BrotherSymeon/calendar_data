#!/usr/bin/env node


// makes a flat file from the commemoration data
//
const extractor = require('../../lib/fileReader');

let conf = {
  inFile: '',
  outFile: '',
};

[ , , conf.inFile, conf.outFile] = process.argv;
//conf.inFile = process.argv[2];
//conf.outFile = process.argv[3];

//console.log(`outFile = ${conf.outFile}`);
//console.log(`inFile = ${conf.inFile}`);


extractor.config(conf);
extractor.run((err, lines) => {
  const out = [];
  let currentDate = '';
  const isSaintOfDay = 0;
  let newlyCapturedDate = false;
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  lines.forEach((currentLine, i, arr) => {
    var currentLine = currentLine.replace(/\+/g, '').replace(/\~/g, '').trim();

    function mastersTest(line) {
      return line.toLowerCase().indexOf('saviour') === -1 && line.toLowerCase().indexOf('theotokos') === -1;
    }

    function isDateLine(line, months) {
      const ret = {
        isDateLine: false,
        month: '',
        day: '',
      };

      months.forEach((current) => {
        if (line.indexOf(current) > -1) {
          ret.isDateLine = true;
          ret.month = line.split(' ')[0];
          ret.day = line.split(' ')[1];
        }
      });
      return ret;
    }

    const testForDate = isDateLine(currentLine, months);
    if (testForDate.isDateLine) {
      currentDate = `${testForDate.month} ${testForDate.day}`;
      newlyCapturedDate = true;
    } else if (currentLine.length > 0) {
      if (newlyCapturedDate) {
        out.push({
          month: (months.indexOf(currentDate.split(' ')[0]) + 1),
          day: Number(currentDate.split(' ')[1]),
          description: currentLine,
          sod: mastersTest(currentLine),
        });
        if (mastersTest(currentLine)) { newlyCapturedDate = false; }
      } else {
        out.push({
          month: (months.indexOf(currentDate.split(' ')[0]) + 1),
          day: Number(currentDate.split(' ')[1]),
          description: currentLine,
          sod: false,
        });
      }
    }
  });

  return {
    saints: out,
  };
});

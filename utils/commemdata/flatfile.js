#!/usr/bin/env node

// makes a flat file from the commemoration data
//
const extractor = require('../../lib/fileReader');

conf = {
  inFile: '',
  outFile: '',
};

conf.inFile = process.argv[2];
conf.outFile = process.argv[3];

console.log(`outFile = ${conf.outFile}`);
console.log(`inFile = ${conf.inFile}`);


extractor.config(conf);
extractor.run((err, lines) => {
  const out = [];
  let currentDate = '';
  let isSaintOfDay = 0;
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  lines.forEach((currentLine, i, arr) => {
    var currentLine = currentLine.replace(/\+/g, '').replace(/\~/g, '').trim();


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
      isSaintOfDay = 1;
    } else if (currentLine.length > 0) {
      out.push(`${currentDate}|${currentLine}|${isSaintOfDay}`);
      // reset this so it only is true once for each date
      isSaintOfDay = 0;
    }
  });

  return out;
});

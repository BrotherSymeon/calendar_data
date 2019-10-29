
/*  reId int(11) NOT NULL AUTO_INCREMENT,
 reMonth int(11) NOT NULL DEFAULT '0',
 reDay int(11) NOT NULL DEFAULT '0',
 rePday int(11) NOT NULL DEFAULT '999',
 reType varchar(64) DEFAULT NULL,
 reDesc varchar(64) DEFAULT NULL,
 reBook varchar(8) DEFAULT NULL,
 reNum varchar(8) DEFAULT NULL,
 reIndex int(11) NOT NULL DEFAULT '0',
 reFlag tinyint(1) NOT NULL DEFAULT '0',
 PRIMARY KEY (reId),
 KEY pents (rePday),
 KEY days (reMonth, reDay) */

module.exports = function (error, lines) {
  if (error) {
    return console.error('huston we have a problem...', error.message);
  }
  const init = [];
  let retVal = {};
  var re = /\((.*)\)/

  retVal.data = lines.reduce((acc, current, index, arr) => {
    console.log(current)
    if(current.indexOf('insert') > -1){
      var items = re[Symbol.match](current)
      var result = items[1].split(',')
      var reading = {
        reId: Number(result[0]),
        reMonth: Number(result[1]),
        reDay: Number(result[2]),
        rePday: Number(result[3]),
        reType: result[4].trim().replace(/\'/g, ''),
        reDesc: result[5].trim().replace(/\'/g, ''),
        reBook: result[6].trim().replace(/\'/g, ''),
        reNum: result[7].trim().replace(/\'/g, ''),
        reIndex: Number(result[8]),
        reFlag: Number(result[9])
      }
      acc.push(reading)
    }
   
    return acc;
  }, []);
  // console.log(JSON.stringify(retVal, null, ' '))
  return retVal;
};

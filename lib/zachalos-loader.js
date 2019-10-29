

/* zaId int(11) NOT NULL AUTO_INCREMENT,
zaNum varchar(8) DEFAULT NULL,
zaBook varchar(16) DEFAULT NULL,
zaDisplay varchar(128) DEFAULT NULL,
zaSdisplay varchar(64) DEFAULT NULL,
zaDesc varchar(128) DEFAULT NULL,
zaPreverse varchar(8) DEFAULT NULL,
zaPrefix varchar(255) DEFAULT NULL,
zaPrefixb varchar(128) DEFAULT NULL,
zaVerses varchar(128) DEFAULT NULL,
zaSuffix varchar(255) DEFAULT NULL,
zaFlag tinyint(1) NOT NULL DEFAULT '0',
PRIMARY KEY (zaId),
KEY zachs (zaBook,zaNum) */

module.exports = function (error, lines) {
  if (error) {
    return console.error('huston we have a problem...', error.message);
  }
  const init = [];
  let retVal = {};
  var re = /\((.*)\)/
  var i = 0;
  retVal.zachalos = lines.reduce((acc, current, index, arr) => {
    //console.log(current)

    
    var result = current.split('|')

    var zachalos = {
      zaId: i++,
      zaNum: result[1].trim().replace(/\'/g, ''),
      zaBook: result[2].trim().replace(/\'/g, ''),
      zaDisplay: result[3].trim().replace(/\'/g, ''),
      zaSdisplay: result[4].trim().replace(/\'/g, ''),
      zaDesc: result[5].trim().replace(/\'/g, ''),
      zaPreverse: result[6].trim().replace(/\'/g, ''),
      zaPrefix: result[7].trim().replace(/\'/g, ''),
      zaPrefixb: result[8].trim().replace(/\'/g, ''),
      zaVerses: result[9].trim().replace(/\'/g, ''),
      zaSuffix: result[10].trim().replace(/\'/g, ''),
      zaFlag: Number(result[11])
    }
    acc.push(zachalos)


    return acc;
  }, []);
  // console.log(JSON.stringify(retVal, null, ' '))
  return retVal;
};
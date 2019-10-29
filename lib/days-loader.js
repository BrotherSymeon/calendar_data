/* 
  daId int(11) NOT NULL AUTO_INCREMENT,
  daPday int(11) NOT NULL DEFAULT '0',
  daMonth int(11) NOT NULL DEFAULT '0',
  daDay int(11) NOT NULL DEFAULT '0',
  daPname text,
  daPsub varchar(128) DEFAULT NULL,
  daFname varchar(255) DEFAULT NULL,
  daFlevel int(11) NOT NULL DEFAULT '0',
  daService int(11) NOT NULL DEFAULT '0',
  daSnote varchar(64) DEFAULT NULL,
  daSaint varchar(255) DEFAULT NULL,
  daSlevel int(11) NOT NULL DEFAULT '0',
  daFast int(11) NOT NULL DEFAULT '0',
  daFexc int(11) NOT NULL DEFAULT '0',
  daKatavasia varchar(16) DEFAULT NULL,
  daFlag tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (daId),
  KEY pents (daPday),
  KEY days (daMonth,daDay) */

module.exports = function (error, lines) {
  if (error) {
    return console.error('huston we have a problem...', error.message);
  }
  const init = [];
  let retVal = {};
  var re = /\((.*)\)/

  retVal.days = lines.reduce((acc, current, index, arr) => {
    console.log(current)
    if(current.indexOf('INSERT') > -1){
      var items = re[Symbol.match](current)
      var result = items[1].split(',')
      var day = {
        daId: Number(result[0]),
        daPday: Number(result[1]),
        daMonth: Number(result[2]),
        daDay: Number(result[3]),
        daPname: result[4].trim().replace(/\'/g, ''),
        daPsub: result[5].trim().replace(/\'/g, ''),
        daFname: result[6].trim().replace(/\'/g, ''),
        daFlevel: Number(result[7]),
        daService: Number(result[8]),
        daSnote: result[9].trim().replace(/\'/g, ''),
        daSaint: result[10].trim().replace(/\'/g, ''),
        daSlevel: Number(result[11]),
        daFast: Number(result[12]),
        daFexc: Number(result[13]),
        daKatavasia: result[14].trim().replace(/\'/g, ''),
        daFlag: Number(result[15])
      }
      acc.push( day )
    }
   
    return acc;
  }, []);
  // console.log(JSON.stringify(retVal, null, ' '))
  return retVal;
};

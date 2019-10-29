/* xcId int(11) NOT NULL AUTO_INCREMENT,
xcYear int(11) NOT NULL DEFAULT '0',
xcMonth int(11) NOT NULL DEFAULT '0',
xcDay int(11) NOT NULL DEFAULT '0',
xcNewMonth int(11) NOT NULL DEFAULT '0',
xcNewDay int(11) NOT NULL DEFAULT '0',
xcNote varchar(255) DEFAULT NULL,
xcFlag tinyint(1) NOT NULL DEFAULT '0',
PRIMARY KEY (xcId) */

module.exports = function (error, lines) {
  if (error) {
    return console.error('huston we have a problem...', error.message);
  }
  const init = [];
  let retVal = {};
  var re = /\((.*)\)/

  retVal.xceptions = lines.reduce((acc, current, index, arr) => {
    //console.log(current)
    if(current.indexOf('INSERT') > -1){
      var items = re[Symbol.match](current)
      var result = items[1].split(',')
      var xception = {
        xcId: Number(result[0]),
        xcYear: Number(result[1]),
        xcMonth: Number(result[2]),
        xcDay: Number(result[3]),
        xcNewMonth: Number(result[4]),
        xcNewDay: Number(result[5]),
        xcNote: result[6].trim().replace(/\'/g, ''),
        xcFlag: Number(result[7])
      }
      acc.push(xception)
    }
   
    return acc;
  }, []);
  // console.log(JSON.stringify(retVal, null, ' '))
  return retVal;
};

const saints = require('../data/saints.json');

module.exports.ChurchDate = function (year, month, day) {
  const configured = false;
  const yearVal = (year != undefined) ? year : new Date().getFullYear();
  const monthval = (month != undefined) ? month - 1 : new Date().getMonth();
  const dayVal = (day != undefined) ? day : new Date().getDate();
  const newStyle = new Date(yearVal, (monthval), dayVal);
  const oldStyle = new Date(newStyle.valueOf() - (86400000 * 13));
  const getDay = function () {
    return newStyle.getDate();
  };
  const isAlleluiaDay = function () {
    return false;
  };
  const isFeastOfMaster = function () {
    return false;
  };
  const scriptureReading = function () {
    return '';
  };
  const toneOfWeek = function () {
    return 1;
  };
  const saintOfDay = function () {
    return '';
  };
  const saintsCommemorated = function () {
    return saints.list.filter(x => (x.month == newStyle.getMonth() + 1) && (x.day == newStyle.getDate()));
  };
  return {
    getDay,
    isAlleluiaDay,
    isFeastOfMaster,
    scriptureReading,
    toneOfWeek,
    saintOfDay,
    saintsCommemorated,
  };
};


// module.exports.sayIt =  function(){
//   console.log('johnny')
// }

var saints = require('../data/saints.json')

module.exports.ChurchDate = function(year, month, day){
  var configured = false;
  var yearVal = (year != undefined)? year : new Date().getFullYear();
  var monthval = (month != undefined)? month -1 : new Date().getMonth();
  var dayVal = (day != undefined)? day : new Date().getDate()
  var newStyle = new Date(yearVal, (monthval), dayVal)
  var oldStyle = new Date(newStyle.valueOf() - (86400000*13))
  var getDay = function(){
    return newStyle.getDate()
  }
  var isAlleluiaDay = function(){
    return false;
  }
  var isFeastOfMaster = function(){
    return false;
  }
  var scriptureReading = function(){
    return "";
  }
  var toneOfWeek = function(){
    return 1;
  }
  var saintOfDay = function(){
    return "";
  }
  var saintsCommemorated = function(){
    return saints.list.filter(x => (x.month == newStyle.getMonth()+1)&&(x.day == newStyle.getDate()));
  }
  return{
    getDay: getDay,
    isAlleluiaDay: isAlleluiaDay,
    isFeastOfMaster: isFeastOfMaster,
    scriptureReading: scriptureReading,
    toneOfWeek: toneOfWeek,
    saintOfDay: saintOfDay,
    saintsCommemorated: saintsCommemorated
  }
}


// module.exports.sayIt =  function(){
//   console.log('johnny')
// }

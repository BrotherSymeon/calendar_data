

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
  var isAlleluiaDay(){
    return false;
  }
  var isFeastOfMaster(){
    return false;
  }
  var scriptureReading(){
    return "";
  }
  var toneOfWeek(){
    return 1;
  }
  var saintOfDay(){
    return "";
  }
  var saintsCommemorated(){
    return [];
  }
  return{
    config: config,
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

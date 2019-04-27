const milliSecsInADay = 86400000;


module.exports.dayDiff = function(day1, day2){

	return (day1 - day2) / milliSecsInADay;
}
module.exports.addDay = function(date,num){
	return new Date(date.valueOf() + (milliSecsInADay * num) )
}

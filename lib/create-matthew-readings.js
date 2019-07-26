/**
 * here we create a file that has the Weekday gospel readings
 * of 11 through 16th? week of Matthew
 */

 var movable = require('../output/movable-calendar');
 var fs = require('fs')

 var takeGospel = false;
 
 var matthewGospels = movable.reduce((acc, cur, idx, arr) => {
  
  if(cur.name === "Monday:  Day of the Holy Spirit"){ takeGospel = true}
  if(acc.length < (16 * 6) && takeGospel && !cur.name.includes("Sunday")){
    var reading = {}
    reading.name = cur.name
    reading.gospel = cur.gospel
    acc.push(reading)
  }
  return acc

 }, [])

 console.log(matthewGospels)
 console.log(`there are ${matthewGospels.length / 6} weeks of gospel readings over here`)

 fs.writeFile('matthew-readings.js', '\n\nmodule.exports = ' + JSON.stringify(matthewGospels, null, ' '), 'utf8', (err) => {
   if(err) throw err
   console.log('the matthew-readings.js file was created. :-)')
 });
/**
 * this file will ta\ke in output/commemarationData.js and output
 * it as an object that looks like this.
 * It will ONLY contain commemerated saints and NOT the saints of the
 * day. Saints of the day will be output to another file
 *
 * {
 *   0101: [
 *    {description: 'St Patrick'},
 *    {description: 'St Nena enlightener of the Georgians'}
 *   ],
 *   0102: [
 *    {description: 'blah'}
 *   ]
 * }n
 *
 */
var fs = require('fs')
var saintData = require('../../output/commemarationData')
var outputfile = '../../output/commemaration_indexed_by_date.js'

var output = {}

saintData.saints.forEach((item) => {
  if(!item.sod){
    var key = String(item.month) + '-' + String(item.day)
    if(!output[key]){
      output[key] = []
    }
    output[key].push({
      month: item.month,
      day: item.day,
      description: item.description
    })
  }

})


fs.open(outputfile, 'w', (err, fd) => {
  if(err){
    return console.log(err)
  }
  fs.writeSync(fd, '\n\nmodule.exports = '+ JSON.stringify(output, null, ' '));
})

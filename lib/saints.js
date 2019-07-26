/**
 * createdOn: 7-9-2019
 * createdBy: Fr. Innocent
 * this takes the commemarationData out put
 * and divedes it into two lists indexed by Month-Day
 */

const commemerated = require('../output/commemarationData')

const indexedSod = commemerated.saints.reduce((accum, value) => {
  var month = value.month
  var day = value.day
  var key = `${month}-${day}`
  if(value.sod){
    if(!accum[key]){
      accum[key] = value
    }
  }
  return accum
}, {})


const commemeratedSaints = commemerated.saints.reduce((accum, value) => {
  var month = value.month
  var day = value.day
  var key = `${month}-${day}`
  if(!value.sod){
    if(!accum[key]){
      accum[key] = []
    }
    accum[key].push(value)
  }
  return accum
}, {})


module.exports.indexedSod = indexedSod
module.exports.commemeratedSaints = commemeratedSaints

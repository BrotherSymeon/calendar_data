module.exports = function (error, lines) {
  if (error) {
    return console.error('huston we have a problem...', error.message);
  }
  const init = [];
  let retVal = [];
  var re = /\((.*)\)/
  var i = 0;
  retVal = lines.reduce((acc, current, index, arr) => {
    //console.log(current)
    var newString = ''
    if(current.indexOf('insert') > -1){
      var items = re[Symbol.match](current)
      var chars = Array.from(items[1])
      var areBetweenQuotes = false
      chars.forEach(function(character){
        if(character === "'"){
          areBetweenQuotes = !areBetweenQuotes
        }
        if(character === ',' && (areBetweenQuotes === false)){
          character = '|'
        }
        newString += character
      })
      acc.push(newString)
    }
    return acc;
    
  }, []);
  // console.log(JSON.stringify(retVal, null, ' '))
  return retVal;
};
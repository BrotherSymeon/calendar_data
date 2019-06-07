

/** this takes the raw data and parses out the 
 * scripture reference. 
 */
function parseScriptureReference(ref){
  // return something like this   
  // {
  //   begin:{book: 'gen', chapter: 2, verse: 2},
  //   end:  {book: 'gen', chapter: 2, verse: 15}
  // }


  var items = []
  var book = ''
  var retArray = [] 
  var readings = ref.split(';')
  readings.forEach(function(reading, index, readings){
      if(reading.trim().length === 0 ){ return null}
    book = (reading.substring(0, reading.indexOf(' ')).trim().length > 0)? reading.substring(0, reading.indexOf(' ')).trim() : book; // gets the book at the beginning
    var chapverse = reading.substring(reading.indexOf(' ')) //gets the rest
    var chapter
    chapverse.split('-').forEach(function(value, index, arr){
      if(value.split('.').length > 1){ 
        chapter = value.split('.')[0]
        verse = value.split('.')[1]
      }else{
        verse = value.split('.')[0]
      }
      
      items.push({book: book, chapter: Number( chapter), verse: Number( verse )})
    })

    if(items.length === 2){
      retArray.push( {
        begin: items[0],
        end: items[1]
      })
    }else{
      retArray.push( {
        begin: items[0],
        end: items[0]
      })
    }
    //clear items array
      items = []
  })

  return retArray
}

module.exports =  parseScriptureReference

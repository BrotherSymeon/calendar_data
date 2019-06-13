const _ = require('lodash')


function slugify(stringVal){
  const stringArray = _.toArray(stringVal)
  return stringArray.reduce((acc, value) => {
    let val = value + ''
    if(val.trim().length === 0){return acc.concat('-')}else{return acc.concat(String(val))}
  },[]).join('')
}
/** this takes the raw data and parses out the
 * scripture reference.
 */
function parseScriptureReference(ref) {
  // return something like this
  // {
  //   begin:{book: 'gen', chapter: 2, verse: 2},
  //   end:  {book: 'gen', chapter: 2, verse: 15}
  // }
  if (ref === undefined) { return []; }
  //ref = ref.replace(/,/g, ';')
  let items = [];
  let book = '';
  let chapter = 0;
  const retArray = [];
  const readings = ref.split(';');
  readings.forEach((reading, index, readings) => {
    if (reading.trim().length === 0) { return null; }
    book = (reading.substring(0, reading.indexOf(' ')).trim().length > 0) ? reading.substring(0, reading.indexOf(' ')).trim() : book; // gets the book at the beginning
    const chapverse = reading.substring(reading.indexOf(' ')); // gets the rest
    
    chapverse.split('-').forEach((value, index, arr) => {
      if (value.split('.').length > 1) {
        chapter = value.split('.')[0];// || chapter;
        verse = value.split('.')[1];
      } else {
        verse = value.split('.')[0];
      }

      items.push({ book, chapter: Number(chapter), verse: Number(verse) });
    });

    if (items.length === 2) {
      retArray.push({
        begin: items[0],
        end: items[1],
      });
    } else {
      retArray.push({
        begin: items[0],
        end: items[0],
      });
    }
    // clear items array
    items = [];
  });

  return retArray;
}


module.exports = {
  parseScriptureReference,
  slugify
}

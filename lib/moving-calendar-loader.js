/**
 * Created by innocent on 6/6/19.
 */

const helper = require('./parsingHelper');


module.exports = function (error, lines) {
  if (error) {
    return console.error('huston we have a problem...', error.message);
  }
  const init = [];
  let retVal = {};
  retVal.data = lines.reduce((acc, current, index, arr) => {
    let isDay = false;
    const [name, ot, epistle, gospel] = current.split('\t');
    if (current.substring(0, 1).trim().length === 1) { isDay = true; }


    const day = {
      name: name.trim(),
      ot: helper.parseScriptureReference(ot),
      epistle: helper.parseScriptureReference(epistle),
      gospel: helper.parseScriptureReference(gospel),
    };
    if (isDay) {
      acc[acc.length] = day;
    } else {
      acc[acc.length - 1][ helper.slugify(name.trim().toLowerCase())] = { ot: day.ot, epistle: day.epistle, gospel: day.gospel };
    }

    return acc;
  }, init);
  // console.log(JSON.stringify(retVal, null, ' '))
  return retVal;
};

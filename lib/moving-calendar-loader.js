/**
 * Created by innocent on 6/6/19.
 */

const parseScriptureReference = require('./parsingHelper')


module.exports = function(error, lines){
    if(error){
       return console.error('huston we have a problem...', error.message)
    }
    const init = []
    const retVal = {}
    retVal.data =  lines.reduce(function(acc, current, index, arr){
        const [name, ot, epistle, gospel] = current.split('\t')
        if(name.substring(0, 1).trim().length === 1){ isDay = true}

        const day = {
            name: name.trim(),
            ot: parseScriptureReference(ot),
            epistle: parseScriptureReference(epistle),
            gospel: parseScriptureReference(gospel)
        }
        if(isDay){
            acc[acc.length] = day
        }else{
            acc[acc.length-1][name] = day
        }

        return acc
    }, init)
    //console.log(JSON.stringify(retVal, null, ' '))
    return retVal

}


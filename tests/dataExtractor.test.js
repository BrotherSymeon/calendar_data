
var assert = require('assert')
var extractor = require('../lib/fileReader');


const conf = {
  inFile: './data/commemarationData.txt',
  outFile: './data/commemarationData.json',
}

describe('extractor', function(){
  it('#config should take a config object', function(){


    extractor.config(conf);
    
    assert.equal(extractor.getConfig().inFile, conf.inFile)
    assert.equal(extractor.getConfig().outFile, conf.outFile)
  
  }),
  it('#run should call our callback', function(done){
    extractor.config(conf); 
    extractor.run(function(err, lines){
      assert.equal((lines.length > 0), true)
      done()
      var ret = ['john', 'mary', 'jane'];
      return ret;
      
    })
  })


});


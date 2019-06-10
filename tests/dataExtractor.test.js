
const assert = require('assert');
const extractor = require('../lib/fileReader');


const conf = {
  inFile: './data/commemarationData.txt',
  outFile: './data/commemarationData.json',
};

describe('extractor', () => {
  it('#config should take a config object', () => {
    extractor.config(conf);

    assert.equal(extractor.getConfig().inFile, conf.inFile);
    assert.equal(extractor.getConfig().outFile, conf.outFile);
  }),
  it('#run should call our callback', (done) => {
    extractor.config(conf);
    extractor.run((err, lines) => {
      assert.equal((lines.length > 0), true);
      done();
      const ret = ['john', 'mary', 'jane'];
      return ret;
    });
  });
});

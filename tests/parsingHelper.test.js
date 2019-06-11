const parseScriptureReference = require('../lib/parsingHelper');

const { assert } = require('chai');

describe('#parseScriptureReference', () => {
  it('should return something not null', () => {
    const input = 'Mk 10.46-52';
    const actual = parseScriptureReference(input)[0];
    // console.log(JSON.stringify(actual, null, ' '))
    assert.equal(actual.begin.book, 'Mk', 'the gospel book of Mark');
    assert.equal(actual.begin.chapter, 10, 'Huston... we have a chapter');
    assert.equal(actual.begin.verse, 46, 'and the proverbial verse');
  });
  it('should parse out refs across chapters', () => {
    // 1Pt 2.21-3.9
    debugger;
    const input = '1Pt 2.21-3.9';
    const actual = parseScriptureReference(input)[0];
    // console.log(JSON.stringify(actual, null, ' '))
    assert.equal(actual.begin.book, '1Pt', 'should be 1st peter');
    assert.equal(actual.begin.chapter, 2, 'should be chapter 2');
    assert.equal(actual.begin.verse, 21, 'and verse 21');

    assert.equal(actual.end.book, '1Pt', 'should be 1st peter');
    assert.equal(actual.end.chapter, 3, 'should be chapter 3');
    assert.equal(actual.end.verse, 9, 'should be verse 9');
  });
  it('should parse when commas are used', () => {
    const input = 'Zech 14.1, 4, 8-11';
    const actual = parseScriptureReference(input);
    console.log(actual)
    assert.equal(actual.length, 3, 'there should be three');
    assert.equal(actual[0].begin.book, 'Zech', 'should be Zech');
    assert.equal(actual[0].begin.chapter, 14, 'should be chapter 14');
    assert.equal(actual[0].begin.verse, 1, 'should begin with verse 1');
    assert.equal(actual[0].end.book, 'Zech', 'should be Zech');
    assert.equal(actual[0].end.chapter, 14, 'should be chapter 14');
    assert.equal(actual[0].end.verse, 1, 'should begin with verse 1');

    assert.equal(actual[1].begin.book, 'Zech', 'should be Zech');
    assert.equal(actual[1].begin.chapter, 14, 'should be chapter 14');
    assert.equal(actual[1].begin.verse, 4, 'should begin with verse 1');
    assert.equal(actual[1].end.book, 'Zech', 'should be Zech');
    assert.equal(actual[1].end.chapter, 14, 'should be chapter 14');
    assert.equal(actual[1].end.verse, 4, 'should begin with verse 1');

    assert.equal(actual[2].begin.book, 'Zech', 'should be Zech');
    assert.equal(actual[2].begin.chapter, 14, 'should be chapter 14');
    assert.equal(actual[2].begin.verse, 8, 'should begin with verse 1');
    assert.equal(actual[2].end.book, 'Zech', 'should be Zech');
    assert.equal(actual[2].end.chapter, 14, 'should be chapter 14');
    assert.equal(actual[2].end.verse, 11, 'should begin with verse 1');

  })
  it('should parse wackout stuff like this', () => {
    // Lk 22.39-42; 22.45-23.1
    // 1Pt 1.1-2; 1.10-12; 2.6-10
    debugger;
    const input = '1Pt 1.1-2; 1.10-12; 2.6-10';
    const actual = parseScriptureReference(input);
    assert.equal(actual.length, 3, 'there should be three here');
    assert.equal(actual[0].begin.book, '1Pt', 'should be first Peter');
    assert.equal(actual[0].begin.chapter, 1, 'should be the first chapter');
    assert.equal(actual[0].begin.verse, 1, 'should be the first verse');

    // end
    assert.equal(actual[0].end.book, '1Pt', 'should be first Peter');
    assert.equal(actual[0].end.chapter, 1, 'should be the first chapter');
    assert.equal(actual[0].end.verse, 2, 'should be the second verse');

    assert.equal(actual[1].begin.book, '1Pt', 'should be first Peter');
    assert.equal(actual[1].begin.chapter, 1, 'should be the first chapter');
    assert.equal(actual[1].begin.verse, 10, 'should be the tenth verse');
    // end
    assert.equal(actual[1].end.book, '1Pt', 'should be first Peter');
    assert.equal(actual[1].end.chapter, 1, 'should be the first chapter');
    assert.equal(actual[1].end.verse, 12, 'should be the twelfth verse');

    assert.equal(actual[2].begin.book, '1Pt', 'should be first Peter');
    assert.equal(actual[2].begin.chapter, 2, 'should be the second chapter');
    assert.equal(actual[2].begin.verse, 6, 'should be the sixth verse');
    // end
    assert.equal(actual[2].end.book, '1Pt', 'should be first Peter');
    assert.equal(actual[2].end.chapter, 2, 'should be the second chapter');
    assert.equal(actual[2].end.verse, 10, 'should be the twelfth verse');
  });
});


const { indexedSod, commemeratedSaints } = require('../lib/commemaration-to-saints-loader')

const { assert } = require('chai')

describe('commemaration to saints loader', function(){
  it('indexedSod should be an object with 365 keys', function(){
    var actualCount = Object.keys(indexedSod).length
    assert.equal(actualCount, 365, "should have 365 days worth of saints")

  })
  it('indexedSod should allow you you get one saint of the day by Month-Day', function(){
    var item = indexedSod['12-1']
    assert.exists(item, 'there should be an item here')
    assert.equal(item.month, 12, 'should be the first month')
    assert.equal(item.day, 1, 'should be day one')

  })
  it('commemeratedSaints should be an object with 365 keys', function(){
    var actualCount = Object.keys(commemeratedSaints).length
    assert.equal(actualCount, 365, 'we should have 365 days worth of commemerated saints')
  })
  it('commemeratedSaints should allow you to get one days worth of commemeratedSaints by MONTH-DAY', function(){
    var item = commemeratedSaints['12-1']
    assert.exists(item, 'there should be an item here')
    assert.isArray(item, 'this returns an array of commemerated saints')
    assert.isAtLeast(item.length, 0, 'the length of the resultat array should be more than zero')
  })

})

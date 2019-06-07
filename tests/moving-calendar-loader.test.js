/**
 * Created by innocent on 6/6/19.
 */

const assert = require('chai').assert
const load = require('../lib/moving-calendar-loader')

describe('moving-calendar-loader load function', function () {
    it('should return an object', function(){
        const data = dataset1();
        assert.equal(data.length, 6, "there should be six items to parse")
        const actual = load(null, data)
        assert.equal(actual.data.length, 6, "it should return 6 items")
    })

})








function dataset1(){
  return [ 'The Resurrection of Christ, the Passover (Pascha) of the Lord:  Easter	 	Ac 1.1-8	Jn 1.1-17',
    'Bright Monday	 	Ac 1.12-17; 1.21-26	Jn 1.18-28',
    'Bright Tuesday	 	Ac 2.14-21	Lk 24.12-35',
    'Bright Wednesday	 	Ac 2.22-36	Jn 1.35-51',
    'Bright Thursday	 	Ac 2.38-43	Jn 3.1-15',
    'Bright Friday	 	Ac 3.1-8	Jn 2.12-22']
}
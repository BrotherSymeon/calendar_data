/**
 * Created by innocent on 6/6/19.
 */

const { assert } = require('chai');
const load = require('../lib/moving-calendar-loader');

describe('moving-calendar-loader load function with  dataset1', () => {
  it('should return an object with a length of 6', () => {
    const data = dataset1();
    assert.equal(data.length, 6, 'there should be six items to parse');
    const actual = load(null, data);
    assert.equal(actual.data.length, 6, 'it should return 6 items');
  });
});

describe('moving-calendar-loader load function with  dataset2', () => {
  it('should return an object with a length of 6', () => {
    const data = dataset2().slice(0, 9);
    assert.equal(data.length, 9, 'there should be six items to parse');
    const actual = load(null, data);
    assert.equal(actual.data.length, 6, 'it should return 6 items');
    console.log(actual.data);
    assert.equal(actual.data[5].epistle[0].end.book, 'Ac', 'should match');

    assert.equal(actual.data[5].epistle[0].end.chapter, 20, 'should match');

    assert.equal(actual.data[5].epistle[0].end.verse, 18, 'should match');
  });
});


function dataset2() {
  return ['Tuesday	 	Ac 17.19-28	Jn 12.19-36',
    'Wednesday	 	Ac 18.22-28	Jn 12.36-47',
    'Thursday:  The Ascension of Our Lord',
    '   Vespers	Isa 2.1-3;Isa 62.10-63.9;Zech 14.1;Zech 14.4;Zech 14.8-11',
    '   Matins	 	 	Mk 16.9-20',
    '   Liturgy	 	Ac 1.1-12	Lk 24.36-53',
    'Friday	 	Ac 19.1-8	Jn 14.1-11',
    'Saturday	 	Ac 20.7-12	Jn 14.10-21',
    'Seventh Sunday of Pascha:  Sunday of the Fathers of the First Ecumenical Council	 	Ac 20.16-18; 20.28-36	Jn 17.1-13',
    'Seventh Week of Pascha'];
}

function dataset3() {
  return ['First Sunday after Pentecost:  Sunday of All Saints',
    '   Vespers	Isa 43.9-14;Wis 3.1-9;Wis 5.15-6.3',
    '   Liturgy	 	Heb 11.33-12.2	Mt 10.32, 33, 37, 38; 19.27-30',
    'Monday	 	Rom 2.28-3.18	Mt 6.31-34; 7.9-11',
    'Tuesday	 	Rom 4.4-12	Mt 7.15-21',
    'Wednesday	 	Rom 4.13-25	Mt 7.21-23',
    'Thursday	 	Rom 5.10-16	Mt 8.23-27',
    'Friday	 	Rom 5.17-6.2	Mt 9.14-17',
    'Saturday	 	Rom 3.19-26	Mt 7.1-8'];
}


function dataset1() {
  return ['The Resurrection of Christ, the Passover (Pascha) of the Lord:  Easter	 	Ac 1.1-8	Jn 1.1-17',
    'Bright Monday	 	Ac 1.12-17; 1.21-26	Jn 1.18-28',
    'Bright Tuesday	 	Ac 2.14-21	Lk 24.12-35',
    'Bright Wednesday	 	Ac 2.22-36	Jn 1.35-51',
    'Bright Thursday	 	Ac 2.38-43	Jn 3.1-15',
    'Bright Friday	 	Ac 3.1-8	Jn 2.12-22'];
}

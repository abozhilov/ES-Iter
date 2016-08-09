require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('cycle', () => {
    it('indefinitely yields all of the elements of iterable', () => {
        let iter = Iter.zip(Iter.cycle(Iter.range(5)), Iter.range(25));
        
        let j = 0;
        for (let [i, v] of iter) {
            expect(i).toBe(j++ % 5);
        }
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = Iter.range(20);
        
        for (let i of Iter.cycle(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

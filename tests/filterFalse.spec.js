require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('filterFalse', () => {
    it('filters values for which callback returns true', () => {
        let res = [...new Iter([1, 0, 2, 0, 0]).filterFalse((x) => x > 0)];
        
        expect(res.length).toBe(3);
    })
    
    it('uses Boolean built in if callback is not supplied', () => {
        let res = [...new Iter([1, 0, 2, 0, 0]).filterFalse()];
        
        expect(res.length).toBe(3);        
    })
    
    it('throws TypeError if argument is not iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.filterFalse.call(null);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })

    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield 1;
        });
        
        for (let i of iter.filterFalse()) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

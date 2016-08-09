require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('compress', () => {
    it('filters data returning only those that have a corresponding element in selectors that evaluates to true', () => {
        let result = ['A', 'C', 'E', 'F'];
        
        for (let [i, v] of new Iter('ABCDEF').compress([1,0,1,0,1,1]).enumerate()) {
            expect(v).toBe(result[i]);
        }
    })
    
    it('stops when either the data or selectors iterables are empty or exhausted', () => {
        let res1 = [...new Iter([]).compress([1, 1, 1, 1])];
        let res2 = [...new Iter([1, 1, 1, 1]).compress([])];
        
        expect(res1.length).toBe(0);
        expect(res2.length).toBe(0);
    })
    
    it('throws TypeError if `this` is not iterable', () => {
        let err = {};
        try {
            Iter.prototype.compress.call(null);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if selectors is not iterable', () => {
        let err = {};
        try {
            new Iter([]).compress();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('closes iterators on abrupt exit', () => {
        function* gen(n) {
            for (let i = 0; i < n; i++) yield true;
        }
        
        let data = gen(5);
        let selectors = gen(10);
        
        for (let i of new Iter(data).compress(selectors)) {
            break;
        }
        
        expect([...data].length).toBe(0);
        expect([...selectors].length).toBe(0);
    })
})

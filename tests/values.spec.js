require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('values', () => {
    it('it yields values using Object.keys if obj has not `values` method', () => {
        let obj = {
            foo : 1,
            bar : 2
        };
        let arr = [];
        
        for (let i of Object.keys(obj)) {
            arr.push([obj[i]]);
        }
    
        let res = [...Iter.values(obj)];
        
        expect(res.join()).toBe(arr.join());
    })
    
    it('yields obj.values if obj has `values` method', () => {
        let arr = [1, 2, 3, 4];
        let map = new Map([[1, 1], [2, 2]]);
        let set = new Set([1, 2, 3]);
        
        expect([...Iter.values(arr)].join()).toBe([...arr].join());
        expect([...Iter.values(map)].join()).toBe([...map.values()].join());
        expect([...Iter.values(set)].join()).toBe([...set.values()].join());
    })
    
    it('throws TypeError if obj is not an object', () => {
        let err = {};
        
        try {
            Iter.values(null);
        }catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

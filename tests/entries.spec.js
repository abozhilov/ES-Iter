import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('entries', () => {
    it('it yields pair of [key, value] using Object.keys if object has not `entries` method', () => {
        let obj = {
            foo : 1,
            bar : 1
        };
        let arr = [];
        
        for (let i of Object.keys(obj)) {
            arr.push([i, obj[i]]);
        }
    
        let res = [...Iter.entries(obj)];
        
        expect(res.join()).toBe(arr.join());
    })
    
    it('yields obj.entries if obj has `entries` method', () => {
        let arr = [1, 2, 3, 4];
        let map = new Map([[1, 1], [2, 2]]);
        let set = new Set([1, 2, 3]);
        
        expect([...Iter.entries(arr)].join()).toBe([...arr.entries()].join());
        expect([...Iter.entries(map)].join()).toBe([...map.entries()].join());
        expect([...Iter.entries(set)].join()).toBe([...set.entries()].join());
    })
    
    it('throws TypeError if obj is not an object', () => {
        let err = {};
        
        try {
            Iter.entries(null);
        }catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

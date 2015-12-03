import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('keys', () => {
    it('it yields Object.keys if object has not `keys` method', () => {
        let obj = {
            foo : 1,
            bar : 1
        };
        let arr = Object.keys(obj);
        let res = [...Iter.keys(obj)];
        
        expect(res.join()).toBe(arr.join());
    })
    
    it('yields obj.keys if obj has `keys` method', () => {
        let arr = [1, 2, 3, 4];
        let map = new Map([[1, 1], [2, 2]]);
        let set = new Set([1, 2, 3]);
        
        expect([...Iter.keys(arr)].join()).toBe([...arr.keys()].join());
        expect([...Iter.keys(map)].join()).toBe([...map.keys()].join());
        expect([...Iter.keys(set)].join()).toBe([...set.keys()].join());
    })
    
    it('throws TypeError if obj is not an object', () => {
        let err = {};
        
        try {
            Iter.keys(null);
        }catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

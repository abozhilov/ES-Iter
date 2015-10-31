import './auto_mock_off';
import 'babel/polyfill';
import {toArray} from '../src/itertools';

describe('toArray', () => {
    it('returns empty array without arguments', () => {
        let res = toArray();
        
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(0);
    })
    
    it('converts list of iterables to dense array', () => {
        let arr = [1, 2, 3, 'A', 'B', 'C', 1, 2, 3],
            res = toArray([1, 2, 3], 'ABC', new Set([1, 2, 3]));
        
        expect(arr.length).toBe(9);
        
        for (let [i, v] of arr.entries()) {
            expect(v).toBe(res[i]);
        }
    })
    
    it('throws TypeError if argument is not iterable', () => {
        try {
            let res = toArray(654);
            expect(Array.isArray(res)).toBe(false);
        } catch(e) {
            expect(e instanceof TypeError).toBe(true);
        }
    })
})

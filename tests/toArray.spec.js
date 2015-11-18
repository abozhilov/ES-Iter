import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('toArray', () => {
    it('returns empty array without arguments', () => {
        let res = Iter.range().toArray();
        
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(0);
    })
    
    it('converts `this` to array', () => {
        let arr = [1, 2, 3, 'A', 'B', 'C', 1, 2, 3],
            res = new Iter(arr).toArray();
        
        expect(arr.length).toBe(9);
        
        for (let [i, v] of arr.entries()) {
            expect(v).toBe(res[i]);
        }
    })
    
    it('throws TypeError if `this` is not iterable', () => {
        try {
            let res = Iter.prototype.toArray.call(654);
            expect(Array.isArray(res)).toBe(false);
        } catch(e) {
            expect(e instanceof TypeError).toBe(true);
        }
    })
})

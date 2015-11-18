import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('accumulate', () => {
    it('does not yield anything if iterable is exhausted', () => {
        let res = [...new Iter([]).accumulate()];
        
        expect(res.length).toBe(0);
    })
    
    it('Throws TypeError with non iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.accumulate.call(545);
        }catch(e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('yields sum of elements without specified callback', () => {
        let res = [1, 3, 6, 10, 15];
            
        for (let [i, j] of Iter.range(1, 6).accumulate().zip(res)) {
            expect(i).toBe(j);
        }
    })
    
    it('yields factorial with specified callback', () => {
        let res = [1, 2, 6, 24, 120];
        
        for (let [i, j] of Iter.range(1, 6).accumulate((acc, x) => acc * x).zip(res)) {
            expect(i).toBe(j);
        }
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* gen(n) {
            for (let i = 0; i < n; i++) yield i;
        }(10));
        
        for (let i of iter.accumulate()) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('enumerate', () => {
    it('does not yield anything if iterable is exhausted', () => {
        let res = [...new Iter([]).enumerate()];
        
        expect(res.length).toBe(0);
    })
    
    it('Throws TypeError with non iterable `this`', () => {
        let err = {};
        
        try {
            Iter.prototype.call.enumerate(545);
        }catch(e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('always yields tupples [integer, value]', () => {
        let res = [...new Iter([1, 2, 3]).enumerate()];
        
        expect(res[0][0]).toBe(0);
        expect(res[0][1]).toBe(1);

        expect(res[1][0]).toBe(1);
        expect(res[1][1]).toBe(2);
        
        expect(res[2][0]).toBe(2);
        expect(res[2][1]).toBe(3);
    })
    
    it('if `start` is specified', () => {        
        for (let [i, j] of new Iter([1, 2, 3]).enumerate(1)) {
            expect(i).toBe(j);
        }
    })
    
    it('converts start to integer', () => {
        for (let [i, j] of new Iter([1, 2, 3]).enumerate(1.76)) {
            expect(i).toBe(j);
        }         
    })
    
    it('throws TypeError with non number start', () => {
        let err = {};
        
        try {
            new Iter([0, 1, 2]).enumerate(NaN)
        } catch (e) {
            err = e;
        }
        expect(err instanceof TypeError);
    })  
})

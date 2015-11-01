import './auto_mock_off';
import 'babel/polyfill';
import {zip} from '../src/itertools';

describe('zip', () => {
    function* gen(n) {
        for (let i = 0; i < n; i++) {
            yield n;
        }
    }
    
    it('packs array with length equal to number of iterables', () => {
        let arr = [...zip([1], [2], [3])];
        
        expect(Array.isArray(arr[0])).toBe(true);
        expect(arr[0].length).toBe(3);
    })
    
    it('does not yield anything with no arguments', () => {
        let arr = [...zip()];
        expect(arr.length).toBe(0);        
    })
    
    it('does not yield anything with zero length iterable', () => {
        let arr = [...zip([])];
        expect(arr.length).toBe(0);
    })
    
    it('stops when shortest iterable is exhausted', () => {
        let arr = [...zip(gen(3), gen(10))];
        
        expect(arr.length).toBe(3);
    }) 
    
    it('closes all closable iterators when is determinated shortest iterable', () => {
        let iter1 = gen(4),
            iter2 = gen(20),
            zipRes = [...zip(iter1, iter2)],
            res1 = [...iter1],
            res2 = [...iter2];
            
        expect(res1.length).toBe(0);
        expect(res2.length).toBe(0);
    })
    
    it('closes all closable iterators on abrupt exits', () => {
        let iter1 = gen(4),
            iter2 = gen(20);
        
        for (let [i, j] of zip(iter1, iter2)) {
            break;
        }
        
        let res1 = [...iter1],
            res2 = [...iter2];
            
        expect(res1.length).toBe(0);
        expect(res2.length).toBe(0);        
    })
    
    it('throws TypeError if argument is not iterable', () => {
        var err = {};
        
        try {
            zip([], null, 1234)
        } catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
})

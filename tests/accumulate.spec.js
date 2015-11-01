import './auto_mock_off';
import 'babel/polyfill';
import {accumulate, zip} from '../src/itertools';

describe('accumulate', () => {
    it('does not yield anything if iterable is exhausted', () => {
        let res = [...accumulate([])];
        
        expect(res.length).toBe(0);
    })
    
    it('Throws TypeError without arguments', () => {
        let err = {};
        
        try {
            accumulate();
        }catch(e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('Throws TypeError with non iterable', () => {
        let err = {};
        
        try {
            accumulate(545);
        }catch(e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('yields sum of elements without specified callback', () => {
        let res = [1, 3, 6, 10, 15];
            
        for (let [i, j] of zip(accumulate([1, 2, 3, 4, 5]), res)) {
            expect(i).toBe(j);
        }
    })
    
    it('yields factorial with specified callback', () => {
        let res = [1, 2, 6, 24, 120];
        
        for (let [i, j] of zip(accumulate([1, 2, 3, 4, 5], (acc, x) => acc * x), res)) {
            expect(i).toBe(j);
        }
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* gen(n) {
            for (let i = 0; i < n; i++) yield i;
        })(10);
        
        for (let i of accumulate(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

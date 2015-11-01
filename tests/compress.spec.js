import './auto_mock_off';
import 'babel/polyfill';
import {compress, enumerate} from '../src/itertools';

describe('compress', () => {
    it('filters data returning only those that have a corresponding element in selectors that evaluates to true', () => {
        let result = ['A', 'C', 'E', 'F'];
        
        for (let [i, v] of enumerate(compress('ABCDEF', [1,0,1,0,1,1]))) {
            expect(v).toBe(result[i]);
        }
    })
    
    it('stops when either the data or selectors iterables has been exhausted', () => {
        let res1 = [...compress([], [1, 1, 1, 1])];
        let res2 = [...compress([1, 1, 1, 1], [])];
        
        expect(res1.length).toBe(0);
        expect(res2.length).toBe(0);
    })
    
    it('throws TypeError if data is not iterable', () => {
        let err = {};
        try {
            compress();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if selectors is not iterable', () => {
        let err = {};
        try {
            compress([]);
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
        
        for (let i of compress(data, selectors)) {
            break;
        }
        
        expect([...data].length).toBe(0);
        expect([...selectors].length).toBe(0);
    })
})

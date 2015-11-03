import './auto_mock_off';
import 'babel/polyfill';
import {filter} from '../src/itertools';

describe('filter', () => {
    it('filters values for which callback returns false', () => {
        let res = [...filter([1, 0, 2, 3, 0], (x) => x > 0)];
        
        expect(res.length).toBe(3);
    })
    
    it('uses Boolean built in if callback is not supplied', () => {
        let res = [...filter([1, 1, 1, 0, 0])];
        
        expect(res.length).toBe(3);        
    })
    
    it('throws TypeError if argument is not iterable', () => {
        let err = {};
        
        try {
            filter();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })

    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield 1;
        })();
        
        for (let i of filter(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

import './auto_mock_off';
import 'babel/polyfill';
import {filterFalse} from '../src/itertools';

describe('filterFalse', () => {
    it('filters values for which callback returns true', () => {
        let res = [...filterFalse([1, 0, 2, 0, 0], (x) => x > 0)];
        
        expect(res.length).toBe(3);
    })
    
    it('uses Boolean built in if callback is not supplied', () => {
        let res = [...filterFalse([1, 1, 0, 0, 0])];
        
        expect(res.length).toBe(3);        
    })
    
    it('throws TypeError if argument is not iterable', () => {
        let err = {};
        
        try {
            filterFalse();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })

    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield 1;
        })();
        
        for (let i of filterFalse(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

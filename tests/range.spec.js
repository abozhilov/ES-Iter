import './auto_mock_off';
import 'babel/polyfill';
import {range} from '../src/itertools';

describe('range', () => {
    it('if end is omitted start=0, end = start', () => {
        let res = [...range(5)];
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(i);
        }
    })
    
    it('if end is omitted and start is negative generates negative range', () => {
        let res = [...range(-5)];
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(-i);
        }        
    })
    
    it('if step is omitted and start < end, step = 1', () => {
        let res = [...range(5, 10)];
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(5 + i);
        }     
    }) 
    
    it('if step is omitted and start > end, step = -1', () => {
        let res = [...range(10, 5)];
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(10 - i);
        }     
    })
    
    it('if step is omitted or Boolean(toInteger(step)) = false, step = 1 or -1 depends on start, end values', () => {
        let res1 = [...range(10, 5, 0)],
            res2 = [...range(5, 10, 0)],
            res3 = [...range(10, 5, NaN)], 
            res4 = [...range(5, 10, NaN)];
            
        for (let i = 0; i < res1.length; i++) {
            expect(res1[i]).toBe(10 - i);
            expect(res3[i]).toBe(10 - i);
        }
        
        for (let i = 0; i < res2.length; i++) {
            expect(res2[i]).toBe(5 + i);
            expect(res4[i]).toBe(5 + i);
        }
    })
    
    it('if start < end and step is negative integer does not yield anything', () => {
        let res = [...range(1, 5, -2)];
        expect(res.length).toBe(0);
    })
    
    it('if start > end and step is positive integer does not yield anything', () => {
        let res = [...range(5, 1, 2)];
        expect(res.length).toBe(0);        
    })
    
    it('always converts arguments to integers', () => {
        let res1 = [...range(2.3, -4.5, -1.5)],
            res2 = [...range(-4.5, 2.3, 1.5)];
            
        for (let i = 0; i < res1.length; i++) {
            expect(res1[i]).toBe(2 - i);
            expect(res2[i]).toBe(-4 + i);
        }            
    })
})

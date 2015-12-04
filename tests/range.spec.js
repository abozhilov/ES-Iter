import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('range', () => {
    it('if end is omitted start=0, end = start', () => {
        let res = [...Iter.range(5)];
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(i);
        }
    })
    
    it('if end is omitted and start is negative does not yield anything', () => {
        let res = [...Iter.range(-5)];
        expect(res.length).toBe(0);
    })
    
    it('if step is omitted step = 1', () => {
        let res = [...Iter.range(5, 10)];
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(5 + i);
        }     
    }) 
    
    it('if start > end does not yield anything', () => {
        let res = [...Iter.range(10, 5)];
        expect(res.length).toBe(0);    
    })
    
    it('if start > end and step is negative integer', () => {
        expect([...Iter.range(5, 1, -1)].length).toBe(4);        
        expect([...Iter.range(5, 0, -2)].length).toBe(3);        
    })
    
    it('if start > end and step is positive integer does not yield anything', () => {
        let res = [...Iter.range(5, 1, 2)];
        expect(res.length).toBe(0);        
    })
    
    it('always converts arguments to integers', () => {
        let res = [...Iter.range(-4.5, 2.3, 1.5)];
            
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(-4 + i);
        }            
    })
    
    it('throws RangeError if step is zero', () => {
        let err = {};
        try {
            Iter.range(1, 5, 0)
        } catch (e) {
            err = e;
        }
        expect(err instanceof RangeError).toBe(true);
    })
    
    it('throws TypeError if start is not a number', () => {
        let err = {};
        try {
            Iter.range('NaN', 10);
        } catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if end is not a number', () => {
        let err = {};
        try {
            Iter.range('NaN');
        } catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if step is not a number', () => {
        let err = {};
        try {
            Iter.range(1, 10, 'NaN');
        } catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
})

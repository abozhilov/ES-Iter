import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('rangeRight', () => {
    it('always generates the reversed result of `Iter.range`', () => {
        expect([...Iter.range(1, 9, 4)].reverse().join()).toBe([...Iter.rangeRight(1, 9, 4)].join());
        expect([...Iter.range(10)].reverse().join()).toBe([...Iter.rangeRight(10)].join());
        expect([...Iter.range(1, 90, 13)].reverse().join()).toBe([...Iter.rangeRight(1, 90, 13)].join());
        expect([...Iter.range(10, 9, 4)].reverse().join()).toBe([...Iter.rangeRight(10, 9, 4)].join());
        
        
        expect([...Iter.range(9, 1, -4)].reverse().join()).toBe([...Iter.rangeRight(9, 1, -4)].join());
        expect([...Iter.range(90, 1, -13)].reverse().join()).toBe([...Iter.rangeRight(90, 1, -13)].join());
        expect([...Iter.range(90, 10, -4)].reverse().join()).toBe([...Iter.rangeRight(90, 10, -4)].join());
    })    

    it('if end is omitted start=0, end = start', () => {
        let res = [...Iter.rangeRight(5)];
        for (let i = res.length - 1, j = 0;  i >= 0; i--, j++) {
            expect(res[j]).toBe(i);
        }
    })
    
    it('if end is omitted and start is negative does not yield anything', () => {
        let res = [...Iter.rangeRight(-5)];
        expect(res.length).toBe(0);
    })
    
    it('if step is omitted step = 1', () => {
        let res = [...Iter.rangeRight(5, 10)];
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(9 - i);
        }     
    }) 
    
    it('if step is omitted and start > end, does not yield anything', () => {
        let res = [...Iter.rangeRight(10, 5)];
        expect(res.length).toBe(0);    
    })
    
    it('if start > end does not yield anything', () => {
        let res = [...Iter.rangeRight(5, 1, 2)];
        expect(res.length).toBe(0);        
    })
    
    it('always converts arguments to integers', () => {
        let res = [...Iter.rangeRight(-4.5, 2.3, 1.5)];
            
        for (let i = 0; i < res.length; i++) {
            expect(res[i]).toBe(1 - i);
        }            
    })
    
    it('throws RangeError if step = 0', () => {
        let err = {};
        try {
            Iter.rangeRight(1, 5, 0)
        } catch (e) {
            err = e;
        }
        expect(err instanceof RangeError).toBe(true);
    })
    
    it('throws TypeError if start is not a number', () => {
        let err = {};
        try {
            Iter.rangeRight('NaN', 10);
        } catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if end is not a number', () => {
        let err = {};
        try {
            Iter.rangeRight('NaN');
        } catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if step is not a number', () => {
        let err = {};
        try {
            Iter.rangeRight(1, 10, 'NaN');
        } catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
})

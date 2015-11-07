import './auto_mock_off';
import 'babel/polyfill';
import {product, range} from '../src/itertools';

describe('product', () => {
    it('yields cartesian product of iterables', () => {
        expect([...product(range(10), range(5))].length).toBe(10 * 5);
        expect([...product(range(10), range(10), range(5))].length).toBe(10 * 10 * 5);
        
        let exp = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
        let res = [...product(range(1, 4), range(1, 4))];
           
        expect(res.join()).toBe(exp.join());
    })
    
    it('yields tupple with number of items equal to passed iterables', () => {
        for (let [i, v] of product(range(1, 5), range(1, 5))) {
            expect(i).toNotBe(undefined);
            expect(v).toNotBe(undefined);
        }
        
        for (let [i, v, j] of product(range(1, 5), range(1, 5), range(1, 5))) {
            expect(i).toNotBe(undefined);
            expect(v).toNotBe(undefined);
            expect(j).toNotBe(undefined);
        }
    })
    
    it('does not yield anything without arguments', () => {
        expect([...product()].length).toBe(0)
    })
    
    it('does not yield anything with single argument', () => {
        expect([...product([1, 2, 3])].length).toBe(0)
    })
    
    it('does not yield anything if there is empty or exhausted iterable', () => {
        expect([...product([1, 2, 3], [1, 2], [])].length).toBe(0)
        
        let iter = range(5);
        [...iter];
        expect([...product(iter, [1, 2, 3])].length).toBe(0)
    }) 
    
    it('throws error with non iterables', () => {
        let err = {};
        try {
            product(null);
        }catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
})

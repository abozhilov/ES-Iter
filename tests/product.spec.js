import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('product', () => {
    it('yields cartesian product of iterables', () => {
        expect([...Iter.range(10).product(Iter.range(5))].length).toBe(10 * 5);
        expect([...Iter.range(10).product(Iter.range(10), Iter.range(5))].length).toBe(10 * 10 * 5);
        
        let exp = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
        let res = [...Iter.range(1, 4).product(Iter.range(1, 4))];
           
        expect(res.join()).toBe(exp.join());
    })
    
    it('yields tupple with number of items equal to passed iterables', () => {
        for (let [i, v] of Iter.range(1, 5).product(Iter.range(1, 5))) {
            expect(i).toNotBe(undefined);
            expect(v).toNotBe(undefined);
        }
        
        for (let [i, v, j] of Iter.range(1, 5).product(Iter.range(1, 5), Iter.range(1, 5))) {
            expect(i).toNotBe(undefined);
            expect(v).toNotBe(undefined);
            expect(j).toNotBe(undefined);
        }
    })
    
    it('does not yield anything without arguments', () => {
        expect([...Iter.range(5).product()].length).toBe(0)
    })
    
    it('does not yield anything if there is empty or exhausted iterable', () => {
        expect([...new Iter([1, 2, 3]).product([1, 2], [])].length).toBe(0)
        
        let iter = Iter.range(5);
        [...iter];
        expect([...iter.product([1, 2, 3])].length).toBe(0)
    }) 
    
    it('throws error with non iterables', () => {
        let err = {};
        try {
            Iter.prototype.product(null);
        }catch(e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
})

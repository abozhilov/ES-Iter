import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('chain', () => {
    it('does not yield anything if iterable is exhausted', () => {
        let r = Iter.range(10);
        [...r];
        let res = [...r.chain()];
        
        expect(res.length).toBe(0);
    })
    
    it('Throws TypeError with non iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.chain.call(545);
        }catch(e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* gen(n) {
            for (let i = 0; i < n; i++) yield i;
        }(10));
        
        for (let i of iter.chain()) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
    
    it('iterates over every argument', () => {
        let res1 = [...Iter.range(1, 4).chain('ABC', new Set([1, 2, 3]))],
            res2 = [...new Iter([[1, 2, 3]]).chain(['ABC'], new Set([[1, 2, 3]]))];
        
        expect(res1.length).toBe(9);
        expect(res2.length).toBe(3);
    })
})

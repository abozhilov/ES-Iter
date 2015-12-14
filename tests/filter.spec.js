import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('filter', () => {
    it('filters values for which callback returns false', () => {
        let res = [...new Iter([1, 0, 2, 3, 0]).filter((x) => x > 0)];
        
        expect(res.length).toBe(3);
    })
    
    it('uses Boolean built in if callback is not supplied', () => {
        let res = [...new Iter([1, 1, 1, 0, 0]).filter()];
        
        expect(res.length).toBe(3);        
    })
    
    it('throws TypeError if `this` is not iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.filter.call(null);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })

    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield 1;
        });
        
        for (let i of iter.filter()) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

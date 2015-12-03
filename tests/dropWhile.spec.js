import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('dropWhile', () => {
    it('calls callback for every item while callback return true', () => {
        let x = 0;
        let res = [...new Iter([1, 1, 1, 0, 0, 0]).dropWhile((y) => {++x; return y})];
        expect(x).toBe(4);
        expect(res.length).toBe(3);
    })
    
    it('gets items after first non true return by callback', () => {
        let res = [...new Iter([1, 2, 3, 4, 5, 1]).dropWhile((x) => x <= 3)];
        
        expect(res.length).toBe(3);
    })
    
    it('uses Boolean built in if callback is not supplied', () => {
        let res = [...new Iter([1, 1, 0, 0]).dropWhile()];
        
        expect(res.length).toBe(2);        
    })
    
    it('throws TypeError if argument is not iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.dropWhile.call(null);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })

    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield 1;
        });
        
        for (let i of iter.dropWhile()) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

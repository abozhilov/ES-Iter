import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('drop', () => {
    
    it('drops N items from iterable', () => {
        expect([...new Iter([1, 2, 3, 4, 5]).drop(2)].length).toBe(3);
    })
    
    it('drops all items if n is not specified', () => {
        expect([...new Iter([1, 2, 3, 4, 5]).drop()].length).toBe(0);
    }) 
    
    it('throws TypeError if `this` is not iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.drop.call(null);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield i;
        });
        
        for (let i of iter.drop()) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

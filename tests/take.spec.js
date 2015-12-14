import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('take', () => {
    
    it('takes N items from iterable', () => {
        expect([...Iter.range(5).take(2)].length).toBe(2);
    })
    
    it('takes all items if n is not specified', () => {
        expect([...Iter.range(5).take()].length).toBe(5);
    }) 
    
    it('throws TypeError if `this` is not iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.take.call(345);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator after n items consumed', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield i;
        });
        
        for (let i of iter.take(2)) {

        }
        
        expect([...iter].length).toBe(0);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield i;
        });
        
        for (let i of iter.take(2)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

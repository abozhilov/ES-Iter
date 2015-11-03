import './auto_mock_off';
import 'babel/polyfill';
import {take} from '../src/itertools';

describe('take', () => {
    
    it('takes N items from iterable', () => {
        expect([...take([1, 2, 3, 4, 5], 2)].length).toBe(2);
    })
    
    it('takes all items if n is not specified', () => {
        expect([...take([1, 2, 3, 4, 5])].length).toBe(5);
    }) 
    
    it('throws TypeError if argument is not iterable', () => {
        let err = {};
        
        try {
            take();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator after n items consumed', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of take(iter, 2)) {

        }
        
        expect([...iter].length).toBe(0);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of take(iter, 2)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

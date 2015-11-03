import './auto_mock_off';
import 'babel/polyfill';
import {drop} from '../src/itertools';

describe('drop', () => {
    
    it('drops N items from iterable', () => {
        expect([...drop([1, 2, 3, 4, 5], 2)].length).toBe(3);
    })
    
    it('drops all items if n is not specified', () => {
        expect([...drop([1, 2, 3, 4, 5])].length).toBe(0);
    }) 
    
    it('throws TypeError if argument is not iterable', () => {
        let err = {};
        
        try {
            drop();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of drop(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

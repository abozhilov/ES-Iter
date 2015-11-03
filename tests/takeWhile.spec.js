import './auto_mock_off';
import 'babel/polyfill';
import {takeWhile} from '../src/itertools';

describe('takeWhile', () => {
    it('calls callback for every item while callback return thruty value', () => {
        let x = 0;
        let res = [...takeWhile([1, 2, 3, 4, 5, 0, 1], (y) => {++x; return y})];
        expect(x).toBe(6);
        expect(res.length).toBe(5);
    })
    
    it('gets item while callback return true', () => {
        let res = [...takeWhile([1, 2, 3, 4, 5], (x) => x < 3)];
        
        expect(res.length).toBe(2);
    })
    
    it('uses Boolean built in if callback is not supplied', () => {
        let res = [...takeWhile([1, 1, 0, 4, 5])];
        
        expect(res.length).toBe(2);        
    })
    
    it('throws TypeError if argument is not iterable', () => {
        let err = {};
        
        try {
            takeWhile();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator after n items consumed', () => {
        let iter = (function* (){
            yield* [1, 2, 3, 0, 1, 2];
        })();
        
        for (let i of takeWhile(iter)) {

        }
        
        expect([...iter].length).toBe(0);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of takeWhile(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

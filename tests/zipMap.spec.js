import './auto_mock_off';
import 'babel/polyfill';
import {zipMap, zip} from '../src/itertools';

describe('zipMap', () => {
    it('calls callback with number of arguments equal to number of iterables', () => {
        for (let i of zipMap([1], [2], [3], (...args) => expect(args.length).toBe(3))) {
            
        }
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of zipMap('ABC', 'DEF', () => ++x)) {
            expect(i).toBe(x);
        }
    })
    
    it('yields zipped tupples if callback is not specified', () => {
        expect([...zipMap([1, 2], [1, 2])].join()).toBe([...zip([1, 2], [1, 2])].join());
    })
    
    it('stops when the shortest iterable is exhausted', () => {
        let res = [...zipMap([1, 2, 3], [1, 2], [1, 2, 3], (x, y, z) => x)]
        
        expect(res.length).toBe(2);
    })
    
    it('does not yield anything without arguments', () => {
        let res = [...zipMap()];
        
        expect(res.length).toBe(0);
    })
    
    it('does not yield anything without iterables', () => {
        let res = [...zipMap(() => true)];
        
        expect(res.length).toBe(0);
    })
    
    it('throws TypeError if some argument is not iterable', () => {
        let err = {};
        
        try {
            zipMap(545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterators on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of zipMap(iter, (x) => x)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

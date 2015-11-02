import './auto_mock_off';
import 'babel/polyfill';
import {zipMap} from '../src/itertools';

describe('zipMap', () => {
    it('calls callback with number of arguments equal to number of iterables', () => {
        for (let i of zipMap((...args) => {
            expect(args.length).toBe(3)
        }, [1], [2], [3])) {
            
        }
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of zipMap(() => ++x, 'ABC', 'DEF')) {
            expect(i).toBe(x);
        }
    })
    
    it('stops when the shortest iterable is exhausted', () => {
        let res = [...zipMap((x, y, z) => x, [1, 2, 3], [1, 2], [1, 2, 3])]
        
        expect(res.length).toBe(2);
    })
    
    it('does not yield anything without iterables', () => {
        let res = [...zipMap(() => true)];
        
        expect(res.length).toBe(0);
    })
    
    it('throws TypeError if callback is not specified', () => {
        let err = {};
        
        try {
            zipMap();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if some argument is not iterable', () => {
        let err = {};
        
        try {
            zipMap((x) => x, 545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterators on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of zipMap((x) => x, iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

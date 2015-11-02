import './auto_mock_off';
import 'babel/polyfill';
import {longestZipMap} from '../src/itertools';

describe('longestZipMap', () => {
    it('calls callback with number of arguments equal to number of iterables', () => {
        for (let i of longestZipMap((...args) => {
            expect(args.length).toBe(3)
        }, [1], [2], [3])) {
            
        }
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of longestZipMap(() => ++x, 'ABC', 'DEF')) {
            expect(i).toBe(x);
        }
    })
    
    it('stops when the longest iterable is exhausted', () => {
        let res = [...longestZipMap((x, y, z) => x, [1], [1, 2], [1, 2, 3])]
        
        expect(res.length).toBe(3);
    })
    
    it('does not yield anything without iterables', () => {
        let res = [...longestZipMap(() => true)];
        
        expect(res.length).toBe(0);
    })
    
    it('throws TypeError if callback is not specified', () => {
        let err = {};
        
        try {
            longestZipMap();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if some argument is not iterable', () => {
        let err = {};
        
        try {
            longestZipMap((x) => x, 545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterators on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of longestZipMap((x) => x, iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

import './auto_mock_off';
import 'babel/polyfill';
import {longestZipMap, longestZip} from '../src/itertools';

describe('longestZipMap', () => {
    it('calls callback with number of arguments equal to number of iterables', () => {
        for (let i of longestZipMap([1], [2], [3], (...args) => {
            expect(args.length).toBe(3)
        })) {
            
        }
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of longestZipMap('ABC', 'DEF', () => ++x)) {
            expect(i).toBe(x);
        }
    })
    
    it('yields longest zipped tupples if callback is not specified', () => {
        expect([...longestZipMap([1, 2], [1, 2])].join()).toBe([...longestZip([1, 2], [1, 2])].join());
    })
    
    it('stops when the longest iterable is exhausted', () => {
        let res = [...longestZipMap([1], [1, 2], [1, 2, 3], (x, y, z) => x)]
        
        expect(res.length).toBe(3);
    })
    
    it('does not yield anything without iterables', () => {
        let res = [...longestZipMap(() => true)];
        
        expect(res.length).toBe(0);
    })
    
    it('does not yield anything without arguments', () => {
        let res = [...longestZipMap()];
        
        expect(res.length).toBe(0);
    })
    
    it('throws TypeError if some argument is not iterable', () => {
        let err = {};
        
        try {
            longestZipMap(545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterators on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield i;
        })();
        
        for (let i of longestZipMap(iter, (x) => x)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('zipMap', () => {
    it('calls callback with number of arguments equal to number of iterables', () => {
        for (let i of new Iter([1]).zipMap([2], [3], (...args) => expect(args.length).toBe(3))) {
            
        }
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of new Iter('ABC').zipMap('DEF', () => ++x)) {
            expect(i).toBe(x);
        }
    })
    
    it('yields zipped tupples if callback is not specified', () => {
        expect([...new Iter([1, 2]).zipMap([1, 2])].join()).toBe([...new Iter([1, 2]).zip([1, 2])].join());
    })
    
    it('stops when the shortest iterable is exhausted', () => {
        let res = [...new Iter([1, 2, 3]).zipMap([1, 2], [1, 2, 3], (x, y, z) => x)]
        
        expect(res.length).toBe(2);
    })
    
    it('does not yield anything without arguments', () => {
        let res = [...new Iter([1, 2]).zipMap()];
        
        expect(res.length).toBe(0);
    })
    
    it('does not yield anything without iterables', () => {
        let res = [...new Iter([1, 2]).zipMap(() => true)];
        
        expect(res.length).toBe(0);
    })
    
    it('throws TypeError if `this` is not iterable', () => {
        let err = {};
        
        try {
            Iter.prototype.zipMap.call(545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterators on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield i;
        });
        
        for (let i of iter.zipMap((x) => x)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

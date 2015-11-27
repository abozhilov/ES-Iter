import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('longZipMap', () => {
    it('calls callback with number of arguments equal to number of iterables', () => {
        for (let i of new Iter([1]).longZipMap([2], [3], (...args) => {
            expect(args.length).toBe(3)
        })) {
            
        }
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of new Iter('ABC').longZipMap('DEF', () => ++x)) {
            expect(i).toBe(x);
        }
    })
    
    it('yields longest zipped tupples if callback is not specified', () => {
        expect([...new Iter([1, 2]).longZipMap([1, 2])].join()).toBe([...new Iter([1, 2]).longZip([1, 2])].join());
    })
    
    it('stops when the longest iterable is exhausted', () => {
        let res = [...new Iter([1]).longZipMap([1, 2], [1, 2, 3], (x, y, z) => x)]
        
        expect(res.length).toBe(3);
    })
    
    it('throws TypeError if some argument is not iterable', () => {
        let err = {};
        
        try {
            new Iter([]).longZipMap(545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterators on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield i;
        });
        
        for (let i of iter.longZipMap((x) => x)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

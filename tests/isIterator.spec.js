import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('isIterator', () => {
    it('returns true with iterators', () => {
        let iter = {
            next() {},
            [Symbol.iterator]() {return this;}
        };
        
        expect(Iter.isIterator(iter)).toBe(true);
        expect(Iter.isIterator([][Symbol.iterator]())).toBe(true);
        expect(Iter.isIterator(''[Symbol.iterator]())).toBe(true);
        expect(Iter.isIterator((new Map)[Symbol.iterator]())).toBe(true);
        expect(Iter.isIterator((new Set)[Symbol.iterator]())).toBe(true);
    })
    
    it('returns false with object which not implements properly Iterator protocol', () => {
        let iter = {[Symbol.iterator]() {return this}}
        expect(Iter.isIterator(iter)).toBe(false);
    }) 
    
    it('returns false with non iterables', () => {
        expect(Iter.isIterator(Object.create(null))).toBe(false);
        expect(Iter.isIterator(546)).toBe(false);
    })
    
    it('returns false with iterable non iterators', () => {
        expect(Iter.isIterator([])).toBe(false);
        expect(Iter.isIterator('')).toBe(false);
        expect(Iter.isIterator(new Map)).toBe(false);
        expect(Iter.isIterator(new Set)).toBe(false);
    })
    
    it('returns false without arguments or null', () => {
        expect(Iter.isIterator()).toBe(false);
        expect(Iter.isIterator(null)).toBe(false);
    })
})

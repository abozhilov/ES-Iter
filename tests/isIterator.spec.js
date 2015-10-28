import './auto_mock_off';
import 'babel/polyfill';
import {isIterator} from '../src/itertools';

describe('isIterator', () => {
    it('returns true with iterators', () => {
        let iter = {
            next() {},
            [Symbol.iterator]() {return this;}
        };
        
        expect(isIterator(iter)).toBe(true);
        expect(isIterator([][Symbol.iterator]())).toBe(true);
        expect(isIterator(''[Symbol.iterator]())).toBe(true);
        expect(isIterator((new Map)[Symbol.iterator]())).toBe(true);
        expect(isIterator((new Set)[Symbol.iterator]())).toBe(true);
    })
    
    it('returns false with object which not implements properly Iterator protocol', () => {
        let iter = {[Symbol.iterator]() {return this}}
        expect(isIterator(iter)).toBe(false);
    }) 
    
    it('returns false with non iterables', () => {
        expect(isIterator(Object.create(null))).toBe(false);
        expect(isIterator(546)).toBe(false);
    })
    
    it('returns false with iterable non iterators', () => {
        expect(isIterator([])).toBe(false);
        expect(isIterator('')).toBe(false);
        expect(isIterator(new Map)).toBe(false);
        expect(isIterator(new Set)).toBe(false);
    })
    
    it('returns false without arguments or null', () => {
        expect(isIterator()).toBe(false);
        expect(isIterator(null)).toBe(false);
    })
})

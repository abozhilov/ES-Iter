import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('isIterable', () => {
    it('returns true if object is iterable', () => {
        expect(Iter.isIterable([1, 2, 3])).toBe(true);
        expect(Iter.isIterable('Test')).toBe(true);
        expect(Iter.isIterable(new Map)).toBe(true);
        expect(Iter.isIterable(new Set)).toBe(true);
    })
    
    it('returns true if object is iterator', () => {
        expect(Iter.isIterable([][Symbol.iterator]())).toBe(true);
        expect(Iter.isIterable(''[Symbol.iterator]())).toBe(true);
        expect(Iter.isIterable((new Map)[Symbol.iterator]())).toBe(true);
        expect(Iter.isIterable((new Set)[Symbol.iterator]())).toBe(true);
    })
    
    it('returns false if object is not iterable', () => {
        expect(Iter.isIterable(Object.create(null))).toBe(false);
        expect(Iter.isIterable(null)).toBe(false);
        expect(Iter.isIterable(undefined)).toBe(false);
        expect(Iter.isIterable(543)).toBe(false);
    })
})

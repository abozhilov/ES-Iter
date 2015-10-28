import './auto_mock_off';
import 'babel/polyfill';
import {isIterable} from '../src/itertools';

describe('isIterable', () => {
    it('returns true if object is iterable', () => {
        expect(isIterable([1, 2, 3])).toBe(true);
        expect(isIterable('Test')).toBe(true);
        expect(isIterable(new Map)).toBe(true);
        expect(isIterable(new Set)).toBe(true);
    })
    
    it('returns true if object is iterator', () => {
        expect(isIterable([][Symbol.iterator]())).toBe(true);
        expect(isIterable(''[Symbol.iterator]())).toBe(true);
        expect(isIterable((new Map)[Symbol.iterator]())).toBe(true);
        expect(isIterable((new Set)[Symbol.iterator]())).toBe(true);
    })
    
    it('returns false if object is not iterable', () => {
        expect(isIterable(Object.create(null))).toBe(false);
        expect(isIterable(null)).toBe(false);
        expect(isIterable(undefined)).toBe(false);
        expect(isIterable(543)).toBe(false);
    })
})

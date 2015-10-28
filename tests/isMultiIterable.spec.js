import './auto_mock_off';
import 'babel/polyfill';
import {isMultiIterable} from '../src/itertools';

describe('isMultiIterable', () => {
    let obj = {
        [Symbol.iterator]() {
            return {
                next() {
                    if (!this._counter) {
                        this._counter = true;
                        return {value: true, done: false};
                    }
                    else {
                        return {done: true}
                    }
                },
                [Symbol.iterator]() {
                    return this;
                }
            }
        }
    };
    
    it('returns true if obj[Symbol.iterator]() returns fresh iterator on every call', () => {
        let x = [...obj][0],
            y = [...obj][0];
        expect(isMultiIterable(obj)).toBe(true);
        expect(x).toBe(true);
        expect(y).toBe(true);
    });
    
    it('returns false if obj[Symbol.iterator]() returns same object every time', () => {
        let iter = obj[Symbol.iterator](),
            x = [...iter][0],
            y = [...iter][0];
        
        expect(isMultiIterable(iter)).toBe(false);
        expect(x).toBe(true);
        expect(y).toBe(undefined);
    });
    
    it('returns false with not iterable object', () => {
        expect(isMultiIterable(Object.create(null))).toBe(false);
    });
    
    it('returns false with no arguments', () => {
        expect(isMultiIterable()).toBe(false);
    });
})

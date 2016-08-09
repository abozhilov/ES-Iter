require('./auto_mock_off');
let Iter = require('../src/Iter');

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
        expect(Iter.isMultiIterable(obj)).toBe(true);
        expect(x).toBe(true);
        expect(y).toBe(true);
    });
    
    it('returns false if obj[Symbol.iterator]() returns same object every time', () => {
        let iter = obj[Symbol.iterator](),
            x = [...iter][0],
            y = [...iter][0];
        
        expect(Iter.isMultiIterable(iter)).toBe(false);
        expect(x).toBe(true);
        expect(y).toBe(undefined);
    });
    
    it('returns false with not iterable object', () => {
        expect(Iter.isMultiIterable(Object.create(null))).toBe(false);
    });
    
    it('returns false with no arguments', () => {
        expect(Iter.isMultiIterable()).toBe(false);
    });
})

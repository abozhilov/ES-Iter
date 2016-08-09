require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('isClosable', () => {
    it('returns true if Iterator implements return method', () => {
        let iter = {
            [Symbol.iterator]() {
                return this;
            },
            next() {},
            return() {}
        }
        expect(Iter.isClosable(iter)).toBe(true);
    })
    
    it('returns false with non iterators', () => {
        let nonIter = {
            next() {},
            return() {}
        }
        expect(Iter.isClosable(nonIter)).toBe(false);
        expect(Iter.isClosable([])).toBe(false);
        expect(Iter.isClosable(545)).toBe(false);
    })
    
    it('returns false without arguments or null', () => {
        expect(Iter.isClosable()).toBe(false);
        expect(Iter.isClosable(null)).toBe(false);
    })
})

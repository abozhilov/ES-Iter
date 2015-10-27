import '../auto_mock_off';
import 'babel/polyfill';
import {isClosable} from '../src/itertools';

describe('isClosable', () => {
    it('returns true if Iterator implements return method', () => {
        let iter = {
            [Symbol.iterator]() {
                return this;
            },
            next() {},
            return() {}
        }
        expect(isClosable(iter)).toBe(true);
    })
    
    it('returns false with non iterators', () => {
        let nonIter = {
            next() {},
            return() {}
        }
        expect(isClosable(nonIter)).toBe(false);
        expect(isClosable([])).toBe(false);
        expect(isClosable(545)).toBe(false);
    })
    
    it('returns false without arguments or null', () => {
        expect(isClosable()).toBe(false);
        expect(isClosable(null)).toBe(false);
    })
})

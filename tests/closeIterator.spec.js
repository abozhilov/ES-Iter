import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('closeIterator', () => {
    let closable = {
        [Symbol.iterator]() {
            return this;
        },
        
        next() {
            return {value: true, done: false}
        },
        
        return() {
            return {done: true}
        }
    }
        
    let iter = {
        [Symbol.iterator]() {
            return this;
        },
        
        next() {
            return {value: true, done: false}
        }    
    }
    
    let throwIter = {
        [Symbol.iterator]() {
            return this;
        },
        
        next() {
            return {value: true, done: false}
        },
        
        return() {
        }        
    }
    
    it('returns `done` property value of `return` method', () => {
        expect(Iter.closeIterator(closable)).toBe(true);
    }) 
    
    it('returns false with non-closable iterators', () => {
        expect(Iter.closeIterator(iter)).toBe(false);
    })
    
    it('returns false with non-iterators', () => {
        expect(Iter.closeIterator([])).toBe(false);
        expect(Iter.closeIterator('ABC')).toBe(false);
        expect(Iter.closeIterator(1234)).toBe(false);
    }) 
    
    it('returns false with no-arguments or null', () => {
        expect(Iter.closeIterator(null)).toBe(false);
        expect(Iter.closeIterator()).toBe(false);
    })
    
    it('throws error if `return` returns null or undefined', () => {
        try {
            Iter.closeIterator(throwIter)
        } catch(e) {
            expect(e instanceof TypeError).toBe(true);
        }
    })
})

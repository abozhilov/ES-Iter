import './auto_mock_off';
import 'babel/polyfill';
import {closeIterator} from '../src/itertools';

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
        expect(closeIterator(closable)).toBe(true);
    }) 
    
    it('returns false with non-closable iterators', () => {
        expect(closeIterator(iter)).toBe(false);
    })
    
    it('returns false with non-iterators', () => {
        expect(closeIterator([])).toBe(false);
        expect(closeIterator('ABC')).toBe(false);
        expect(closeIterator(1234)).toBe(false);
    }) 
    
    it('returns false with no-arguments or null', () => {
        expect(closeIterator(null)).toBe(false);
        expect(closeIterator()).toBe(false);
    })
    
    it('throws error if `return` returns null or undefined', () => {
        try {
            closeIterator(throwIter)
        } catch(e) {
            expect(e instanceof TypeError).toBe(true);
        }
    })
})

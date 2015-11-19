import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('closeAllIterators', () => {
    let iterable = {
        [Symbol.iterator]() {
            return {
                [Symbol.iterator]() {
                    return this;
                },
                
                next() {
                    return {value: true, done: false}
                },
                
                return() {
                    this.__IS_CLOSED__ = true;
                    return {done: true}
                }
            }
        }
    }
    
    it('must be called `return` method of each iterator', () => {
        let iter1 = Iter.getIterator(iterable), 
            iter2 = Iter.getIterator(iterable),
            iter3 = Iter.getIterator(iterable);
        
        Iter.closeAllIterators(iter1, iter2, iter3);
        
        expect(iter1.__IS_CLOSED__).toBe(true);
        expect(iter2.__IS_CLOSED__).toBe(true);
        expect(iter3.__IS_CLOSED__).toBe(true);
    }) 
    
})

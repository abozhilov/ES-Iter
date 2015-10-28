import './auto_mock_off';
import 'babel/polyfill';
import {getIterator} from '../src/itertools';

describe('getIterator', () => {
    it('throws an error with non-iterable objects', () => {
        try {
            getIterator(Object.create(null));
        }catch(e) {
            expect(e instanceof TypeError)
        }
    });
    
    it('throws an error with no arguments', () => {
        try {
            getIterator();
        }catch(e) {
            expect(e instanceof TypeError)
        }        
    })
    
    it('gets external iterator from iterable object', () => {
        let iter = getIterator([1]);
        expect(iter.next().value).toBe(1);
    });
    
    it('gets external iterator from iterator', () => {
        let iter = getIterator(getIterator([1, 2, 3]));
        expect(iter.next().value).toBe(1);
    })
});

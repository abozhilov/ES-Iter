import '../auto_mock_off';
import 'babel/polyfill';
import {getIterator} from '../src/itertools';

describe('getIterator', () => {
    it('Throws an error with non-iterable objects', () => {
        try {
            getIterator(Object.create(null));
        }catch(e) {
            expect(e instanceof TypeError)
        }
    });
    
    it('Throws an error with no arguments', () => {
        try {
            getIterator();
        }catch(e) {
            expect(e instanceof TypeError)
        }        
    })
    
    it('Gets external iterator from iterable object', () => {
        let iter = getIterator([1]);
        expect(iter.next().value === 1);
    });
    
    it('Gets external iterator from iterator', () => {
        let iter = getIterator(getIterator([1, 2, 3]));
        expect(iter.next().value === 1);
    })
});

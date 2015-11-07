import './auto_mock_off';
import 'babel/polyfill';
import {cycle, range, zip} from '../src/itertools';

describe('cycle', () => {
    it('indefinitely yields all of the elements of iterable', () => {
        let iter = zip(cycle(range(5)), range(25));
        
        let j = 0;
        for (let [i, v] of iter) {
            expect(i).toBe(j++ % 5);
        }
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = range(20);
        
        for (let i of cycle(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

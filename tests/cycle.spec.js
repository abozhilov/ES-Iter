import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('cycle', () => {
    it('indefinitely yields all of the elements of iterable', () => {
        let iter = Iter.cycle(Iter.range(5)).zip(Iter.range(25));
        
        let j = 0;
        for (let [i, v] of iter) {
            expect(i).toBe(j++ % 5);
        }
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = Iter.range(20);
        
        for (let i of Iter.cycle(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

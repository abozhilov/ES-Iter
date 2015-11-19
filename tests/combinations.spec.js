import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('combinations', () => {
        
    it('yields all combinations of r length', () => {
        expect([...new Iter('ABCDE').combinations(0)].length).toBe(1);
        expect([...new Iter('ABCDE').combinations(1)].length).toBe(5);
        expect([...new Iter('ABCDE').combinations(2)].length).toBe(5 * 4 / 2);
        expect([...new Iter('ABCDE').combinations(3)].length).toBe(5 * 4 * 3 / 6);
        expect([...new Iter('ABCDE').combinations(4)].length).toBe(5 * 4 * 3 * 2 / 24);
        expect([...new Iter('ABCDE').combinations(5)].length).toBe(1);
    })
    
    it('yields r length arrays', () => {
        for (let i of new Iter('ABCDE').combinations(3)) {
            expect(i.length).toBe(3);
        }
        for (let i of new Iter('ABCDE').combinations(4)) {
            expect(i.length).toBe(4);
        }
    })
    
    it('does not yield anything if r is biger than iterable length', () => {
        expect([...new Iter('ABCDE').combinations(6)].length).toBe(0);
    })
    
    it('does not yield anything if r is not specified', () => {
        expect([...new Iter('ABCDE').combinations()].length).toBe(0);
    })
    
    it('yields combinations based on the index position', () => {        
        let repeat = false,
            map = {};
        for (let i of new Iter([1, 1, 1]).combinations(2)) {
            let res = i.join();
            if (!map[res]) {
                map[res] = true;
            }
            else {
                repeat = true;
            }
        }
        
        expect(repeat).toBe(true);
        
    })
    
    it('throws type error with non iterable `this`', () => {
        let err = {};
        
        try {
            Iter.prototype.combinations.call(null);
        } catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

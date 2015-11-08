import './auto_mock_off';
import 'babel/polyfill';
import {combinations} from '../src/itertools';

describe('combinations', () => {
        
    it('yields all combinations of r length', () => {
        expect([...combinations('ABCDE', 0)].length).toBe(1);
        expect([...combinations('ABCDE', 1)].length).toBe(5);
        expect([...combinations('ABCDE', 2)].length).toBe(5 * 4 / 2);
        expect([...combinations('ABCDE', 3)].length).toBe(5 * 4 * 3 / 6);
        expect([...combinations('ABCDE', 4)].length).toBe(5 * 4 * 3 * 2 / 24);
        expect([...combinations('ABCDE', 5)].length).toBe(1);
    })
    
    it('yields r length arrays', () => {
        for (let i of combinations('ABCDE', 3)) {
            expect(i.length).toBe(3);
        }
        for (let i of combinations('ABCDE', 4)) {
            expect(i.length).toBe(4);
        }
    })
    
    it('does not yield anything if r is biger than iterable length', () => {
        expect([...combinations('ABCDE', 6)].length).toBe(0);
    })
    
    it('does not yield anything if r is not specified', () => {
        expect([...combinations('ABCDE')].length).toBe(0);
    })
    
    it('yields combinations based on the index position', () => {        
        let repeat = false,
            map = {};
        for (let i of combinations([1, 1, 1], 2)) {
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
    
    it('throws type error with non iterable or without arguments', () => {
        let err = {};
        
        try {
            combinations();
        } catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

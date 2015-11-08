import './auto_mock_off';
import 'babel/polyfill';
import {permutations} from '../src/itertools';

describe('permutations', () => {
        
    it('yields all permutations of the iterable', () => {
        expect([...permutations([])].length).toBe(1);
        expect([...permutations([1])].length).toBe(1);
        expect([...permutations([1, 2])].length).toBe(2);
        expect([...permutations([1, 2, 3])].length).toBe(6);
        expect([...permutations([1, 2, 3, 4])].length).toBe(24);
        expect([...permutations([1, 2, 3, 4, 5])].length).toBe(120);
        expect([...permutations([1, 2, 3, 4, 5, 6])].length).toBe(720);
        
        let res = [ 
                    [ 1, 2, 3 ],
                    [ 1, 3, 2 ],
                    [ 2, 1, 3 ],
                    [ 2, 3, 1 ],
                    [ 3, 1, 2 ],
                    [ 3, 2, 1 ] 
                ];
        let perms = [...permutations([1, 2, 3])];
        
        expect(perms.join()).toBe(res.join());
    })
    
    it('yields r length permutations with specified r', () => {
        expect([...permutations([1, 2, 3, 4, 5], 0)].length).toBe(1);
        expect([...permutations([1, 2, 3, 4, 5], 1)].length).toBe(5);
        expect([...permutations([1, 2, 3, 4, 5], 2)].length).toBe(5 * 4);
        expect([...permutations([1, 2, 3, 4, 5], 3)].length).toBe(5 * 4 * 3);
        expect([...permutations([1, 2, 3, 4, 5], 4)].length).toBe(5 * 4 * 3 * 2);
    })
    
    it('yields r length arrays', () => {
        for (let i of permutations([1, 2, 3])) {
            expect(i.length).toBe(3);
        }
        for (let i of permutations([1, 2, 3], 2)) {
            expect(i.length).toBe(2);
        }
    })
    
    it('yields permutations based on the index position', () => {        
        let repeat = false,
            map = {};
        for (let i of permutations([1, 2, 1])) {
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
            permutations();
        } catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

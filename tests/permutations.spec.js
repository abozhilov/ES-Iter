import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('permutations', () => {
        
    it('yields all permutations of the iterable', () => {
        expect([...new Iter([]).permutations()].length).toBe(1);
        expect([...new Iter([1]).permutations()].length).toBe(1);
        expect([...new Iter([1, 2]).permutations()].length).toBe(2);
        expect([...new Iter([1, 2, 3]).permutations()].length).toBe(6);
        expect([...new Iter([1, 2, 3, 4]).permutations()].length).toBe(24);
        expect([...new Iter([1, 2, 3, 4, 5]).permutations()].length).toBe(120);
        expect([...new Iter([1, 2, 3, 4, 5, 6]).permutations()].length).toBe(720);
        
        let res = [ 
                    [ 1, 2, 3 ],
                    [ 1, 3, 2 ],
                    [ 2, 1, 3 ],
                    [ 2, 3, 1 ],
                    [ 3, 1, 2 ],
                    [ 3, 2, 1 ] 
                ];
        let perms = [...new Iter([1, 2, 3]).permutations()];
        
        expect(perms.join()).toBe(res.join());
    })
    
    it('yields r length permutations with specified r', () => {
        expect([...new Iter([1, 2, 3, 4, 5]).permutations(0)].length).toBe(1);
        expect([...new Iter([1, 2, 3, 4, 5]).permutations(1)].length).toBe(5);
        expect([...new Iter([1, 2, 3, 4, 5]).permutations(2)].length).toBe(5 * 4);
        expect([...new Iter([1, 2, 3, 4, 5]).permutations(3)].length).toBe(5 * 4 * 3);
        expect([...new Iter([1, 2, 3, 4, 5]).permutations(4)].length).toBe(5 * 4 * 3 * 2);
    })
    
    it('yields r length arrays', () => {
        for (let i of new Iter([1, 2, 3]).permutations()) {
            expect(i.length).toBe(3);
        }
        for (let i of new Iter([1, 2, 3]).permutations(2)) {
            expect(i.length).toBe(2);
        }
    })
    
    it('yields permutations based on the index position', () => {        
        let repeat = false,
            map = {};
        for (let i of new Iter([1, 2, 1]).permutations()) {
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
    
    it('throws type error with non iterable this', () => {
        let err = {};
        
        try {
            Iter.prototype.permutations.call(345);
        } catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

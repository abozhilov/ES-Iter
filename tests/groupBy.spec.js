import './auto_mock_off';
import 'babel/polyfill';
import {groupBy, zip} from '../src/itertools';

describe('groupBy', () => {
    it('yields tupple with [key, group]', () => {
        let res = [...groupBy('AAAABBBCCDAABBB')],
            out = [['A', 'AAAA'], ['B', 'BBB'], ['C', 'CC'], ['D', 'D'], ['A', 'AA'], ['B', 'BBB']];
        
        expect(res.length).toBe(6);
        
        for (let [l, r] of zip(res, out)) {
            expect(l[0]).toBe(r[0])
            expect(l[1].join('')).toBe(r[1])
        }
    })
    
    it('if key function is not specified use element itself', () => {
        let res = [...groupBy('A')];
        
        expect(res[0][0]).toBe('A');
    })
    
    it('if key function is specified `k` must be returned result of key function', () => {
        let res = [...groupBy('AAA', (x) => x.charCodeAt())];
        
        expect(res[0][0]).toBe(65);
        expect(res[0][1].join('')).toBe('AAA');
    })  
    
    it('throws TypeError with non iterable', () => {
        let err = {};
        
        try {
            groupBy(545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError with empty arguments list', () => {
        let err = {};
        
        try {
            groupBy();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* gen(n) {
            for (let i = 0; i < n; i++) yield i;
        })(10);
        
        for (let i of groupBy(iter)) {
            break;
        }
        
        let res = [...iter];
        expect(res.length).toBe(0);
    })        
})

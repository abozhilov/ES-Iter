import './auto_mock_off';
import 'babel/polyfill';
import {chain} from '../src/itertools';

describe('chain', () => {
    it('does not yield anything if iterable is exhausted', () => {
        let res = [...chain([])];
        
        expect(res.length).toBe(0);
    })
    
    it('does not yield anything without arguments', () => {
        let res = [...chain()];
        
        expect(res.length).toBe(0);
    })
    
    it('Throws TypeError with non iterable', () => {
        let err = {};
        
        try {
            chain(545);
        }catch(e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* gen(n) {
            for (let i = 0; i < n; i++) yield i;
        })(10);
        
        for (let i of chain(iter)) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

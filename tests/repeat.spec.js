import './auto_mock_off';
import 'babel/polyfill';
import {repeat} from '../src/itertools';

describe('repeat', () => {
    it('indefinitely yields value without limit', () => {
        let j = 0;
        for (let i of repeat(true)) {
            expect(i).toBe(true);
            if (j++ > 100) break;
        }
    })
    
    it('yields value N times', () => {
        let arr = [...repeat(0, 100)];
        
        expect(arr.length).toBe(100);
    })
})

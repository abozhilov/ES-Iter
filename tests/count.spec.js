import './auto_mock_off';
import 'babel/polyfill';
import {count, range, zip} from '../src/itertools';

describe('count', () => {
    it('counts from 0 to Infinity without arguments', () => {
        let res = [...zip(count(), range(10))];
        
        expect(res[0][0]).toBe(0);
        expect(res.length).toBe(10);
        
        expect([...zip(count(), range(100))].length).toBe(100);
    })
    
    it('counts from start to Infinity', () => {
        let res = [...zip(count(10), range(10))];
        
        expect(res[0][0]).toBe(10);
        expect(res.length).toBe(10);
        
        expect([...zip(count(10), range(100))].length).toBe(100);        
    })
    
    it('counts from start to Infinity with step', () => {
        let start = 10;
        let step = 2;        
        let res = [...zip(count(start, step), range(10))];
        
        for (let [v,i] of res) {
            expect(v).toBe(start);
            start += step;
        }
    })
    
    it('coverts arguments to integers', () => {
        let start = 10;
        let step = 2;        
        let res = [...zip(count(10.9, 2.5), range(10))];
        
        for (let [v,i] of res) {
            expect(v).toBe(start);
            start += step;
        }        
    })
})

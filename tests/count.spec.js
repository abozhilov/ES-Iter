import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('count', () => {
    it('counts from 0 to Infinity without arguments', () => {
        let res = [...Iter.count().zip(Iter.range(10))];
        
        expect(res[0][0]).toBe(0);
        expect(res.length).toBe(10);
        
        expect([...Iter.count().zip(Iter.range(100))].length).toBe(100);
    })
    
    it('counts from start to Infinity', () => {
        let res = [...Iter.count(10).zip(Iter.range(10))];
        
        expect(res[0][0]).toBe(10);
        expect(res.length).toBe(10);
        
        expect([...Iter.count(10).zip(Iter.range(100))].length).toBe(100);        
    })
    
    it('counts from start to Infinity with step', () => {
        let start = 10;
        let step = 2;        
        let res = [...Iter.count(start, step).zip(Iter.range(10))];
        
        for (let [v,i] of res) {
            expect(v).toBe(start);
            start += step;
        }
    })
    
    it('coverts arguments to integers', () => {
        let start = 10;
        let step = 2;        
        let res = [...Iter.count(10.9, 2.5).zip(Iter.range(10))];
        
        for (let [v,i] of res) {
            expect(v).toBe(start);
            start += step;
        }        
    })
})

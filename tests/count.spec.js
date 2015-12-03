import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('count', () => {
    it('counts from 0 to Infinity without arguments', () => {
        let res = [...Iter.zip(Iter.count(), Iter.range(10))];
        
        expect(res[0][0]).toBe(0);
        expect(res.length).toBe(10);
        
        expect([...Iter.zip(Iter.count(), Iter.range(100))].length).toBe(100);
    })
    
    it('counts from start to Infinity', () => {
        let res = [...Iter.zip(Iter.count(10), Iter.range(10))];
        
        expect(res[0][0]).toBe(10);
        expect(res.length).toBe(10);
        
        expect([...Iter.zip(Iter.count(10), Iter.range(100))].length).toBe(100);        
    })
    
    it('counts from start to Infinity with step=2', () => {
        let start = 10;
        let step = 2;        
        let res = [...Iter.zip(Iter.count(start, step), Iter.range(10))];
        
        for (let [v,i] of res) {
            expect(v).toBe(start);
            start += step;
        }
    })
    
    it('coverts arguments to integers', () => {
        let start = 10;
        let step = 2;        
        let res = [...Iter.zip(Iter.count(10.9, 2.5), Iter.range(10))];
        
        for (let [v,i] of res) {
            expect(v).toBe(start);
            start += step;
        }        
    })
})

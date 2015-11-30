import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('map', () => {
    it('yields all elements without callback', () => {
        let arr = [1, 2, 3, 4, 5];
        expect([...new Iter(arr).map()].join()).toBe(arr.join());
    })
    
    it('calls callback for every element and yields the returned result', () => {
        let res = [1, 4, 9, 16];
        
        expect([...Iter.range(1, 5).map(x => x * x)].join()).toBe(res.join());
    })
    
    it('closes the iterator on abrupt exits', () => {
        let it = Iter.range(10);
        
        for (let i of it.map()) {
            break;
        }
        
        expect([...it].length).toBe(0);
    })
})

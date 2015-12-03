import './auto_mock_off';
import 'babel-polyfill';
import Iter from '../src/Iter';

describe('flatMap', () => {
    it('flattens recursively', () => {
        let arr = [[1, [2, [3]], [[[4]], 5]]];
        
        expect([...new Iter(arr).flatMap()].join()).toBe([1, 2, 3, 4, 5].join());
    })
    
    it('calls callback for every element and yields the returned result', () => {
        let res = [1, 4, 9, 16];
        let arr = [[1, [2, [3]], [[[4]]]]];
        
        expect([...new Iter(arr).flatMap(x => x * x)].join()).toBe(res.join());
    })
    
    it('handles circular references', () => {
        let arr = [[1, 2, 3]];
        arr[0].push(arr[0]);
        
        expect([...new Iter(arr).flatMap()].join()).toBe([1, 2, 3].join());
    })
    
    it('closes the iterator on abrupt exits', () => {
        let it = Iter.range(10);
        
        for (let i of it.flatMap()) {
            break;
        }
        
        expect([...it].length).toBe(0);
    })
})

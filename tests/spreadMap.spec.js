import './auto_mock_off';
import 'babel/polyfill';
import Iter from '../src/Iter';

describe('spreadMap', () => {
    it('spreads current iterable to arguments of callback', () => {
        [...new Iter([[], [], []]).spreadMap((...args) => expect(args.length).toBe(0))];
        [...new Iter([[1], [1], [1]]).spreadMap((...args) => expect(args.length).toBe(1))];
        [...new Iter([[1, 2], [1, 2], [1, 2]]).spreadMap((...args) => expect(args.length).toBe(2))];
        [...new Iter([[1, 2, 3], [1, 2, 3], [1, 2, 3]]).spreadMap((...args) => expect(args.length).toBe(3))];
        [...new Iter([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]).spreadMap((...args) => expect(args.length).toBe(4))];
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of new Iter(['ABC', 'DEF']).spreadMap(() => ++x)) {
            expect(i).toBe(x);
        }
    })
    
    it('throws TypeError if `this` is not an iterable', () => {
        let err = {};
        try {
            Iter.prototype.spreadMap.call(545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if iterable items are not iterable', () => {
        let err = {};
        try {
            [...new Iter([null]).spreadMap()];
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = new Iter(function* (){
            for (let i = 10; i--;) yield [i];
        });
        
        for (let i of iter.spreadMap((x) => x)) {
            break;
        }
        
        expect([...iter].length).toBe(0);        
    })
})

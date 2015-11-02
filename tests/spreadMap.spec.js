import './auto_mock_off';
import 'babel/polyfill';
import {spreadMap} from '../src/itertools';

describe('spreadMap', () => {
    it('spreads current iterable to arguments of callback', () => {
        [...spreadMap([[], [], []], (...args) => expect(args.length).toBe(0))];
        [...spreadMap([[1], [1], [1]], (...args) => expect(args.length).toBe(1))];
        [...spreadMap([[1, 2], [1, 2], [1, 2]], (...args) => expect(args.length).toBe(2))];
        [...spreadMap([[1, 2, 3], [1, 2, 3], [1, 2, 3]], (...args) => expect(args.length).toBe(3))];
        [...spreadMap([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]], (...args) => expect(args.length).toBe(4))];
    })
    
    it('yields the returned value of callback', () => {
        let x = 0;
        for (let i of spreadMap(['ABC', 'DEF'], () => ++x)) {
            expect(i).toBe(x);
        }
    })
    
    it('throws TypeError if first argument is missing', () => {
        let err = {};
        try {
            spreadMap();
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if first argument is not an iterable', () => {
        let err = {};
        try {
            spreadMap(545);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if callback is not a callable', () => {
        let err = {};
        try {
            spreadMap([]);
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);
    })
    
    it('throws TypeError if iterable items are not iterable', () => {
        let err = {};
        try {
            [...spreadMap([null])];
        }catch (e) {
            err = e;
        }
        expect(err instanceof TypeError).toBe(true);        
    })
    
    it('closes iterator on abrupt exit', () => {
        let iter = (function* (){
            for (let i = 10; i--;) yield [i];
        })();
        
        for (let i of spreadMap(iter, (x) => x)) {
            break;
        }
        
        expect([...iter].length).toBe(0);        
    })
})

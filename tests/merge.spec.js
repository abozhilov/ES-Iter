require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('merge', () => {
    it('yields sorted input', () => {
        let iter = Iter.merge(Iter.range(5), Iter.range(2));
		
		expect([...iter]).toEqual([0, 0, 1, 1, 2, 3, 4])
    })
    
    it('it uses comparator callback', () => {
        let iter = Iter.merge([{value : 1}], [{value : 1}, {value : 3}], (a, b) => a.value <= b.value);
		
		expect([...iter]).toEqual([{value : 1}, {value : 1}, {value : 3}])
    })  
    
    it('it produces stable merge', () => {
        let iter = Iter.merge([{value : 1, key: 1}], [{value : 1, key: 2}, {value : 3, key: 3}], (a, b) => a.value <= b.value);
		
		expect([...iter]).toEqual([{value : 1, key: 1}, {value : 1, key: 2}, {value : 3, key: 3}])
    })        
    
    it('closes iterator on abrupt exit', () => {
        let iter = Iter.merge(Iter.range(5), Iter.range(5));
        
        for (let i of iter) {
            break;
        }
        
        expect([...iter].length).toBe(0);
    })
})

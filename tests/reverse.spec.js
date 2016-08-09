require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('reverse', () => {
    it('it iterates arrayLike in reverse order', () => {
        expect([...Iter.reverse([1, 2, 3, 4])].join()).toBe([4, 3, 2, 1].join());
        expect([...Iter.reverse('ABCD')].join()).toBe(['D', 'C', 'B', 'A'].join());
    })
    
    it('does not yield anything if object is not arrayLike', () => {
        expect([...Iter.reverse({x: 1, y : 2})].length).toBe(0);
    })
    
    it('throws TypeError if obj is not an object', () => {
        let err = {};
        
        try {
            Iter.reverse(null);
        }catch (e) {
            err = e;
        }
        
        expect(err instanceof TypeError).toBe(true);
    })
})

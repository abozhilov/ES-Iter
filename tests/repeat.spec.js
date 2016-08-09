require('./auto_mock_off');
let Iter = require('../src/Iter');

describe('repeat', () => {
    it('indefinitely yields value without limit', () => {
        let j = 0;
        for (let i of Iter.repeat(true)) {
            expect(i).toBe(true);
            if (j++ > 100) break;
        }
    })
    
    it('yields value N times', () => {
        let arr = [...Iter.repeat(0, 100)];
        
        expect(arr.length).toBe(100);
    })
})

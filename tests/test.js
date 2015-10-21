import * as iter from '../src/itertools.js';


for (let i of iter.zip(iter.range(10), iter.cycle(iter.range(2)))) {
    console.log(i);
}

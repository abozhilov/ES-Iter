import * as itertools from './src/itertools'

for (let [i, v] of itertools.enumerate(itertools.combinations(itertools.range(1, 11), 5))) {
    console.log(i, v);
}


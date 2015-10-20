
export function isIter (obj) {
    return {}.toString.call(obj).slice(-9, -1) === 'Iterator';
}

export function toIter (obj) {
    return obj[Symbol.iterator]();
}

export function iterFrom (obj, genMethod = Symbol.iterator) {
    return obj[genMethod]();
} 

export function toArray(...iters) {
    var res = [];
    for (var it of iters) {
        res.push(...it);
    }
    return res;
}

export function * range (start, end, step) {
    let s = start | 0,
        e = end   | 0;
        
    if (typeof end == 'undefined') {
        e = s;
        s = 0;
    }
    
    let k = (step | 0) || (s < e ? 1 : -1)
    
    if (k > 0) {
        while (s < e) {
            yield s;
            s += k;
        }
    }
    else {
        while (s > e) {
            yield s;
            s += k;
        }        
    } 
}

export function * zip (...iters) {
    var iterators = [];
    for (var it of iters) {
        iterators.push(isIter(it) ? it : toIter(it));
    }
    while (true) {
        var res = [];
        for (var it of iterators) {
            var curr = it.next();
            if (curr.done) {
                return;
            }
            res.push(curr.value);
        }
        yield res;
    }
}

export function * longestZip (...iters) {
    var iterators = [],
        count = 0,
        map;
    for (var it of iters) {
        iterators.push(isIter(it) ? it : toIter(it));
    }
    map = new Map(zip(iterators, repeat(false)));
    while (true) {
        var res = [];
        for (var it of iterators) {
            var curr = it.next();
            if (curr.done && !map.get(it)) {
                map.set(it, true);
                count++;
            }
            res.push(curr.value);
        }
        if (count >= iterators.length) {
            return;
        } 
        yield res;
    }
}

export function * count (start, step) {
    let s = (start | 0) || 0,
        k = (step  | 0) || 1;
    while (true) {
        yield s;
        s += k;
    }
}

export function * repeat (val, times) {
    if (typeof times == 'undefined') {
        while (true) {
            yield val;
        }
    }
    else {
        for (var i of range(times)) {
            yield val;
        }
    }
}

export function * enumerate (iterable, start) {
    yield* iter.zip(iter.count(start), iterable);
}

export function * chain (...iters) {
    for (let it of iters) {
        yield* it;
    }
}

export function * cycle(iterable) {
    let arr = [...iterable];
    while (true) {
        yield* arr;
    }
}

export function * map (callback, ...iters) {
    for (let arr of longestZip(...iters)) {
        yield callback(...arr);
    }
}

export function * iMap (callback, ...iters) {
    for (let arr of zip(...iters)) {
        yield callback(...arr);
    }
}


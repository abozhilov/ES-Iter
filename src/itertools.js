function toInteger(n) {
    if (n < 0) {
        return Math.ceil(n);
    }
    return Math.floor(n);
}

function toPositiveInteger(n) {
    if (n < 0) {
        return 0;
    }
    return Math.floor(n);
}

export function getIterator (obj) {
    return obj[Symbol.iterator]();
}

export function isIterator (obj) {
    return (isIterable(obj) && typeof obj.next === 'function');
}

export function isIterable (obj = null) {
    return (obj !== null && typeof obj[Symbol.iterator] === 'function');
}

export function isMultiIterable (obj) {
    return (isIterable(obj) && getIterator(obj) !== obj);
}

export function isClosable (iterator) {
    return (isIterator(iterator) && typeof iterator.return === 'function');
}

export function closeIterator (iterator) {
    if (isClosable(iterator)) {
        return Boolean(iterator.return().done);
    }
    return false;
}

export function closeAllIterators (...iterators) {
    for (let it of iterators) {
        closeIterator(it);
    }
}

export function toArray (...iterables) {
    let res = [];
    for (let it of iterables) {
        res.push(...getIterator(it)); 
    }
    return res;
}

export function* range (start, end, step) {
    let s = toInteger(start),
        e = toInteger(end);
        
    if (typeof end == 'undefined') {
        e = s;
        s = 0;
    }
    
    let k = toInteger(step) || (s < e ? 1 : -1)
    
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

export function zip (...iterables) {
    let iterators = iterables.map(getIterator),
        done = iterators.length;
    
    return (function* () {
        try {
            while (done) {
                let res = [];
                for (let it of iterators) {
                    let curr = it.next();
                    if (curr.done) {
                        for (let i of iterators) {
                            if (i !== it) closeIterator(i);
                        }
                        return;
                    }
                    res.push(curr.value);
                }
                yield res;
            }
        } finally {
            closeAllIterators(...iterators);
        }
    })();
}

export function longestZip (...iterables) {
    let iterators = iterables.map(getIterator),
        map       = new Map(zip(iterators, repeat(false))),
        count     = 0,
        done      = iterators.length;
    
    return (function* () {    
        try {    
            while (done) {
                let res = [];
                for (let it of iterators) {
                    let curr = it.next();
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
        } finally {
            closeAllIterators(...iterators);
        }
    })();
}

export function enumerate (iterable, start) {
    return zip(count(start), iterable);
}

export function accumulate (iterable, callback = (x, y) => x + y) {
    let it = getIterator(iterable);
    
    return (function* () {
        try {
            let next = it.next(),
                acc = next.value;
            if (!next.done) {
                yield acc;
            }
            while (!( next = it.next() ).done) {
                acc = callback(acc, next.value);
                yield acc;
            }
        } finally {
            closeIterator(it);
        }
    })();
}

export function chain (...iterables) {
    let iterators = iterables.map(getIterator);
    
    return (function* () {
        for (let it of iterators) {
            yield* it;
        }
    })();
}

export function* compress (data, selectors) {
    for (let [v, s] of zip(data, selectors)) {
        if (s) yield v;
    }
}

export function* groupBy (iterable, key = (x)=> x) {
    let k = {},
        arr = [];
    for (let val of iterable) {
        let res = key(val);
        if (res !== k) {
            if (arr.length) yield [arr[0], arr];
            k = res;
            arr = [];
        }
        arr.push(val);
    }
    yield [arr[0], arr];
}

export function* zipMap (callback, ...iterables) {
    for (let arr of zip(...iterables)) {
        yield callback(...arr);
    }
}

export function* longestZipMap (callback, ...iterables) {
    for (let arr of longestZip(...iterables)) {
        yield callback(...arr);
    }
}

export function* spreadMap (iterable, callback) {
    for (let arr of iterable) {
        yield callback(...arr);
    }
}

export function* take (n, iterable) {
    let count = toPositiveInteger(n);
    
    for (let v of iterable) {
        if (count-- > 0) {
            yield v;
            continue;
        }
        break;
    }
}

export function* drop (n, iterable) {
    let count = toPositiveInteger(n);
    
    for (let v of iterable) {
        if (count-- > 0) {
            continue;
        }
        yield v;
    }
}

export function* dropWhile (iterable, callback = Boolean) {
    let iter = getIterator(iterable);
    for (let v of iter) {
        if (!callback(v)) {
            yield v;
            yield* iter;
            break;
        }
    }
}

export function* takeWhile (iterable, callback = Boolean) {
    for (let v of iterable) {
        if (callback(v)) {
            yield v;
        }
        else {
            break;
        }
    }
}

export function* filter (iterable, callback = Boolean) {
    for (let v of iterable) {
        if (callback(v)) {
            yield v;
        }
    }
}

export function* filterFalse (iterable, callback = Boolean) {
    for (let v of iterable) {
        if (!callback(v)) {
            yield v;
        }
    }
}

export function* count (start, step) {
    let s = toInteger(start) || 0,
        k = toInteger(step) || 1;
    while (true) {
        yield s;
        s += k;
    }
}

export function* cycle (iterable) {
    if (isMultiIterable(iterable)) {
        while (true) { 
            yield* iterable;
        }
    }
    else {
        let arr = [];
        for (let v of iterable) {
            yield v;
            arr.push(v);
        }
        while (true) {
            yield* arr;
        }
    }
}

export function* repeat (val, times = Infinity) {
    for (let i of range(toPositiveInteger(times))) {
        yield val;
    }
}

export function* product (...iterables) {
    let arr = iterables.map((it) => isMultiIterable(it) ? it : toArray(it)),
        len = arr.length,
        res = [];
        
    function* gen(idx = 0) {
        if (idx >= len) {
            yield res;
            return;
        }
        for (let v of arr[idx]) {
            res[idx] = v;
            yield* gen(idx + 1);
        }
    }
    yield* gen();
}

export function* permutations (iterable, r) {
    let arr = toArray(iterable),
        map = new Map(),
        len =  Math.min(toPositiveInteger(r) || arr.length, arr.length),
        res = [];
    
    function* gen(idx = 0) {
        if (idx >= len) {
            yield res;
            return;
        }
        for (let [i, v] of enumerate(arr)) {
            if (!map.has(i)) {
                map.set(i, true);
                res[idx] = v;
                yield* gen(idx + 1);
                map.delete(i);
            }
        }
    }
    
    yield* gen(); 
}

export function* combinations (iterable, r) {
    let arr = toArray(iterable),
        len = Math.min(toPositiveInteger(r), arr.length),
        res = [];
        
    function* gen(idx = 0, start = 0) {
        if (idx >= len) {
            yield res;
            return;
        }
        for (let i = start, l = arr.length; i < l; i++) {
            res[idx] = arr[i];
            yield* gen(idx + 1, i + 1);
        }
    }
    
    yield* gen();
}


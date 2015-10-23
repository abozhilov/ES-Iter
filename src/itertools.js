
export function getIterator (obj) {
    return obj[Symbol.iterator]();
}

export function iterFrom(gen, ...args) {
    return {
        [Symbol.iterator]() {
            return gen(...args);
        }
    }
}

export function isIterable (obj) {
    return (obj != null && typeof obj[Symbol.iterator] == 'function');
}

export function isMultiIterable (obj) {
    return (isIterable(obj) && getIterator(obj) !== obj);
}

export function isIterator (obj) {
    return (isIterable(obj) && typeof obj.next == 'function');
}

export function isClosable (iter) {
    return (isIterable(iter) && typeof iter.return == 'function');
}

export function closeIterator (iter) {
    if (isClosable(iter)) {
        return iter.return().done;
    }
    return false;
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
        iterators.push(getIterator(it));
    }
    while (true) {
        var res = [];
        for (var it of iterators) {
            var curr = it.next();
            if (curr.done) {
                for (var i of iterators) {
                    if (i !== it) closeIterator(i);
                }
                return;
            }
            res.push(curr.value);
        }
        yield res;
    }
}

export function * longestZip (...iters) {
    var iterators = iters.map(getIterator),
        map       = new Map(zip(iterators, repeat(false))),
        count     = 0;
        
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
    yield* zip(count(start), iterable);
}

export function * chain (...iters) {
    for (let it of iters) {
        yield* it;
    }
}

export function * groupBy(iterable, key = (x)=> x) {
    var k = {},
        arr = [];
    for (var val of iterable) {
        var res = key(val);
        if (res !== k) {
            if (arr.length) yield [arr[0], arr];
            k = res;
            arr = [];
        }
        arr.push(val);
    }
    yield [arr[0], arr];
}

export function * cycle(iterable) {
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

export function * map (callback, ...iters) {
    for (let arr of zip(...iters)) {
        yield callback(...arr);
    }
}

export function * longestMap (callback, ...iters) {
    for (let arr of longestZip(...iters)) {
        yield callback(...arr);
    }
}

export function * spreadMap (callback, iterable) {
    for (let arr of iterable) {
        yield callback(...arr);
    }
}

export function * compress (data, selectors) {
    for (let [v, s] of zip(data, selectors)) {
        if (s) yield v;
    }
}

export function * take(iterable, n) {
    let count = n >>> 0;
    
    if (typeof n == 'undefined') {
        yield* iterable;
    }
    else {
        for (var v of iterable) {
            if (!count--) {
                break;
            }
            yield v;
        }
    }
}

export function * drop(iterable, n = 0) {
    let count = n >>> 0;
    
    for (var v of iterable) {
        if (count-- > 0) {
            continue;
        }
        yield v;
    }
}

export function * dropWhile (callback, iterable) {
    let iter = toIterator(iterable);
    for (let v of iter) {
        if (!callback(v)) {
            yield v;
            break;
        }
    }
    for (let v of iter) {
        yield v;
    }
}

export function * takeWhile (callback, iterable) {
    for (let v of iterable) {
        if (callback(v)) {
            yield v;
        }
        else {
            break;
        }
    }
}



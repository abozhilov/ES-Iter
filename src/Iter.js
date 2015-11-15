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

function throwIfNotCallable(callback) {
    if (typeof callback != 'function') {
        throw TypeError(callback + ' is not a function');
    }
}

export default class Iter {
    constructor (...args) {
        this[Symbol.iterator] = function() {
            return args[Symbol.iterator]();
        }
    }
    
    static from (iterable) {
        if (!Iter.isIterable(iterable)) {
            throw TypeError(iterable + ' is not an iterable');
        }
        
        let iter = Object.create(Iter.prototype);
        
        iter[Symbol.iterator] = function() {
            return iterable[Symbol.iterator]();
        }
        
        return iter;     
    }
    
    static fromGenerator (genFunc) {
        let iter = Object.create(Iter.prototype);
        iter[Symbol.iterator] = genFunc;   
        
        return iter;            
    }
    
    static getIterator (obj) {
        return obj[Symbol.iterator]();
    }

    static isIterator (obj) {
        return (Iter.isIterable(obj) && typeof obj.next === 'function');
    }

    static isIterable (obj = null) {
        return (obj !== null && typeof obj[Symbol.iterator] === 'function');
    }

    static isMultiIterable (obj) {
        return (Iter.isIterable(obj) && Iter.getIterator(obj) !== obj);
    }

    static isClosable (iterator) {
        return (Iter.isIterator(iterator) && typeof iterator.return === 'function');
    }

    static closeIterator (iterator) {
        if (Iter.isClosable(iterator)) {
            return Boolean(iterator.return().done);
        }
        return false;
    }

    static closeAllIterators (...iterators) {
        for (let it of iterators) {
            Iter.closeIterator(it);
        }
    }
    
    static range (start, end, step) {
        return Iter.fromGenerator(function* () {
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
        });
    }
    
    static count (start, step) {
        return Iter.fromGenerator(function* () {
            let s = toInteger(start) || 0,
                k = toInteger(step) || 1;
            while (true) {
                yield s;
                s += k;
            }
        });
    }

    static cycle (iterable) {
        let iterator = Iter.getIterator(iterable);
        
        return Iter.fromGenerator(function* () {
            let arr = [];
            for (let v of iterator) {
                yield v;
                arr.push(v);
            }
            while (true) {
                yield* arr;
            }
        });
    }

    static repeat (val, times = Infinity) {
        return Iter.fromGenerator(function* () {
            for (let i of range(toPositiveInteger(times))) {
                yield val;
            }
        });
    }
    
    toArray () {
        return [...this];        
    }
    
    zip (...iterables) {
        let iterators = [this, ...iterables].map(Iter.getIterator),
            done = iterators.length;
        
        return Iter.fromGenerator(function* () {
            try {
                while (done) {
                    let res = [];
                    for (let it of iterators) {
                        let curr = it.next();
                        if (curr.done) {
                            for (let i of iterators) {
                                if (i !== it) Iter.closeIterator(i);
                            }
                            return;
                        }
                        res.push(curr.value);
                    }
                    yield res;
                }
            } finally {
                Iter.closeAllIterators(...iterators);
            }
        });
    }
    
    longestZip (...iterables) {
        let iterators = [this, ...iterables].map(Iter.getIterator),
            map       = new Map(Iter.from(iterators).zip(Iter.repeat(false))),
            count     = 0,
            done      = iterators.length;
        
        return Iter.fromGenerator(function* () {    
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
                Iter.closeAllIterators(...iterators);
            }
        });
    }
    
    enumerate (start = 0) {
        return Iter.count(start).zip(this);
    }
    
}

/*


export function accumulate (iterable, callback = (x, y) => x + y) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        try {
            let next = iterator.next(),
                acc = next.value;
            if (!next.done) {
                yield acc;
            }
            while (!( next = iterator.next() ).done) {
                acc = callback(acc, next.value);
                yield acc;
            }
        } finally {
            closeIterator(iterator);
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

export function compress (data, selectors) {
    let iterator = zip(data, selectors);
    
    return (function* () {
        for (let [v, s] of iterator) {
            if (s) yield v;
        }
    })();
}

export function groupBy (iterable, key = (x) => x) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        let k = {};
        let arr = [];
        
        for (let v of iterator) {
            let res = key(v);
            if (res !== k) {
                if (arr.length) {
                    yield [k, arr];
                }
                arr = [];
                k = res;
            }
            arr.push(v);
        }
        if (arr.length) {
            yield [k, arr];
        }        
    })();
}

export function zipMap (...iterables) {
    let callback = iterables[iterables.length - 1];
    
    if (typeof callback != 'function') {
        return zip(...iterables);
    }
    else {
        let iterator = zip(...iterables.slice(0, -1));
        return (function* (){
            for (let arr of iterator) {
                yield callback(...arr);
            }
        })();
    }
}

export function longestZipMap (...iterables) {
    let callback = iterables[iterables.length - 1];
    
    if (typeof callback != 'function') {
        return longestZip(...iterables);
    }
    else {    
        let iterator = longestZip(...iterables.slice(0, -1));
        return (function* () {
            for (let arr of iterator) {
                yield callback(...arr);
            }
        })();
    }
}

export function spreadMap (iterable, callback) {
    let iterator = getIterator(iterable);
    
    throwIfNotCallable(callback);
    
    return (function* () {
        for (let arr of iterator) {
            yield callback(...arr);
        }
    })();
}

export function take (iterable, n = Infinity) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        let count = toPositiveInteger(n);
        for (let v of iterator) {
            if (count-- > 0) {
                yield v;
                continue;
            }
            break;
        }
    })();
}

export function takeWhile (iterable, callback = Boolean) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        for (let v of iterator) {
            if (callback(v)) {
                yield v;
            }
            else {
                break;
            }
        }
    })();
}

export function drop (iterable, n = Infinity) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        let count = toPositiveInteger(n);
        for (let v of iterator) {
            if (count-- > 0) {
                continue;
            }
            yield v;
        }
    })();
}

export function dropWhile (iterable, callback = Boolean) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        for (let v of iterator) {
            if (!callback(v)) {
                yield v;
                yield* iterator;
                break;
            }
        }
    })();
}


export function filter (iterable, callback = Boolean) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        for (let v of iterator) {
            if (callback(v)) {
                yield v;
            }
        }
    })();
}

export function filterFalse (iterable, callback = Boolean) {
    let iterator = getIterator(iterable);
    
    return (function* () {
        for (let v of iterator) {
            if (!callback(v)) {
                yield v;
            }
        }
    })();
}

export function product (a = [], b = [], ...iterables) {
    let arr = [a, b, ...iterables].map((it) => isMultiIterable(it) ? it : toArray(it)),
        len = arr.length,
        res = [];
    
    return (function* gen(idx = 0) {
        if (idx >= len) {
            yield res.slice();
            return;
        }
        for (let v of arr[idx]) {
            res[idx] = v;
            yield* gen(idx + 1);
        }
    })();
}

export function permutations (iterable, r) {
    let arr = toArray(iterable),
        map = new Map(),
        res = [],
        len =  Math.min(toPositiveInteger(r), arr.length);
        
    if (Number.isNaN(len)) {
        len = arr.length;
    }
    
    return (function* gen(idx = 0) {
        if (idx >= len) {
            yield res.slice();
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
    })();

}

export function combinations (iterable, r) {
    let arr = toArray(iterable),
        len = toPositiveInteger(r),
        res = [];

    return (function* gen(idx = 0, start = 0) {
        if (idx >= len) {
            yield res.slice();
            return;
        }
        for (let i = start, l = arr.length; i < l; i++) {
            res[idx] = arr[i];
            yield* gen(idx + 1, i + 1);
        }
    })();
}
* 
*/

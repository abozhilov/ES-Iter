function toInteger (n) {
    if (n < 0) {
        return Math.ceil(n);
    }
    return Math.floor(n);
}

function toPositiveInteger (n) {
    if (n < 0) {
        return 0;
    }
    return Math.floor(n);
}

function rangeGen (start, end, step, reverse) {
    start = toInteger(start);
    end   = toInteger(end);
    step  = toInteger(step);
    
    let errArg = (start !== start && 'start') || (end !== end && 'end') || (step !== step && 'step');
    if (errArg) {
        throw TypeError('Expected number as ' + errArg + ' argument'); 
    }
    if (step < 0) {
        throw RangeError('step cannot be negative');
    }
    
    step = reverse ? -step : step;
    
    return function* () {
        if (step > 0) {
            while (start < end) {
                yield start;
                start += step;
            }
        }
        else if (step < 0) {
            while (start > end) {
                yield start;
                start += step;
            }
        }
        else {
            yield* Iter.repeat(start, Math.abs(end - start));
        }
    }
}

export default class Iter {
    constructor (iterable) {
        let iterator = Iter.getIterator(typeof iterable === 'function' ? iterable() : iterable);
        
        this[Symbol.iterator] = () => iterator;
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
        return (Iter.isIterable(obj) && Iter.getIterator(obj) !== Iter.getIterator(obj));
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
    
    static keys (obj) {
        if (typeof obj.keys === 'function') {
            return new Iter(obj.keys());
        }
        return new Iter(Object.keys(obj));
    }
    
    static entries (obj) {
        if (typeof obj.entries === 'function') {
            return new Iter(obj.entries());
        }
        let keys = Object.keys(obj);
        return new Iter(function* () {
            for (let k of keys) {
                yield [k, obj[k]];
            }
        });        
    }
    
    static values (obj) {
        if (typeof obj.values === 'function') {
            return new Iter(obj.values());
        }
        let keys = Object.keys(obj);
        return new Iter(function* () {
            for (let k of keys) {
                yield obj[k];
            }
        });            
    }
    
    static reverse (arrayLike) {
        let len = toPositiveInteger(arrayLike.length);
                
        return new Iter(function* () {
            for (let i = len; i--;) {
                yield arrayLike[i];
            }
        });
    }
    
    static range (start = 0, end, step = 1) {
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
    
        return new Iter(rangeGen(start, end, step));
    }
    
    static rangeRight (start = 0, end, step = 1) {
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        
        let k = 0;
        if (start < end) {
            k = ((end - start) % step) || step || 1;
        }
        return new Iter(rangeGen(end - k, start - 1, step, true));        
    } 
    
    static count (start, step = 1) {
        return Iter.range(start, Infinity, step);
    }

    static cycle (iterable) {
        let iterator = Iter.getIterator(iterable);
        
        return new Iter(function* () {
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
        return new Iter(function* () {
            for (let i of Iter.range(toPositiveInteger(times))) {
                yield val;
            }
        });
    }
    
    toIterator () {
        return Iter.getIterator(this);
    } 
    
    toArray () {
        return [...Iter.getIterator(this)];        
    }
    
    zip (...iterables) {
        let iterators = [this, ...iterables].map(Iter.getIterator),
            done = iterables.length;
        
        return new Iter(function* () {
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
    
    longZip (...iterables) {
        let iterators = [this, ...iterables].map(Iter.getIterator),
            map       = new Map(new Iter(iterators).zip(Iter.repeat(false))),
            count     = 0,
            done      = iterators.length;
        
        return new Iter(function* () {    
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
    
    accumulate (callback = (x, y) => x + y) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
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
                Iter.closeIterator(iterator);
            }
        });
    }
    
    chain (...iterables) {
        let iterators = [this, ...iterables].map(Iter.getIterator);
        
        return new Iter(function* () {
            for (let it of iterators) {
                yield* it;
            }
        });
    }
    
    compress (selectors) {
        let iterator = this.zip(selectors);
        
        return new Iter(function* () {
            for (let [v, s] of iterator) {
                if (s) yield v;
            }
        });
    }
    
    groupBy (key = (x) => x) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
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
        });
    }
    
    map (callback = (x) => x) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            for (let v of iterator) {
                yield callback(v);
            }
        })
    }
    
    flatMap(callback = (x) => x) {
        let iterator = Iter.getIterator(this);
        let used  = new Set();
        
        return new Iter(function* flatten(iterable) {
            if (used.has(iterable)) {
                return;
            }
            
            used.add(iterable); 
            for (let i of iterable) {
                if (Iter.isIterable(i)) {
                    yield* flatten(i);
                }
                else {
                    yield callback(i);
                }
            }
            used.delete(iterable);
        }(iterator)) 
    }
    
    zipMap (...iterables) {
        let callback = iterables[iterables.length - 1];
        
        if (typeof callback != 'function') {
            return this.zip(...iterables);
        }
        else {
            let iterator = this.zip(...iterables.slice(0, -1));
            return new Iter(function* (){
                for (let arr of iterator) {
                    yield callback(...arr);
                }
            });
        }
    }
    
    longZipMap (...iterables) {
        let callback = iterables[iterables.length - 1];
        
        if (typeof callback != 'function') {
            return this.longZip(...iterables);
        }
        else {    
            let iterator = this.longZip(...iterables.slice(0, -1));
            return new Iter(function* () {
                for (let arr of iterator) {
                    yield callback(...arr);
                }
            });
        }
    }
    
    spreadMap (callback) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            for (let arr of iterator) {
                yield callback(...arr);
            }
        });
    }
    
    take (n = Infinity) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            let count = toPositiveInteger(n);
            for (let v of iterator) {
                if (count-- > 0) {
                    yield v;
                    continue;
                }
                break;
            }
        });
    }
    
    takeWhile (callback = Boolean) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            for (let v of iterator) {
                if (callback(v)) {
                    yield v;
                }
                else {
                    break;
                }
            }
        });
    }
    
    drop (n = Infinity) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            let count = toPositiveInteger(n);
            for (let v of iterator) {
                if (count-- > 0) {
                    continue;
                }
                yield v;
            }
        });
    }
    
    dropWhile (callback = Boolean) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            for (let v of iterator) {
                if (!callback(v)) {
                    yield v;
                    yield* iterator;
                    break;
                }
            }
        });
    }
    
    filter (callback = Boolean) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            for (let v of iterator) {
                if (callback(v)) {
                    yield v;
                }
            }
        });
    }
    
    filterFalse (callback = Boolean) {
        let iterator = Iter.getIterator(this);
        
        return new Iter(function* () {
            for (let v of iterator) {
                if (!callback(v)) {
                    yield v;
                }
            }
        });
    }
    
    product (a = [], ...iterables) {
        let arr = [this, a, ...iterables].map((it) => Iter.isMultiIterable(it) ? it : [...it]),
            len = arr.length,
            res = [];
        
        return new Iter(function* gen(idx = 0) {
            if (idx >= len) {
                yield res.slice();
                return;
            }
            for (let v of arr[idx]) {
                res[idx] = v;
                yield* gen(idx + 1);
            }
        });
    }
    
    permutations (r = Infinity) {
        let arr = this.toArray(),
            map = new Map(),
            res = [],
            len =  Math.min(toPositiveInteger(r), arr.length);
        
        return new Iter(function* gen(idx = 0) {
            if (idx >= len) {
                yield res.slice();
                return;
            }
            for (let [i, v] of new Iter(arr).enumerate()) {
                if (!map.has(i)) {
                    map.set(i, true);
                    res[idx] = v;
                    yield* gen(idx + 1);
                    map.delete(i);
                }
            }
        });
    }
    
    combinations (r) {
        let arr = this.toArray(),
            len = toPositiveInteger(r),
            res = [];

        return new Iter(function* gen(idx = 0, start = 0) {
            if (idx >= len) {
                yield res.slice();
                return;
            }
            for (let i = start, l = arr.length; i < l; i++) {
                res[idx] = arr[i];
                yield* gen(idx + 1, i + 1);
            }
        });
    }
}


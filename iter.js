'use strict';
if (typeof iter == 'undefined') {
    var iter = {};
}
(function () {    
    iter.isIter = function (obj) {
        return {}.toString.call(obj).slice(-9, -1) === 'Iterator';
    }
    
    iter.toIter = function (obj) {
        return obj[Symbol.iterator]();
    }
    
    iter.iterFrom = function (obj, genMethod) {
        genMethod = genMethod || Symbol.prototype;
        return obj[genMethod]();
    } 
    
    iter.toArray = function (...iters) {
        var res = [];
        for (var it of iters) {
            for (var v of it) {
                res.push(v);
            }
        }
        return res;
    }
    
    iter.range = function * (start, end, step) {
        if (end == null) {
            end = start;
            start = 0;
        }
        if (typeof step != 'number' || step === 0) {
            step = (start < end ? 1 : -1);
        }
        
        if (step > 0) {
            while (start < end) {
                yield start;
                start += step;
            }
        }
        else {
            while (start > end) {
                yield start;
                start += step;
            }        
        } 
    }
    
    iter.zip = function * (...iters) {
        var iterators = [];
        for (var it of iters) {
            iterators.push(iter.isIter(it) ? it : iter.toIter(it));
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
    
    iter.longestZip = function * (...iters) {
        var iterators = [],
            count = 0,
            map;
        for (var it of iters) {
            iterators.push(iter.isIter(it) ? it : iter.toIter(it));
        }
        map = new Map(iter.zip(iterators, iter.repeat(false)));
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
    
    iter.count = function * (start, step) {
        if (typeof start != 'number') {
            start = 0;
        }
        if (typeof step != 'number') {
            step = 1;
        }
        while (true) {
            yield start;
            start += step;
        }
    }
    
    iter.repeat = function * (val, times) {
        if (times > 0) {
            for (var i of iter.range(times)) {
                yield val;
            }
        }
        else {
            while (true) {
                yield val;
            }
        }
    }
    
    iter.enumerate = function * (iterable, start) {
        if (typeof start != 'number') {
            start = 0;
        }
        yield* iter.zip(iter.count(), iterable);
    }
    
    iter.chain = function * (...iters) {
        for (var it of iters) {
            for (var i of it) {
                yield i;
            }
        }
    }
    
    iter.cycle = function * (...iters) {
        var arr = iter.toArray(...iters);
        while (true) {
            for (var i of arr) {
                yield i;
            }
        }
    }
    
    iter.map = function * (callback, ...iters) {
        for (var arr of iter.longestZip(...iters)) {
            yield callback(...arr);
        }
    }
    
    iter.iMap = function * (callback, ...iters) {
        for (var arr of iter.zip(...iters)) {
            yield callback(...arr);
        }
    }
    
    iter.filter = function * (callback, ...iters) {
        
    }
    
    iter.some = function * (callback, ...iters) {
        
    }

    iter.dropWhile = function * (callback, ...iters) {
        
    }
    
    iter.groupBy = function * (iterable, callback) {
        
    }
    
    iter.product = function * (...iters) {
        
    }
    
    iter.compress = function * (iterable, selectors) {
        
    }
    
    iter.reduce = function (callback, initValue, ...iters) {
        
    }
    
    iter.find = function (callback, iterable) {
        
    }
    
    iter.min = function (...iters) {
    
    }
    
    iter.max = function (...iters) {
        
    }
})();

#ES-Iter v.0.9.5

`Iter` is ES6 class which provides methods for efficient iteration within `for-of` loop or using external `Iterator`. It is inspired by Python's `itertools` module, but designed for JavaScript developers.  

##API

#### Glosary

* **Iterable**
An iterable is a data structure that wants to make its elements accessible to the public. It does so by implementing a method whose key is Symbol.iterator. That method is a factory for iterators.

* **Iterator**
A pointer for traversing the elements of a data structure (think cursors in databases).

Note: Following the built-in API every Iterator must be also and iterable. 

Follow this pattern for iterables: 

```javascript
let iterable = {
    [Symbol.iterator]() {
        let iterator = {
            [Symbol.iterator]() {
                return this;
            },
            
            next() {
                if(condition) {
                    return {value: value, done: false}
                }
                else {
                    return {done: true}
                }
            }
        }
        
        return iterator;
    }
}
```

#### Constructor

#####`Iter(iterable)`

Get `iterator` from `iterable` object and returns new `Iter` instance.

```javascript
let iter = new Iter([1, 2, 3]); 
```

#####`Iter(func)`

Get `iterator` from `func` call and returns new `Iter` instance. 

```javascript
let iter = new Iter(function* () {
    let [a, b] = [0, 1];
    while(true) {
        yield a;
        [a, b] = [b, a + b]
    }
}); 

// Takes first 10 fibbonacci numbers 
for (let i of iter.take(10)) {
    console.log(i);
}
```

**Note**: `Iter` instances are not multi iterable. It means if it's exhausted or closed cannot be iterated again.   

#### Static Methods

#####`Iter.getIterator(obj)`

Return an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator) object.

```javascript
let iterator = Iter.getIterator([1, 2, 3]);

iterator.next() //{ value: 1, done: false }
iterator.next() //{ value: 2, done: false }
iterator.next() //{ value: 3, done: false }
iterator.next() //{ value: undefined, done: true } 
```

Throws TypeError if object does not implement Iterator protocol (not iterable)

```javascript
//TypeError: obj[Symbol.iterator] is not a function
Iter.getIterator(Object.create(null)) 
```

#####`Iter.isIterator(obj)`

Returns **true** if `obj` implements Iterator protocol.  If `obj` is not an Iterator, `null` or `undefined` returns **false**.

Note: Iterator must be an **iterable**, otherwise `isIterator` returns **false**. It is in order to guarantee that every Iterator can be safely apply to `for-of` loop.

```javascript
let arr = [1, 2, 3];

Iter.isIterator(Iter.getIterator(arr)) //true
Iter.isIterator(arr[Symbol.iterator]()) //true

Iter.isIterator(arr) //false 
Iter.isIterator({}) //false
Iter.isIterator(null) //false
```


#####`Iter.isIterable(obj)`

Returns **true** if `obj` is iterable, otherwise **false**. Object is iterable if it implements method with key `Symbol.iterator`. 

If object is iterable safely can apply to `for-of` loops, `yield* iterable`, `...iterable`.

```javascript
Iter.isIterable([1, 2, 3]) //true
Iter.isIterable('ABC') //true
Iter.isIterable(new Map) //true
Iter.isIterable(new Set) //true

Iter.isIterable({}) //false
Iter.isIterable(456) //false
```

#####`Iter.isMultiIterable(obj)` 

Test if `obj` can be iterated multiple times using `for-of`. In other words `obj[Symbol.iterator]()` returns fresh Iterator on every call.

```javascript
let arr = [1, 2, 3, 4]
Iter.isMultiIterable(arr) //true

for (let v of arr) {
    console.log(v) //1 2 3 4
}

for (let v of arr) { 
    console.log(v) //1 2 3 4
}
```

```javascript
let iterArr = Iter.getIterator([1, 2, 3, 4]);
Iter.isMultiIterable(iterArr); //false

for (let v of iterArr) {
    console.log(v) //1 2 3 4
}

//Does not output anything, the `Iterator` is exhausted.
for (let v of iterArr) { 
    console.log(v)  
}
```


#####`Iter.isClosable(iterator)`
Returns **true** if `iterator` implements the optional `return` method, otherwise if the object is not `Iterator` or does not implement `return` method returns **false**  

```javascript
let iterator = {
    [Symbol.iterator]() {
        return this
    },
    next() {
        return {value: true, done: false}
    },
    return() {
        return {done: true}
    }
}

Iter.isClosable(iterator) //true
```

```javascript
let iterator = {
    [Symbol.iterator]() {
        return this
    },
    next() {
        return {value: true, done: false}
    }
}

Iter.isClosable(iterator) //false
```

#####`Iter.closeIterator(iterator)`

If the iteraror is closable calls its `return` method and returns `done` state of the iterator, otherwise returns **false**.

```javascript
let iterator = {
    [Symbol.iterator]() {
        return this
    },
    next() {
        return {value: true, done: false}
    },
    return() {
        return {done: true}
    }
}

Iter.closeIterator(iterator) //true
```

```javascript
let iterator = {
    [Symbol.iterator]() {
        return this
    },
    next() {
        return {value: true, done: false}
    }
}

Iter.closeIterator(iterator) //false
```

#####`Iter.closeAllIterators(...iterators)`

Calls `Iter.closeIterator` for each passed `iterator`.

```javascript
let iterator1 = [1, 2, 3].entries();
let iterator2 = new Map().entries();
let iterator3 = new Set([1, 2, 3]).entries();

Iter.closeAllIterators(iterator1, iterator2, iterator3);
```

#####`Iter.range(end)`
#####`Iter.range(start, end[, step])`

Creates new `Iter` instance which generates arithmetic progressions. The arguments must be plain integers.
With single argument, `start` is 0 and `end` is equal to passed value.
If the `step` argument is omitted, it defaults to 1 or -1 depends on `start` and `end` values.


```javascript
Iter.range(10); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
Iter.range(-10); // 0, -1, -2, -3, -4, -5, -6, -7, -8, -9

Iter.range(1, 11); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
Iter.range(11, 1); // 11, 10, 9, 8, 7, 6, 5, 4, 3, 2

Iter.range(0, 30, 5); // 0, 5, 10, 15, 20, 25
Iter.range(30, 0, -5); // 30, 25, 20, 15, 10, 5

Iter.range(20, 10, 2); //No output 
Iter.range(10, 20, -2); //No output
```

**Note**: Unlike Python version of `range` it does not throw error if `step` is 0. If `step` is any falsy value it uses default values 1 or -1 depends on `start` and `end` values. 


#### Infinite iterators

#####`Iter.count(start = 0, step = 1)`

Creates new `Iter` instance, that generates evenly spaced values starting with `start`. Often used as an argument to `zipMap()` to generate consecutive data points. Also, used with `zip()` to add sequence numbers.

```javascript
Iter.count(); // 0 1 2 3 4 ....

Iter.count(10); // 10 11 12 13 14 ...

Iter.count(1, 2); // 1 3 5 7 9 ....
```

**Note**: It always converts  arguments to integers.

#####`Iter.cycle(iterable)`

Creates new `Iter` instance, that generates elements from the `iterable` and saving a copy of each. When the `iterable` is exhausted, return elements from the saved copy. Repeats indefinitely.

```javascript
Iter.cycle('ABCD'); // A B C D A B C D A B C D ...
```

**Note**: It may require significant auxiliary storage (depending on the length of the `iterable`).

#####`Iter.repeat(val, times = Infinity)`

Creates new `Iter` instance, that generates `val` over and over again. Runs indefinitely unless the `times` argument is specified. Used as argument to `zipMap()` for invariant function parameters. Also used with `zip()` to create constant fields in returned array.

```javascript
Iter.repeat(10, 3); // 10 10 10
```


#####`toArray(...iterables)`

Consumes each `iterable` argument and returns array with the values. 

```javascript
toArray([1, 2, 3], 'ABC', new Set([1, 2, 3])); 
// [ 1, 2, 3, 'A', 'B', 'C', 1, 2, 3 ] 
```

It does not consume recursively `iterable`.

```javascript
toArray([[0, 'A'],  [1, 'B'], [2, 'C']])); 
// [[0, 'A'],  [1, 'B'], [2, 'C']] 
```

#####`zip(...iterables)`

Make a generator that aggregates elements from each of the iterables. On each iteration it yields array in form of `[it1i, it2i, it3i, ..., itni]`.
Used for lock-step iteration over several iterables at a time. When no iterables are specified, returns a zero length generator.

The left-to-right evaluation order of the iterables is guaranteed.

Should only be used with unequal length inputs when you don't care about trailing, unmatched values from the longer iterables. If those values are important, use `longestZip()` instead.

```javascript
zip('ABCD', 'xy'); 
// [ 'A', 'x' ] [ 'B', 'y' ]

zip(range(10), [1, 2, 3, 4, 5]); 
// [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ] [ 4, 5 ]
```

#####`longestZip(...iterables)`

Make a generator that aggregates elements from each of the iterables. On each iteration it yields array in form of `[it1i, it2i, it3i, ..., itni]`. If the iterables are of uneven length, missing values are filled-in with `undefined`. Iteration continues until the longest iterable is exhausted.

```javascript
longestZip('ABCD', 'xy'); 
// [ 'A', 'x' ] [ 'B', 'y' ] [ 'C', undefined ] [ 'D', undefined ]

longestZip(range(10), [1, 2, 3, 4, 5]); 
// [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ] [ 4, 5 ] [ 5, undefined ] [ 6, undefined ] [ 7, undefined ] [ 8, undefined ] [ 9, undefined ]
```

**Note**: If one of the iterables is potentially infinite, then the `longestZip()` function should be wrapped with something that limits the number of calls (for example `take()` or `takeWhile()`).

#####`enumerate(iterable, start)`

Make a generator that on each iteration returns an array containing a count (from start which defaults to 0) and the values obtained from iterating over iterable.

```javascript
enumerate([1, 2, 3, 4]); 
// [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ]

enumerate('ABC');        
// [ 0, 'A' ] [ 1, 'B' ] [ 2, 'C' ]
```

```javascript
enumerate([1, 2, 3, 4], 1); 
// [ 1, 1 ] [ 2, 2 ] [ 3, 3 ] [ 4, 4 ]

enumerate('ABC', 1);        
// [ 1, 'A' ] [ 2, 'B' ] [ 3, 'C' ]
```

#####`accumulate(iterable, callback = (x, y) => x + y)`

Make a generator that returns accumulated sums, or accumulated results of other binary functions (specified via the optional `callback` argument). If `callback` is supplied, it should be a function of two arguments.

```javascript
let data = [3, 4, 6, 2, 1, 9, 0, 7, 5, 8];


accumulate(data);            
// sum 3 7 13 15 16 25 25 32 37 45

accumulate(data, Math.max); 
// running max 3 4 6 6 6 9 9 9 9 9
```

#####`chain(...iterables)`

Make a generator that returns elements from the first `iterable` until it is exhausted, then proceeds to the next `iterable`, until all of the `iterables` are exhausted. Used for treating consecutive sequences as a single sequence.

```javascript
chain('ABC', 'DEF', 'GHI'); // A B C D E F G H I
```

#####`compress(data, selectors)`

Make a generator that filters elements from `data` returning only those that have a corresponding element in `selectors` that evaluates to `true`. Stops when either the `data` or `selectors` iterables has been exhausted.

```javascript
compress('ABCDEF', [1, 0, 1, 0, 1, 1]); //A C E F
```

#####`groupBy(iterable, key = (x) => x)`

Make a generator that returns consecutive keys and groups from the `iterable`. The `key` is a function computing a key value for each element. If not specified or `undefined`, `key` defaults to an identity and returns the element unchanged. Generally, the iterable needs to already be sorted on the same key function.

```javascript
let arr = [1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5];

groupBy(arr); 
// [ 1, [ 1, 1, 1, 1 ] ] [ 2, [ 2, 2 ] ] [ 3, [ 3 ] ] [ 4, [ 4, 4 ] ] [ 5, [ 5, 5, 5, 5 ] ]
```

```javscript
groupBy('AAABBBCDEE', (x) => x.charCodeAt());
// [ 65, [ 'A', 'A', 'A' ] ] [ 66, [ 'B', 'B', 'B' ] ] [ 67, [ 'C' ] ] [ 68, [ 'D' ] ] [ 69, [ 'E', 'E' ] ] 
```

#####`zipMap(...iterables[, callback])`

Make a generator that computes the `callback` using arguments from each of the `iterables`. If `callback` is not specified, then `zipMap()` returns same result as `zip`. It stops when the shortest `iterable` is exhausted.

```javascript
zipMap([1, 2, 3], [1, 2, 3], Math.pow); 
// 1 4 27
```

#####`longestZipMap(...iterables[, callback])`

Make a generator that computes the `callback` using arguments from each of the `iterables`. If `callback` is not specified, then `longestZipMap()` returns same result as `longestZip`. It stops when the longest `iterable` is exhausted, filling in `undefined` for shorter iterables.

```javascript
longestZipMap([1, 2, 3], [1, 2, 3, 4, 5], (x = 1, y) => Math.pow(x, y)); 
// 1 4 27 1 1
```

#####`spreadMap(iterable, callback)`

Make a generator that computes the `callback` using arguments obtained from the `iterable`. Used instead of `zipMap()` when argument parameters are already grouped in a single iterable (the data has been "pre-zipped").

```javascript
spreadMap([[2, 5], [3, 2], [10, 3]], Math.pow); 
// 32 9 1000
```

#####`take(iterable, n = Infinity)`

Make a generator that takes `n` elements from `iterable`.

```javascript
take([1, 2, 3, 4, 5], 2); // 1 2
```

#####`drop(iterable, n = Infinity)`

Make a generator that drops `n` elements from `iterable`.

```javascript 
drop([1, 2, 3, 4, 5], 2); // 3 4 5
```

#####`dropWhile(iterable, callback = Boolean)`

Make a generator that drops elements from the `iterable` as long as the `callback` is true; afterwards, returns every element. Note, the generator does not produce any output until the `callback` first becomes false, so it may have a lengthy start-up time.

```javascript
dropWhile([1, 2, 3, 4, 5, 6], (x) => x <= 3); // 4 5 6  
```

#####`takeWhile(iterable, callback = Boolean)`

Make a generator that returns elements from the `iterable` as long as the `callback` is true.

```javascript
takeWhile([1, 2, 3, 4, 5, 6], (x) => x <= 3); // 1 2 3
```

#####`filter(iterable, callback = Boolean)`

Make a generator that filters elements from `iterable` returning only those for which the `callback` is `true`. If `callback` not specified or `undefined`, return the items that are evaluated to `true`.

```javascript
filter(range(10), (x) => x % 2); // 1 3 5 7 9
```

#####`filterFalse(iterable, callback = Boolean)`

Make a generator that filters elements from `iterable` returning only those for which the `callback` is `false`. If `callback` not specified or `undefined`, return the items that are evaluated to `false`.

```javascript
filterFalse(range(10), (x) => x % 2); // 0 2 4 6 8
```

#### Combinatoric generators

#####`product(a = [], b = [], ...iterables)`

Cartesian product of `a`, `b` and `iterables`.

```javascript
product(); // []
product([1, 2, 3]); // []

product([1, 2, 3], 'AB');
// [ 1, 'A' ] [ 1, 'B' ] [ 2, 'A' ] [ 2, 'B' ] [ 3, 'A' ] [ 3, 'B' ]
 
```

#####`permutations(iterable, r)`

Return successive `r` length permutations of elements in the `iterable`.

If `r` is not specified or is `undefined`, then `r` defaults to the length of the `iterable` and all possible full-length permutations are generated.

Permutations are emitted in lexicographic sort order. So, if the input `iterable` is sorted, the permutation arrays will be produced in sorted order.

Elements are treated as unique based on their position, not on their value. So if the input elements are unique, there will be no repeat values in each permutation.

```javascript
permutations('ABCD', 2); 
// [ 'A', 'B' ] [ 'A', 'C' ] [ 'A', 'D' ] [ 'B', 'A' ] 
// [ 'B', 'C' ] [ 'B', 'D' ] [ 'C', 'A' ] [ 'C', 'B' ] 
// [ 'C', 'D' ] [ 'D', 'A' ] [ 'D', 'B' ] [ 'D', 'C' ]
```

```javascript  
permutations(range(3));
// [ 0, 1, 2 ] [ 0, 2, 1 ] [ 1, 0, 2 ] 
// [ 1, 2, 0 ] [ 2, 0, 1 ] [ 2, 1, 0 ]
```

#####`combinations(iterable, r)`

Return `r` length subsequences of elements from the input `iterable`.

Combinations are emitted in lexicographic sort order. So, if the input `iterable` is sorted, the combination arrays will be produced in sorted order.

Elements are treated as unique based on their position, not on their value. So if the input elements are unique, there will be no repeat values in each combination.

```javascript
combinations('ABCD', 2); 
// [ 'A', 'B' ] [ 'A', 'C' ] [ 'A', 'D' ] 
// [ 'B', 'C' ] [ 'B', 'D' ] [ 'C', 'D' ]
```

```javascript
combinations(range(4), 3);
// [ 0, 1, 2 ] [ 0, 1, 3 ] [ 0, 2, 3 ] [ 1, 2, 3 ]
```

##Author

Asen Bozhilov

##Credits 

Axel Rauschmayer and his excellent book [Exploring ES6](http://exploringjs.com/)

##License

**MIT**  


#ES-Iter v.0.9.7

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

Iter.closeIterator(iterator); //true
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

Iter.closeIterator(iterator); //false
```

#####`Iter.keys(obj)`

Creates new `Iter` instance which can be used to iterate over the `obj` keys. If `obj` has `keys` method it is used, otherwise `Reflect.enumerate`.

```javascript
Iter.keys({
    foo : 1,
    bar : 2
});

// 'foo' 'bar'
```

```javascript
Iter.keys(new Map([
    ['foo', 1],
    ['bar', 2]
]));

// 'foo' 'bar'
```

```javascript
Iter.keys([1, 2, 3]);

// 0 1 2
```

#####`Iter.entries(obj)`

Creates new `Iter` instance which can be used to iterate over the `obj` entries. If `obj` has `entries` method it is used, otherwise generates pairs of `[key, value]`.

```javascript
Iter.entries({
    foo : 1,
    bar : 2
});

// ['foo', 1] ['bar', 2]
```

#####`Iter.values(obj)`

Creates new `Iter` instance which can be used to iterate over the `obj` values. If `obj` has `values` method it is used.

```javascript
Iter.values({
    foo : 1,
    bar : 2
});

// 1 2
```

#####`Iter.reverse(arrayLike)`

Creates new `Iter` instance which iterates the `arrayLike` obj in reversed order from right to left. 

```javascript
Iter.reverse([1, 2, 3]); // 3 2 1
Iter.reverse('ABC'); // C B A
```

#####`Iter.range(start = 0, end, step = 1)`

Creates new `Iter` instance which generates arithmetic progressions. The arguments must be plain integers.


```javascript
Iter.range(5); // 0 1 2 3 4

Iter.range(1, 5); // 1 2 3 4

Iter.range(0, 20, 6); // 0 6 12 18

Iter.range(0, -5, -1); // 0 -1 -2 -3 -4
```


#####`Iter.rangeRight(start = 0, end, step = 1)`

Same as `Iter.range` but generates the `range` in reversed order. 

```javascript
Iter.rangeRight(5); // 4 3 2 1 0

Iter.rangeRight(1, 5); // 4 3 2 1

Iter.rangeRight(0, 20, 6); // 18 12 6 0

Iter.rangeRight(0, -5, -1); // -4 -3 -2 -1 0
```

#####`Iter.zip(iterable, ...iterables?)`

Creates new `Iter` instance, that aggregates elements from each of the iterables. On each iteration it yields array.
Used for lock-step iteration over several iterables at a time. When no iterables are specified, returns a zero length generator.

The left-to-right evaluation order of the iterables is guaranteed.

Should only be used with unequal length inputs when you don't care about trailing, unmatched values from the longer iterables. If those values are important, use `Iter.longZip()` instead.

```javascript
Iter.zip('ABCD', 'xy'); 
// [ 'A', 'x' ] [ 'B', 'y' ]

Iter.zip(Iter.range(10), [1, 2, 3, 4, 5]); 
// [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ] [ 4, 5 ]
```

#####`Iter.longZip(iterable, ...iterables?)`

Creates new `Iter` instance, that aggregates elements from each of the iterables. On each iteration it yields array. If the iterables are of uneven length, missing values are filled-in with `undefined`. Iteration continues until the longest iterable is exhausted.

```javascript
Iter.longZip('ABCD', 'xy'); 
// [ 'A', 'x' ] [ 'B', 'y' ] [ 'C', undefined ] [ 'D', undefined ]

Iter.longZip(Iter.range(10), [1, 2, 3, 4, 5]); 
// [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ] [ 4, 5 ] [ 5, undefined ] [ 6, undefined ] [ 7, undefined ] [ 8, undefined ] [ 9, undefined ]
```

**Note**: If one of the iterables is potentially infinite, then the `Iter.longZip()` function should be used with something that limits the number of calls (for example `take()` or `takeWhile()`).

#####`Iter.count(start = 0, step = 1)`

Creates new `Iter` instance, that generates evenly spaced values starting with `start`.

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

#####`Iter.repeat(value, times = Infinity)`

Creates new `Iter` instance, that generates `val` over and over again. Runs indefinitely unless the `times` argument is specified. Often used with `Iter.zip()` to create constant fields in returned array.

```javascript
Iter.repeat(10, 3); // 10 10 10
```

#### Prototype Methods


#####`enumerate(start = 0)`

Creates new `Iter` instance, that on each iteration returns an array containing a count (from start which defaults to 0) and the values obtained from iterating over `this`.

```javascript
new Iter([1, 2, 3, 4]).enumerate(); 
// [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ]

new Iter('ABC').enumerate();        
// [ 0, 'A' ] [ 1, 'B' ] [ 2, 'C' ]
```

```javascript
new Iter([1, 2, 3, 4]).enumerate(1); 
// [ 1, 1 ] [ 2, 2 ] [ 3, 3 ] [ 4, 4 ]

new Iter('ABC').enumerate(1);        
// [ 1, 'A' ] [ 2, 'B' ] [ 3, 'C' ]
```

#####`accumulate(callback = (x, y) => x + y)`

Creates new `Iter` instance, that returns accumulated sums, or accumulated results of other binary functions (specified via the optional `callback` argument). If `callback` is supplied, it should be a function of two arguments.

```javascript
let data = [3, 4, 6, 2, 1, 9, 0, 7, 5, 8];


new Iter(data).accumulate();            
// sum 3 7 13 15 16 25 25 32 37 45

new Iter(data).accumulate(Math.max); 
// running max 3 4 6 6 6 9 9 9 9 9
```

#####`chain(...iterables)`

Creates new `Iter` instance, that returns elements first from `this`, then first `iterable` until it is exhausted, then proceeds to the next `iterable`, until all of the `iterables` are exhausted. Used for treating consecutive sequences as a single sequence.

```javascript
new Iter('ABC').chain('DEF', 'GHI'); // A B C D E F G H I
```

#####`compress(selectors)`

Creates new `Iter` instance, that filters elements returning only those that have a corresponding element in `selectors` that evaluates to `true`. Stops when either the `this` or `selectors` iterables has been exhausted.

```javascript
new Iter('ABCDEF').compress([1, 0, 1, 0, 1, 1]); //A C E F
```

#####`groupBy(key = (x) => x)`

Creates new `Iter` instance, that returns consecutive keys and groups. The `key` is a function computing a key value for each element. If not specified or `undefined`, `key` defaults to an identity and returns the element unchanged. Generally, the iterable needs to already be sorted on the same key function.

```javascript
let arr = [1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5];

new Iter(arr).groupBy(); 
// [ 1, [ 1, 1, 1, 1 ] ] [ 2, [ 2, 2 ] ] [ 3, [ 3 ] ] [ 4, [ 4, 4 ] ] [ 5, [ 5, 5, 5, 5 ] ]
```

```javscript
new Iter('AAABBBCDEE').groupBy((x) => x.charCodeAt());
// [ 65, [ 'A', 'A', 'A' ] ] [ 66, [ 'B', 'B', 'B' ] ] [ 67, [ 'C' ] ] [ 68, [ 'D' ] ] [ 69, [ 'E', 'E' ] ] 
```

#####`map(callback = (x) => x)`

Creates new `Iter` instance, that computes the `callback` using argument from `this`.

```javascript
new Iter([1, 2, 3]).map((x) => x * x); 
// 1 4 9
```

#####`flatMap(callback = (x) => x)`

Flattens recursively and apply `callback` for each value. 

```javascript
let arr = [[1, [2, 3, 4], 5], 6, 7, [[[8, 9]]], 10];

new Iter(arr).flatMap(); 
// 1 2 3 4 5 6 7 8 9 10

new Iter(arr).flatMap(x => x * x); 
// 1 4 9 16 25 36 49 64 81 100
```

#####`spreadMap(callback)`

Creates new `Iter` instance, that computes the `callback` using arguments obtained from the `this`. Used when argument parameters are already grouped in a single iterable (the data has been "pre-zipped").

```javascript
new Iter([[2, 5], [3, 2], [10, 3]]).spreadMap(Math.pow); 
// 32 9 1000
```

#####`take(n = Infinity)`

Creates new `Iter` instance, that takes `n` elements.

```javascript
new Iter([1, 2, 3, 4, 5]).take(2); // 1 2
```

#####`drop(n = Infinity)`

Creates new `Iter` instance, that drops `n` elements.

```javascript 
new Iter([1, 2, 3, 4, 5]).drop(2); // 3 4 5
```

#####`dropWhile(callback = Boolean)`

Creates new `Iter` instance, that drops elements as long as the `callback` is true; afterwards, returns every element. Note, it does not produce any output until the `callback` first becomes false, so it may have a lengthy start-up time.

```javascript
new Iter([1, 2, 3, 4, 5, 6]).dropWhile((x) => x <= 3); // 4 5 6  
```

#####`takeWhile(callback = Boolean)`

Creates new `Iter` instance, that returns elements as long as the `callback` is true.

```javascript
new Iter([1, 2, 3, 4, 5, 6]).takeWhile((x) => x <= 3); // 1 2 3
```

#####`filter(callback = Boolean)`

Creates new `Iter` instance, that filters elements returning only those for which the `callback` is `true`. If `callback` not specified or `undefined`, return the items that are evaluated to `true`.

```javascript
Iter.range(10).filter((x) => x % 2); // 1 3 5 7 9
```

#####`filterFalse(callback = Boolean)`

Creates new `Iter` instance, that filters elements returning only those for which the `callback` is `false`. If `callback` not specified or `undefined`, return the items that are evaluated to `false`.

```javascript
Iter.range(10).filterFalse((x) => x % 2); // 0 2 4 6 8
```

#####`product(b = [], ...iterables)`

Creates new `Iter` instance, that generates cartesian product of `this`, `b` and `iterables`.

```javascript
new Iter([1, 2, 3]).product(); // [] product with empty set

new Iter([1, 2, 3]).product('AB');
// [ 1, 'A' ] [ 1, 'B' ] [ 2, 'A' ] [ 2, 'B' ] [ 3, 'A' ] [ 3, 'B' ]
 
```

#####`permutations(r = Infinity)`

Creates new `Iter` instance, that returns successive `r` length permutations.

If `r` is not specified or is `undefined`, then all possible full-length permutations are generated.

Permutations are emitted in lexicographic sort order. So, if the `this` is sorted, the permutation arrays will be produced in sorted order.

Elements are treated as unique based on their position, not on their value. So if the input elements are unique, there will be no repeat values in each permutation.

```javascript
new Iter('ABCD').permutations(2); 
// [ 'A', 'B' ] [ 'A', 'C' ] [ 'A', 'D' ] [ 'B', 'A' ] 
// [ 'B', 'C' ] [ 'B', 'D' ] [ 'C', 'A' ] [ 'C', 'B' ] 
// [ 'C', 'D' ] [ 'D', 'A' ] [ 'D', 'B' ] [ 'D', 'C' ]
```

```javascript  
Iter.range(3).permutations();
// [ 0, 1, 2 ] [ 0, 2, 1 ] [ 1, 0, 2 ] 
// [ 1, 2, 0 ] [ 2, 0, 1 ] [ 2, 1, 0 ]
```

#####`combinations(r)`

Creates new `Iter` instance, that returns `r` length subsequences of elements.

Combinations are emitted in lexicographic sort order. So, if the `this` is sorted, the combination arrays will be produced in sorted order.

Elements are treated as unique based on their position, not on their value. So if the input elements are unique, there will be no repeat values in each combination.

```javascript
new Iter('ABCD').combinations(2); 
// [ 'A', 'B' ] [ 'A', 'C' ] [ 'A', 'D' ] 
// [ 'B', 'C' ] [ 'B', 'D' ] [ 'C', 'D' ]
```

```javascript
Iter.range(4).combinations(3);
// [ 0, 1, 2 ] [ 0, 1, 3 ] [ 0, 2, 3 ] [ 1, 2, 3 ]
```

#####`toIterator()`

Returns external `iterator` usefull for manual iteration. 

```javascript
let iterator = Iter.range(5).filter(x => x > 2).toIterator();

iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: 4, done: false }
iterator.next(); // { value: undefined, done: true }
```

#####`toArray()`

```javascript
Iter.range(5).filter(x => x > 2).toArray(); // [ 3, 4 ]
```

## Browsers Support

Currently there is no browser with full support of ES6, but the library can be used with [Babel](https://babeljs.io/) transpiler.

##Author

Asen Bozhilov - [@abozhilov](https://twitter.com/abozhilov)

##Credits 

[Dr. Axel Rauschmayer](http://www.2ality.com/) and his excellent book [Exploring ES6](http://exploringjs.com/)

##License

**MIT**  


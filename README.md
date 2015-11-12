#IterJS v.0.8.0

Itertools for JavaScript.

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

#####`getIterator(obj)`

Return an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator) object.

```javascript
let iterator = getIterator([1, 2, 3])

iterator.next() //{ value: 1, done: false }
iterator.next() //{ value: 2, done: false }
iterator.next() //{ value: 3, done: false }
iterator.next() //{ value: undefined, done: true } 
```

Throws TypeError if object does not implement Iterator protocol (not iterable)

```javascript
//TypeError: obj[Symbol.iterator] is not a function
getIterator(Object.create(null)) 
```

#####`isIterator(obj)`

Returns **true** if `obj` implements Iterator protocol.  If `obj` is not an Iterator, `null` or `undefined` returns **false**.

Note: Iterator must be an **iterable**, otherwise `isIterator` returns **false**. It is in order to guarantee that every Iterator can be safely apply to `for-of` loop.

```javascript
let arr = [1, 2, 3];

isIterator(getIterator(arr)) //true
isIterator(arr[Symbol.iterator]()) //true

isIterator(arr) //false 
isIterator({}) //false
isIterator(null) //false
```


#####`isIterable(obj)`

Returns **true** if `obj` is iterable, otherwise **false**. Object is iterable if it implements method with key `Symbol.iterator`. 

If object is iterable safely can apply to `for-of` loops, `yield* iterable`, `...iterable`.

```javascript
isIterable([1, 2, 3]) //true
isIterable('ABC') //true
isIterable(new Map) //true
isIterable(new Set) //true

isIterable({}) //false
isIterable(456) //false
```

#####`isMultiIterable(obj)` 

Test if `obj` can be iterated multiple times using `for-of`. In other words `obj[Symbol.iterator]()` returns fresh Iterator on every call.

```javascript
let arr = [1, 2, 3, 4]
isMultiIterable(arr) //true

for (let v of arr) {
    console.log(v) //1 2 3 4
}

for (let v of arr) { 
    console.log(v) //1 2 3 4
}
```

```javascript
let iterArr = getIterator([1, 2, 3, 4])
isMultiIterable(iterArr) //false

for (let v of iterArr) {
    console.log(v) //1 2 3 4
}

//Does not output anything, the `Iterator` is exhausted.
for (let v of iterArr) { 
    console.log(v)  
}
```


#####`isClosable(iterator)`
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

isClosable(iterator) //true
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

isClosable(iterator) //false
```

#####`closeIterator(iterator)`

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

closeIterator(iterator); //true
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

closeIterator(iterator); //false
```

#####`closeAllIterators(...iterators)`

Calls `closeIterator` for each passed `iterator`.

```javascript
let iterator1 = [1, 2, 3].entries();
let iterator2 = new Map().entries();
let iterator3 = new Set([1, 2, 3]).entries();

closeAllIterators(iterator1, iterator2, iterator3);
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


#####`range(end)`
#####`range(start, end[, step])`

This is a versatile function to create generator of arithmetic progressions. The arguments must be plain integers.
With single argument `start` is 0 and `end` is equal to passed value.
If the `step` argument is omitted, it defaults to 1 or -1 depends on `start` and `end` values.


```javascript
range(10); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
range(-10); // 0, -1, -2, -3, -4, -5, -6, -7, -8, -9

range(1, 11); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
range(11, 1); // 11, 10, 9, 8, 7, 6, 5, 4, 3, 2

range(0, 30, 5); // 0, 5, 10, 15, 20, 25
range(30, 0, -5); // 30, 25, 20, 15, 10, 5

range(20, 10, 2); //No output 
range(10, 20, -2); //No output
```

**Note**: Unlike Python version of `range` it does not throw error if `step` is 0. If `step` is any falsy value it uses default values 1 or -1 depends on `start` and `end` values. 

#####`zip(...iterables)`

Make a generator that aggregates elements from each of the iterables. On each iteration it yields array in form of `[it1i, it2i, it3i, ..., itni]`.
Used for lock-step iteration over several iterables at a time. When no iterables are specified, returns a zero length generator.

The left-to-right evaluation order of the iterables is guaranteed.

Should only be used with unequal length inputs when you don't care about trailing, unmatched values from the longer iterables. If those values are important, use `longestZip()` instead.

```javascript
zip('ABCD', 'xy'); // [ 'A', 'x' ] [ 'B', 'y' ]

zip(range(10), [1, 2, 3, 4, 5]); // [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ] [ 4, 5 ]
```

#####`longestZip(...iterables)`

Make a generator that aggregates elements from each of the iterables. On each iteration it yields array in form of `[it1i, it2i, it3i, ..., itni]`. If the iterables are of uneven length, missing values are filled-in with `undefined`. Iteration continues until the longest iterable is exhausted.

```javascript
longestZip('ABCD', 'xy'); // [ 'A', 'x' ] [ 'B', 'y' ] [ 'C', undefined ] [ 'D', undefined ]

longestZip(range(10), [1, 2, 3, 4, 5]); // [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ] [ 4, 5 ] [ 5, undefined ] [ 6, undefined ] [ 7, undefined ] [ 8, undefined ] [ 9, undefined ]
```

**Note**: If one of the iterables is potentially infinite, then the `longestZip()` function should be wrapped with something that limits the number of calls (for example `take()` or `takeWhile()`).

#####`enumerate(iterable, start)`

Make a generator that on each iteration returns an array containing a count (from start which defaults to 0) and the values obtained from iterating over iterable.

```javascript
enumerate([1, 2, 3, 4]); // [ 0, 1 ] [ 1, 2 ] [ 2, 3 ] [ 3, 4 ]
enumerate('ABC');        // [ 0, 'A' ] [ 1, 'B' ] [ 2, 'C' ]
```

```javascript
enumerate([1, 2, 3, 4], 1); // [ 1, 1 ] [ 2, 2 ] [ 3, 3 ] [ 4, 4 ]
enumerate('ABC', 1);        // [ 1, 'A' ] [ 2, 'B' ] [ 3, 'C' ]
```

#####`accumulate(iterable, callback = (x, y) => x + y)`

#####`chain(...iterables)`

#####`compress(data, selectors)`

#####`groupBy(iterable, key = (x) => x)`

#####`zipMap(...iterables, callback)`

#####`longestZipMap(...iterables, callback)`

#####`spreadMap(iterable, callback)`

#####`take(iterable, n)`

#####`drop(iterable, n)`

#####`dropWhile(iterable, callback = Boolean)`

#####`takeWhile(iterable, callback = Boolean)`

#####`filter(iterable, callback = Boolean)`

#####`filterFalse(iterable, callback = Boolean)`

#### Infinite generators

#####`count(start, step)`

#####`cycle(iterable)`

#####`repeat(val, times = Infinity)`

#### Combinatoric generators

#####`product(...iterables)`

#####`permutations(iterable, r)`

#####`combinations(iterable, r)`

##Author

Asen Bozhilov

##Credits 

Axel Rauschmayer and his excellent book [Exploring ES6](http://exploringjs.com/)

##License

**MIT**  


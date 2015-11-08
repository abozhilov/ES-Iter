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

```javascript:
toArray([1, 2, 3], 'ABC', new Set([1, 2, 3])); 
// [ 1, 2, 3, 'A', 'B', 'C', 1, 2, 3 ] 
```

It does not consume recursively `iterable`.

```javascript:
toArray([[0, 'A'],  [1, 'B'], [2, 'C']])); 
// [[0, 'A'],  [1, 'B'], [2, 'C']] 
```


#####`range(end)`
#####`range(start, end[, step])`

#####`zip(...iterables)`

#####`longestZip(...iterables)`

#####`enumerate(iterable, start)`

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


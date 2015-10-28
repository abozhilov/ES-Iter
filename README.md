#IterJS v.0.7.0

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
                while(condition) {
                    return {value: value, done: false}
                }
                return {done: true}
            }
        }
        
        return iterator;
    }
}
```

#####`getIterator(obj)`

Return an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator) object.

```javascript
let iter = itertools.getIterator([1, 2, 3])

iter.next() //{ value: 1, done: false }
iter.next() //{ value: 2, done: false }
iter.next() //{ value: 3, done: false }
iter.next() //{ value: undefined, done: true } 
```

Throws TypeError if object does not implement Iterator protocol (not iterable)

```javascript
//TypeError: obj[Symbol.iterator] is not a function
itertools.getIterator(Object.create(null)) 
```

#####`isIterator(obj)`

Returns **true** if `obj` implements Iterator protocol.  If `obj` is not an Iterator, `null` or `undefined` returns **false**.

Note: Iterator must be an **iterable**, otherwise `isIterator` returns **false**. It is in order to guarantee that every Iterator can be safely apply to `for-of` loop.

```javascript
let arr = [1, 2, 3];

itertools.isIterator(itertools.getIterator(arr)) //true
itertools.isIterator(arr[Symbol.iterator]()) //true

itertools.isIterator(arr) //false 
itertools.isIterator({}) //false
itertools.isIterator(null) //false
```


#####`isIterable(obj)`

Returns **true** if `obj` is iterable, otherwise **false**. Object is iterable if it implements method with key `Symbol.iterator`. 

If object is iterable safely can apply to `for-of` loops, `yield* iterable`, `...iterable`.

```javascript
itertools.isIterable([1, 2, 3]) //true
itertools.isIterable('ABC') //true
itertools.isIterable(new Map) //true
itertools.isIterable(new Set) //true

itertools.isIterable({}) //false
itertools.isIterable(456) //false
```

#####`isMultiIterable(obj)` 

Test if `obj` can be iterated multiple times using `for-of`. In other words `obj[Symbol.iterator]()` returns fresh Iterator on every call.

```javascript
let arr = [1, 2, 3, 4]
itertools.isMultiIterable(arr) //true

for (let v of arr) {
    console.log(v) //1 2 3 4
}

for (let v of arr) { 
    console.log(v) //1 2 3 4
}

let iterArr = itertools.getIterator([1, 2, 3, 4])
itertools.isMultiIterable(iterArr) //false

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
let iter = {
    [Symbol.iterator]() {
        return this
    },
    next() {
        return {value: true, done: false}
    },
    return() {
        console.log('Clean up iterator logic')
        return {done: true}
    }
}

itertools.isClosable(iter) //true
```

```javascript
let iter = {
    [Symbol.iterator]() {
        return this
    },
    next() {
        return {value: true, done: false}
    }
}

itertools.isClosable(iter) //false
```

#####`closeIterator(iterator)`

#####`closeAllIterators(...iterators)`

#####`toArray(...iterables)`

#####`range(start, end, step)`

#####`zip(...iterables)`

#####`longestZip(...iterables)`

#####`count(start, step)`

#####`cycle(iterable)`

#####`repeat(val, times = Infinity)`

#####`enumerate(iterable, start)`

#####`chain(...iterables)`

#####`groupBy(iterable, key = (x) => x)`

#####`map(callback, ...iterables)`

#####`longestMap(callback, ...iterables)`

#####`spreadMap(callback, iterable)`

#####`compress(data, selectors)`

#####`take(n, iterable)`

#####`drop(n, iterable)`

#####`dropWhile(callback, iterable)`

#####`takeWhile(callback, iterable)`

#####`filter(callback = Boolean, iterable)`

#####`filterFalse(callback = Boolean, iterable)`

#####`accumulate(iterable, callback = (x, y) => x + y)`

#####`product(...iterables)`

#####`permutations(iterable, r)`

#####`combinations(iterable, r)`

##Author

Asen Bozhilov

##Credits 

Axel Rauschmayer and his excellent book [Exploring ES6](http://exploringjs.com/)

##License

**MIT**  


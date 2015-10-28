#IterJS v.0.7.0

Itertools for JavaScript.

##API

#### Terminology

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
itertools.getIterator(Object.create(null)) //TypeError: obj[Symbol.iterator] is not a function
```

#####`isIterator(obj)`

#####`isIterable(obj)`

#####`isMultiIterable(obj)` 

#####`isClosable(iterator)`


##Author

Asen Bozhilov

##Credits 

Axel Rauschmayer and his excellent book [Exploring ES6](http://exploringjs.com/)

##License

**MIT**  


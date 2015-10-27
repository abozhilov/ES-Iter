#IterJS v.0.7.0

Itertools for JavaScript.

##API

#####`getIterator(obj)`

Return an [iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator object.

```javascript
let iter = itertools.getIterator([1, 2, 3]);

iter.next() //{ value: 1, done: false }
iter.next() //{ value: 2, done: false }
iter.next() //{ value: 3, done: false }
iter.next() //{ value: undefined, done: true } 
```

Throws TypeError if object does not implement Iterator protocol (is not iterable)

```javascript
itertools.getIterator(Object.create(null)) //TypeError: obj[Symbol.iterator] is not a function
```

#####`isIterator(obj)`

#####`isIterable(obj)`

#####`isMultiIterable(obj)` 

#####`isClosable(iterator)`


##License

**MIT**  


##Author

Asen Bozhilov

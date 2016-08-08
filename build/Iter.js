'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Iter = function () {
    function Iter(iterable) {
        _classCallCheck(this, Iter);

        var iterator = Iter.getIterator(typeof iterable === 'function' ? iterable() : iterable);

        this[Symbol.iterator] = function () {
            return iterator;
        };
    }

    _createClass(Iter, [{
        key: 'enumerate',
        value: function enumerate() {
            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            return Iter.zip(Iter.count(start), this);
        }
    }, {
        key: 'accumulate',
        value: function accumulate() {
            var callback = arguments.length <= 0 || arguments[0] === undefined ? function (x, y) {
                return x + y;
            } : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee() {
                var next, acc;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                next = iterator.next(), acc = next.value;

                                if (next.done) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 5;
                                return acc;

                            case 5:
                                if ((next = iterator.next()).done) {
                                    _context.next = 11;
                                    break;
                                }

                                acc = callback(acc, next.value);
                                _context.next = 9;
                                return acc;

                            case 9:
                                _context.next = 5;
                                break;

                            case 11:
                                _context.prev = 11;

                                Iter.closeIterator(iterator);
                                return _context.finish(11);

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0,, 11, 14]]);
            }));
        }
    }, {
        key: 'chain',
        value: function chain() {
            for (var _len = arguments.length, iterables = Array(_len), _key = 0; _key < _len; _key++) {
                iterables[_key] = arguments[_key];
            }

            var iterators = [this].concat(iterables).map(Iter.getIterator);

            return new Iter(regeneratorRuntime.mark(function _callee2() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, it;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context2.prev = 3;
                                _iterator = iterators[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context2.next = 11;
                                    break;
                                }

                                it = _step.value;
                                return _context2.delegateYield(it, 't0', 8);

                            case 8:
                                _iteratorNormalCompletion = true;
                                _context2.next = 5;
                                break;

                            case 11:
                                _context2.next = 17;
                                break;

                            case 13:
                                _context2.prev = 13;
                                _context2.t1 = _context2['catch'](3);
                                _didIteratorError = true;
                                _iteratorError = _context2.t1;

                            case 17:
                                _context2.prev = 17;
                                _context2.prev = 18;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 20:
                                _context2.prev = 20;

                                if (!_didIteratorError) {
                                    _context2.next = 23;
                                    break;
                                }

                                throw _iteratorError;

                            case 23:
                                return _context2.finish(20);

                            case 24:
                                return _context2.finish(17);

                            case 25:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[3, 13, 17, 25], [18,, 20, 24]]);
            }));
        }
    }, {
        key: 'compress',
        value: function compress(selectors) {
            var iterator = Iter.zip(this, selectors);

            return new Iter(regeneratorRuntime.mark(function _callee3() {
                var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, v, s;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context3.prev = 3;
                                _iterator2 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context3.next = 15;
                                    break;
                                }

                                _step2$value = _slicedToArray(_step2.value, 2);
                                v = _step2$value[0];
                                s = _step2$value[1];

                                if (!s) {
                                    _context3.next = 12;
                                    break;
                                }

                                _context3.next = 12;
                                return v;

                            case 12:
                                _iteratorNormalCompletion2 = true;
                                _context3.next = 5;
                                break;

                            case 15:
                                _context3.next = 21;
                                break;

                            case 17:
                                _context3.prev = 17;
                                _context3.t0 = _context3['catch'](3);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context3.t0;

                            case 21:
                                _context3.prev = 21;
                                _context3.prev = 22;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 24:
                                _context3.prev = 24;

                                if (!_didIteratorError2) {
                                    _context3.next = 27;
                                    break;
                                }

                                throw _iteratorError2;

                            case 27:
                                return _context3.finish(24);

                            case 28:
                                return _context3.finish(21);

                            case 29:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[3, 17, 21, 29], [22,, 24, 28]]);
            }));
        }
    }, {
        key: 'groupBy',
        value: function groupBy() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
                return x;
            } : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee4() {
                var k, arr, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, v, res;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                k = {};
                                arr = [];
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;
                                _context4.prev = 5;
                                _iterator3 = iterator[Symbol.iterator]();

                            case 7:
                                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    _context4.next = 20;
                                    break;
                                }

                                v = _step3.value;
                                res = key(v);

                                if (!(res !== k)) {
                                    _context4.next = 16;
                                    break;
                                }

                                if (!arr.length) {
                                    _context4.next = 14;
                                    break;
                                }

                                _context4.next = 14;
                                return [k, arr];

                            case 14:
                                arr = [];
                                k = res;

                            case 16:
                                arr.push(v);

                            case 17:
                                _iteratorNormalCompletion3 = true;
                                _context4.next = 7;
                                break;

                            case 20:
                                _context4.next = 26;
                                break;

                            case 22:
                                _context4.prev = 22;
                                _context4.t0 = _context4['catch'](5);
                                _didIteratorError3 = true;
                                _iteratorError3 = _context4.t0;

                            case 26:
                                _context4.prev = 26;
                                _context4.prev = 27;

                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }

                            case 29:
                                _context4.prev = 29;

                                if (!_didIteratorError3) {
                                    _context4.next = 32;
                                    break;
                                }

                                throw _iteratorError3;

                            case 32:
                                return _context4.finish(29);

                            case 33:
                                return _context4.finish(26);

                            case 34:
                                if (!arr.length) {
                                    _context4.next = 37;
                                    break;
                                }

                                _context4.next = 37;
                                return [k, arr];

                            case 37:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[5, 22, 26, 34], [27,, 29, 33]]);
            }));
        }
    }, {
        key: 'map',
        value: function map() {
            var callback = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
                return x;
            } : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee5() {
                var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, v;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _iteratorNormalCompletion4 = true;
                                _didIteratorError4 = false;
                                _iteratorError4 = undefined;
                                _context5.prev = 3;
                                _iterator4 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                    _context5.next = 12;
                                    break;
                                }

                                v = _step4.value;
                                _context5.next = 9;
                                return callback(v);

                            case 9:
                                _iteratorNormalCompletion4 = true;
                                _context5.next = 5;
                                break;

                            case 12:
                                _context5.next = 18;
                                break;

                            case 14:
                                _context5.prev = 14;
                                _context5.t0 = _context5['catch'](3);
                                _didIteratorError4 = true;
                                _iteratorError4 = _context5.t0;

                            case 18:
                                _context5.prev = 18;
                                _context5.prev = 19;

                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }

                            case 21:
                                _context5.prev = 21;

                                if (!_didIteratorError4) {
                                    _context5.next = 24;
                                    break;
                                }

                                throw _iteratorError4;

                            case 24:
                                return _context5.finish(21);

                            case 25:
                                return _context5.finish(18);

                            case 26:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }
    }, {
        key: 'flatMap',
        value: function flatMap() {
            var callback = arguments.length <= 0 || arguments[0] === undefined ? function (x) {
                return x;
            } : arguments[0];
            var deep = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var iterator = Iter.getIterator(this);
            var used = new Set();

            return new Iter(regeneratorRuntime.mark(function flatten() {
                var iterable = arguments.length <= 0 || arguments[0] === undefined ? iterator : arguments[0];
                var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

                var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, i;

                return regeneratorRuntime.wrap(function flatten$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!used.has(iterable)) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return');

                            case 2:

                                used.add(iterable);
                                _iteratorNormalCompletion5 = true;
                                _didIteratorError5 = false;
                                _iteratorError5 = undefined;
                                _context6.prev = 6;
                                _iterator5 = iterable[Symbol.iterator]();

                            case 8:
                                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                    _context6.next = 19;
                                    break;
                                }

                                i = _step5.value;

                                if (!(Iter.isIterable(i) && (deep || level < 1))) {
                                    _context6.next = 14;
                                    break;
                                }

                                return _context6.delegateYield(flatten(i, level + 1), 't0', 12);

                            case 12:
                                _context6.next = 16;
                                break;

                            case 14:
                                _context6.next = 16;
                                return callback(i);

                            case 16:
                                _iteratorNormalCompletion5 = true;
                                _context6.next = 8;
                                break;

                            case 19:
                                _context6.next = 25;
                                break;

                            case 21:
                                _context6.prev = 21;
                                _context6.t1 = _context6['catch'](6);
                                _didIteratorError5 = true;
                                _iteratorError5 = _context6.t1;

                            case 25:
                                _context6.prev = 25;
                                _context6.prev = 26;

                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }

                            case 28:
                                _context6.prev = 28;

                                if (!_didIteratorError5) {
                                    _context6.next = 31;
                                    break;
                                }

                                throw _iteratorError5;

                            case 31:
                                return _context6.finish(28);

                            case 32:
                                return _context6.finish(25);

                            case 33:
                                used.delete(iterable);

                            case 34:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, flatten, this, [[6, 21, 25, 33], [26,, 28, 32]]);
            }));
        }
    }, {
        key: 'spreadMap',
        value: function spreadMap(callback) {
            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee6() {
                var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, arr;

                return regeneratorRuntime.wrap(function _callee6$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _iteratorNormalCompletion6 = true;
                                _didIteratorError6 = false;
                                _iteratorError6 = undefined;
                                _context7.prev = 3;
                                _iterator6 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                                    _context7.next = 12;
                                    break;
                                }

                                arr = _step6.value;
                                _context7.next = 9;
                                return callback.apply(undefined, _toConsumableArray(arr));

                            case 9:
                                _iteratorNormalCompletion6 = true;
                                _context7.next = 5;
                                break;

                            case 12:
                                _context7.next = 18;
                                break;

                            case 14:
                                _context7.prev = 14;
                                _context7.t0 = _context7['catch'](3);
                                _didIteratorError6 = true;
                                _iteratorError6 = _context7.t0;

                            case 18:
                                _context7.prev = 18;
                                _context7.prev = 19;

                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }

                            case 21:
                                _context7.prev = 21;

                                if (!_didIteratorError6) {
                                    _context7.next = 24;
                                    break;
                                }

                                throw _iteratorError6;

                            case 24:
                                return _context7.finish(21);

                            case 25:
                                return _context7.finish(18);

                            case 26:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee6, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }
    }, {
        key: 'take',
        value: function take() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? Infinity : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee7() {
                var count, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, v;

                return regeneratorRuntime.wrap(function _callee7$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                count = toPositiveInteger(n);
                                _iteratorNormalCompletion7 = true;
                                _didIteratorError7 = false;
                                _iteratorError7 = undefined;
                                _context8.prev = 4;
                                _iterator7 = iterator[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                                    _context8.next = 16;
                                    break;
                                }

                                v = _step7.value;

                                if (!(count-- > 0)) {
                                    _context8.next = 12;
                                    break;
                                }

                                _context8.next = 11;
                                return v;

                            case 11:
                                return _context8.abrupt('continue', 13);

                            case 12:
                                return _context8.abrupt('break', 16);

                            case 13:
                                _iteratorNormalCompletion7 = true;
                                _context8.next = 6;
                                break;

                            case 16:
                                _context8.next = 22;
                                break;

                            case 18:
                                _context8.prev = 18;
                                _context8.t0 = _context8['catch'](4);
                                _didIteratorError7 = true;
                                _iteratorError7 = _context8.t0;

                            case 22:
                                _context8.prev = 22;
                                _context8.prev = 23;

                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                    _iterator7.return();
                                }

                            case 25:
                                _context8.prev = 25;

                                if (!_didIteratorError7) {
                                    _context8.next = 28;
                                    break;
                                }

                                throw _iteratorError7;

                            case 28:
                                return _context8.finish(25);

                            case 29:
                                return _context8.finish(22);

                            case 30:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee7, this, [[4, 18, 22, 30], [23,, 25, 29]]);
            }));
        }
    }, {
        key: 'takeWhile',
        value: function takeWhile() {
            var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee8() {
                var _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, v;

                return regeneratorRuntime.wrap(function _callee8$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _iteratorNormalCompletion8 = true;
                                _didIteratorError8 = false;
                                _iteratorError8 = undefined;
                                _context9.prev = 3;
                                _iterator8 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                                    _context9.next = 16;
                                    break;
                                }

                                v = _step8.value;

                                if (!callback(v)) {
                                    _context9.next = 12;
                                    break;
                                }

                                _context9.next = 10;
                                return v;

                            case 10:
                                _context9.next = 13;
                                break;

                            case 12:
                                return _context9.abrupt('break', 16);

                            case 13:
                                _iteratorNormalCompletion8 = true;
                                _context9.next = 5;
                                break;

                            case 16:
                                _context9.next = 22;
                                break;

                            case 18:
                                _context9.prev = 18;
                                _context9.t0 = _context9['catch'](3);
                                _didIteratorError8 = true;
                                _iteratorError8 = _context9.t0;

                            case 22:
                                _context9.prev = 22;
                                _context9.prev = 23;

                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                    _iterator8.return();
                                }

                            case 25:
                                _context9.prev = 25;

                                if (!_didIteratorError8) {
                                    _context9.next = 28;
                                    break;
                                }

                                throw _iteratorError8;

                            case 28:
                                return _context9.finish(25);

                            case 29:
                                return _context9.finish(22);

                            case 30:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee8, this, [[3, 18, 22, 30], [23,, 25, 29]]);
            }));
        }
    }, {
        key: 'drop',
        value: function drop() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? Infinity : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee9() {
                var count, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, v;

                return regeneratorRuntime.wrap(function _callee9$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                count = toPositiveInteger(n);
                                _iteratorNormalCompletion9 = true;
                                _didIteratorError9 = false;
                                _iteratorError9 = undefined;
                                _context10.prev = 4;
                                _iterator9 = iterator[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                                    _context10.next = 15;
                                    break;
                                }

                                v = _step9.value;

                                if (!(count-- > 0)) {
                                    _context10.next = 10;
                                    break;
                                }

                                return _context10.abrupt('continue', 12);

                            case 10:
                                _context10.next = 12;
                                return v;

                            case 12:
                                _iteratorNormalCompletion9 = true;
                                _context10.next = 6;
                                break;

                            case 15:
                                _context10.next = 21;
                                break;

                            case 17:
                                _context10.prev = 17;
                                _context10.t0 = _context10['catch'](4);
                                _didIteratorError9 = true;
                                _iteratorError9 = _context10.t0;

                            case 21:
                                _context10.prev = 21;
                                _context10.prev = 22;

                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }

                            case 24:
                                _context10.prev = 24;

                                if (!_didIteratorError9) {
                                    _context10.next = 27;
                                    break;
                                }

                                throw _iteratorError9;

                            case 27:
                                return _context10.finish(24);

                            case 28:
                                return _context10.finish(21);

                            case 29:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee9, this, [[4, 17, 21, 29], [22,, 24, 28]]);
            }));
        }
    }, {
        key: 'dropWhile',
        value: function dropWhile() {
            var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee10() {
                var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, v;

                return regeneratorRuntime.wrap(function _callee10$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _iteratorNormalCompletion10 = true;
                                _didIteratorError10 = false;
                                _iteratorError10 = undefined;
                                _context11.prev = 3;
                                _iterator10 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                                    _context11.next = 15;
                                    break;
                                }

                                v = _step10.value;

                                if (callback(v)) {
                                    _context11.next = 12;
                                    break;
                                }

                                _context11.next = 10;
                                return v;

                            case 10:
                                return _context11.delegateYield(iterator, 't0', 11);

                            case 11:
                                return _context11.abrupt('break', 15);

                            case 12:
                                _iteratorNormalCompletion10 = true;
                                _context11.next = 5;
                                break;

                            case 15:
                                _context11.next = 21;
                                break;

                            case 17:
                                _context11.prev = 17;
                                _context11.t1 = _context11['catch'](3);
                                _didIteratorError10 = true;
                                _iteratorError10 = _context11.t1;

                            case 21:
                                _context11.prev = 21;
                                _context11.prev = 22;

                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }

                            case 24:
                                _context11.prev = 24;

                                if (!_didIteratorError10) {
                                    _context11.next = 27;
                                    break;
                                }

                                throw _iteratorError10;

                            case 27:
                                return _context11.finish(24);

                            case 28:
                                return _context11.finish(21);

                            case 29:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee10, this, [[3, 17, 21, 29], [22,, 24, 28]]);
            }));
        }
    }, {
        key: 'filter',
        value: function filter() {
            var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee11() {
                var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, v;

                return regeneratorRuntime.wrap(function _callee11$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _iteratorNormalCompletion11 = true;
                                _didIteratorError11 = false;
                                _iteratorError11 = undefined;
                                _context12.prev = 3;
                                _iterator11 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
                                    _context12.next = 13;
                                    break;
                                }

                                v = _step11.value;

                                if (!callback(v)) {
                                    _context12.next = 10;
                                    break;
                                }

                                _context12.next = 10;
                                return v;

                            case 10:
                                _iteratorNormalCompletion11 = true;
                                _context12.next = 5;
                                break;

                            case 13:
                                _context12.next = 19;
                                break;

                            case 15:
                                _context12.prev = 15;
                                _context12.t0 = _context12['catch'](3);
                                _didIteratorError11 = true;
                                _iteratorError11 = _context12.t0;

                            case 19:
                                _context12.prev = 19;
                                _context12.prev = 20;

                                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                    _iterator11.return();
                                }

                            case 22:
                                _context12.prev = 22;

                                if (!_didIteratorError11) {
                                    _context12.next = 25;
                                    break;
                                }

                                throw _iteratorError11;

                            case 25:
                                return _context12.finish(22);

                            case 26:
                                return _context12.finish(19);

                            case 27:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee11, this, [[3, 15, 19, 27], [20,, 22, 26]]);
            }));
        }
    }, {
        key: 'filterFalse',
        value: function filterFalse() {
            var callback = arguments.length <= 0 || arguments[0] === undefined ? Boolean : arguments[0];

            var iterator = Iter.getIterator(this);

            return new Iter(regeneratorRuntime.mark(function _callee12() {
                var _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, v;

                return regeneratorRuntime.wrap(function _callee12$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _iteratorNormalCompletion12 = true;
                                _didIteratorError12 = false;
                                _iteratorError12 = undefined;
                                _context13.prev = 3;
                                _iterator12 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                                    _context13.next = 13;
                                    break;
                                }

                                v = _step12.value;

                                if (callback(v)) {
                                    _context13.next = 10;
                                    break;
                                }

                                _context13.next = 10;
                                return v;

                            case 10:
                                _iteratorNormalCompletion12 = true;
                                _context13.next = 5;
                                break;

                            case 13:
                                _context13.next = 19;
                                break;

                            case 15:
                                _context13.prev = 15;
                                _context13.t0 = _context13['catch'](3);
                                _didIteratorError12 = true;
                                _iteratorError12 = _context13.t0;

                            case 19:
                                _context13.prev = 19;
                                _context13.prev = 20;

                                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                    _iterator12.return();
                                }

                            case 22:
                                _context13.prev = 22;

                                if (!_didIteratorError12) {
                                    _context13.next = 25;
                                    break;
                                }

                                throw _iteratorError12;

                            case 25:
                                return _context13.finish(22);

                            case 26:
                                return _context13.finish(19);

                            case 27:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee12, this, [[3, 15, 19, 27], [20,, 22, 26]]);
            }));
        }
    }, {
        key: 'product',
        value: function product() {
            var a = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            for (var _len2 = arguments.length, iterables = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                iterables[_key2 - 1] = arguments[_key2];
            }

            var arr = [this, a].concat(iterables).map(function (it) {
                return Iter.isMultiIterable(it) ? it : [].concat(_toConsumableArray(it));
            }),
                len = arr.length,
                res = [];

            return new Iter(regeneratorRuntime.mark(function gen() {
                var idx = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                var _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, v;

                return regeneratorRuntime.wrap(function gen$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                if (!(idx >= len)) {
                                    _context14.next = 4;
                                    break;
                                }

                                _context14.next = 3;
                                return res.slice();

                            case 3:
                                return _context14.abrupt('return');

                            case 4:
                                _iteratorNormalCompletion13 = true;
                                _didIteratorError13 = false;
                                _iteratorError13 = undefined;
                                _context14.prev = 7;
                                _iterator13 = arr[idx][Symbol.iterator]();

                            case 9:
                                if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
                                    _context14.next = 16;
                                    break;
                                }

                                v = _step13.value;

                                res[idx] = v;
                                return _context14.delegateYield(gen(idx + 1), 't0', 13);

                            case 13:
                                _iteratorNormalCompletion13 = true;
                                _context14.next = 9;
                                break;

                            case 16:
                                _context14.next = 22;
                                break;

                            case 18:
                                _context14.prev = 18;
                                _context14.t1 = _context14['catch'](7);
                                _didIteratorError13 = true;
                                _iteratorError13 = _context14.t1;

                            case 22:
                                _context14.prev = 22;
                                _context14.prev = 23;

                                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                    _iterator13.return();
                                }

                            case 25:
                                _context14.prev = 25;

                                if (!_didIteratorError13) {
                                    _context14.next = 28;
                                    break;
                                }

                                throw _iteratorError13;

                            case 28:
                                return _context14.finish(25);

                            case 29:
                                return _context14.finish(22);

                            case 30:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, gen, this, [[7, 18, 22, 30], [23,, 25, 29]]);
            }));
        }
    }, {
        key: 'permutations',
        value: function permutations() {
            var r = arguments.length <= 0 || arguments[0] === undefined ? Infinity : arguments[0];

            var arr = this.toArray(),
                map = new Map(),
                res = [],
                len = Math.min(toPositiveInteger(r), arr.length);

            return new Iter(regeneratorRuntime.mark(function gen() {
                var idx = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                var _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _step14$value, i, v;

                return regeneratorRuntime.wrap(function gen$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                if (!(idx >= len)) {
                                    _context15.next = 4;
                                    break;
                                }

                                _context15.next = 3;
                                return res.slice();

                            case 3:
                                return _context15.abrupt('return');

                            case 4:
                                _iteratorNormalCompletion14 = true;
                                _didIteratorError14 = false;
                                _iteratorError14 = undefined;
                                _context15.prev = 7;
                                _iterator14 = new Iter(arr).enumerate()[Symbol.iterator]();

                            case 9:
                                if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
                                    _context15.next = 21;
                                    break;
                                }

                                _step14$value = _slicedToArray(_step14.value, 2);
                                i = _step14$value[0];
                                v = _step14$value[1];

                                if (map.has(i)) {
                                    _context15.next = 18;
                                    break;
                                }

                                map.set(i, true);
                                res[idx] = v;
                                return _context15.delegateYield(gen(idx + 1), 't0', 17);

                            case 17:
                                map.delete(i);

                            case 18:
                                _iteratorNormalCompletion14 = true;
                                _context15.next = 9;
                                break;

                            case 21:
                                _context15.next = 27;
                                break;

                            case 23:
                                _context15.prev = 23;
                                _context15.t1 = _context15['catch'](7);
                                _didIteratorError14 = true;
                                _iteratorError14 = _context15.t1;

                            case 27:
                                _context15.prev = 27;
                                _context15.prev = 28;

                                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                    _iterator14.return();
                                }

                            case 30:
                                _context15.prev = 30;

                                if (!_didIteratorError14) {
                                    _context15.next = 33;
                                    break;
                                }

                                throw _iteratorError14;

                            case 33:
                                return _context15.finish(30);

                            case 34:
                                return _context15.finish(27);

                            case 35:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, gen, this, [[7, 23, 27, 35], [28,, 30, 34]]);
            }));
        }
    }, {
        key: 'combinations',
        value: function combinations(r) {
            var arr = this.toArray(),
                len = toPositiveInteger(r),
                res = [];

            return new Iter(regeneratorRuntime.mark(function gen() {
                var idx = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                var i, l;
                return regeneratorRuntime.wrap(function gen$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                if (!(idx >= len)) {
                                    _context16.next = 4;
                                    break;
                                }

                                _context16.next = 3;
                                return res.slice();

                            case 3:
                                return _context16.abrupt('return');

                            case 4:
                                i = start, l = arr.length;

                            case 5:
                                if (!(i < l)) {
                                    _context16.next = 11;
                                    break;
                                }

                                res[idx] = arr[i];
                                return _context16.delegateYield(gen(idx + 1, i + 1), 't0', 8);

                            case 8:
                                i++;
                                _context16.next = 5;
                                break;

                            case 11:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, gen, this);
            }));
        }
    }, {
        key: 'toIterator',
        value: function toIterator() {
            return Iter.getIterator(this);
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return [].concat(_toConsumableArray(Iter.getIterator(this)));
        }
    }], [{
        key: 'getIterator',
        value: function getIterator(obj) {
            return obj[Symbol.iterator]();
        }
    }, {
        key: 'isIterator',
        value: function isIterator(obj) {
            return Iter.isIterable(obj) && typeof obj.next === 'function';
        }
    }, {
        key: 'isIterable',
        value: function isIterable() {
            var obj = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            return obj !== null && typeof obj[Symbol.iterator] === 'function';
        }
    }, {
        key: 'isMultiIterable',
        value: function isMultiIterable(obj) {
            return Iter.isIterable(obj) && Iter.getIterator(obj) !== Iter.getIterator(obj);
        }
    }, {
        key: 'isClosable',
        value: function isClosable(iterator) {
            return Iter.isIterator(iterator) && typeof iterator.return === 'function';
        }
    }, {
        key: 'closeIterator',
        value: function closeIterator(iterator) {
            if (Iter.isClosable(iterator)) {
                return Boolean(iterator.return().done);
            }
            return false;
        }
    }, {
        key: 'keys',
        value: function keys(obj) {
            if (typeof obj.keys === 'function') {
                return new Iter(obj.keys());
            }

            var iterator = Reflect.enumerate(obj);
            var hasOwnP = {}.hasOwnProperty;

            return new Iter(regeneratorRuntime.mark(function _callee13() {
                var _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, k;

                return regeneratorRuntime.wrap(function _callee13$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                _iteratorNormalCompletion15 = true;
                                _didIteratorError15 = false;
                                _iteratorError15 = undefined;
                                _context17.prev = 3;
                                _iterator15 = iterator[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done) {
                                    _context17.next = 13;
                                    break;
                                }

                                k = _step15.value;

                                if (!hasOwnP.call(obj, k)) {
                                    _context17.next = 10;
                                    break;
                                }

                                _context17.next = 10;
                                return k;

                            case 10:
                                _iteratorNormalCompletion15 = true;
                                _context17.next = 5;
                                break;

                            case 13:
                                _context17.next = 19;
                                break;

                            case 15:
                                _context17.prev = 15;
                                _context17.t0 = _context17['catch'](3);
                                _didIteratorError15 = true;
                                _iteratorError15 = _context17.t0;

                            case 19:
                                _context17.prev = 19;
                                _context17.prev = 20;

                                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                    _iterator15.return();
                                }

                            case 22:
                                _context17.prev = 22;

                                if (!_didIteratorError15) {
                                    _context17.next = 25;
                                    break;
                                }

                                throw _iteratorError15;

                            case 25:
                                return _context17.finish(22);

                            case 26:
                                return _context17.finish(19);

                            case 27:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _callee13, this, [[3, 15, 19, 27], [20,, 22, 26]]);
            }));
        }
    }, {
        key: 'entries',
        value: function entries(obj) {
            if (typeof obj.entries === 'function') {
                return new Iter(obj.entries());
            }
            var keys = Iter.keys(obj);
            return new Iter(regeneratorRuntime.mark(function _callee14() {
                var _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, k;

                return regeneratorRuntime.wrap(function _callee14$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                _iteratorNormalCompletion16 = true;
                                _didIteratorError16 = false;
                                _iteratorError16 = undefined;
                                _context18.prev = 3;
                                _iterator16 = keys[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
                                    _context18.next = 12;
                                    break;
                                }

                                k = _step16.value;
                                _context18.next = 9;
                                return [k, obj[k]];

                            case 9:
                                _iteratorNormalCompletion16 = true;
                                _context18.next = 5;
                                break;

                            case 12:
                                _context18.next = 18;
                                break;

                            case 14:
                                _context18.prev = 14;
                                _context18.t0 = _context18['catch'](3);
                                _didIteratorError16 = true;
                                _iteratorError16 = _context18.t0;

                            case 18:
                                _context18.prev = 18;
                                _context18.prev = 19;

                                if (!_iteratorNormalCompletion16 && _iterator16.return) {
                                    _iterator16.return();
                                }

                            case 21:
                                _context18.prev = 21;

                                if (!_didIteratorError16) {
                                    _context18.next = 24;
                                    break;
                                }

                                throw _iteratorError16;

                            case 24:
                                return _context18.finish(21);

                            case 25:
                                return _context18.finish(18);

                            case 26:
                            case 'end':
                                return _context18.stop();
                        }
                    }
                }, _callee14, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }
    }, {
        key: 'values',
        value: function values(obj) {
            if (typeof obj.values === 'function') {
                return new Iter(obj.values());
            }
            var keys = Iter.keys(obj);
            return new Iter(regeneratorRuntime.mark(function _callee15() {
                var _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, k;

                return regeneratorRuntime.wrap(function _callee15$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                _iteratorNormalCompletion17 = true;
                                _didIteratorError17 = false;
                                _iteratorError17 = undefined;
                                _context19.prev = 3;
                                _iterator17 = keys[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done) {
                                    _context19.next = 12;
                                    break;
                                }

                                k = _step17.value;
                                _context19.next = 9;
                                return obj[k];

                            case 9:
                                _iteratorNormalCompletion17 = true;
                                _context19.next = 5;
                                break;

                            case 12:
                                _context19.next = 18;
                                break;

                            case 14:
                                _context19.prev = 14;
                                _context19.t0 = _context19['catch'](3);
                                _didIteratorError17 = true;
                                _iteratorError17 = _context19.t0;

                            case 18:
                                _context19.prev = 18;
                                _context19.prev = 19;

                                if (!_iteratorNormalCompletion17 && _iterator17.return) {
                                    _iterator17.return();
                                }

                            case 21:
                                _context19.prev = 21;

                                if (!_didIteratorError17) {
                                    _context19.next = 24;
                                    break;
                                }

                                throw _iteratorError17;

                            case 24:
                                return _context19.finish(21);

                            case 25:
                                return _context19.finish(18);

                            case 26:
                            case 'end':
                                return _context19.stop();
                        }
                    }
                }, _callee15, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }
    }, {
        key: 'reverse',
        value: function reverse(arrayLike) {
            var len = toPositiveInteger(arrayLike.length);

            return new Iter(regeneratorRuntime.mark(function _callee16() {
                var i;
                return regeneratorRuntime.wrap(function _callee16$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                i = len;

                            case 1:
                                if (!i--) {
                                    _context20.next = 6;
                                    break;
                                }

                                _context20.next = 4;
                                return arrayLike[i];

                            case 4:
                                _context20.next = 1;
                                break;

                            case 6:
                            case 'end':
                                return _context20.stop();
                        }
                    }
                }, _callee16, this);
            }));
        }
    }, {
        key: 'range',
        value: function range() {
            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var end = arguments[1];
            var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            if (typeof end === 'undefined') {
                end = start;
                start = 0;
            }

            start = toInteger(start);
            end = toInteger(end);
            step = toInteger(step);

            var errArg = start !== start && 'start' || end !== end && 'end' || step !== step && 'step';
            if (errArg) {
                throw TypeError('Expected number as ' + errArg + ' argument');
            }
            if (step == 0) {
                throw RangeError('step cannot be zero');
            }

            return new Iter(regeneratorRuntime.mark(function _callee17() {
                return regeneratorRuntime.wrap(function _callee17$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                if (!(step > 0)) {
                                    _context21.next = 9;
                                    break;
                                }

                            case 1:
                                if (!(start < end)) {
                                    _context21.next = 7;
                                    break;
                                }

                                _context21.next = 4;
                                return start;

                            case 4:
                                start += step;
                                _context21.next = 1;
                                break;

                            case 7:
                                _context21.next = 16;
                                break;

                            case 9:
                                if (!(step < 0)) {
                                    _context21.next = 16;
                                    break;
                                }

                            case 10:
                                if (!(start > end)) {
                                    _context21.next = 16;
                                    break;
                                }

                                _context21.next = 13;
                                return start;

                            case 13:
                                start += step;
                                _context21.next = 10;
                                break;

                            case 16:
                            case 'end':
                                return _context21.stop();
                        }
                    }
                }, _callee17, this);
            }));
        }
    }, {
        key: 'rangeRight',
        value: function rangeRight() {
            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var end = arguments[1];
            var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            if (typeof end === 'undefined') {
                end = start;
                start = 0;
            }

            var k = Math.abs((start - end) % step || step);
            if (start > end) {
                end += k;
                start++;
            } else {
                end -= k;
                start--;
            }

            return Iter.range(end, start, -step);
        }
    }, {
        key: 'zip',
        value: function zip(iterable) {
            for (var _len3 = arguments.length, iterables = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                iterables[_key3 - 1] = arguments[_key3];
            }

            var iterators = [iterable].concat(iterables).map(Iter.getIterator);

            return new Iter(regeneratorRuntime.mark(function _callee18() {
                var res, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, it, curr, _iteratorNormalCompletion19, _didIteratorError19, _iteratorError19, _iterator19, _step19, i;

                return regeneratorRuntime.wrap(function _callee18$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:
                                _context22.prev = 0;

                            case 1:
                                if (!true) {
                                    _context22.next = 54;
                                    break;
                                }

                                res = [];
                                _iteratorNormalCompletion18 = true;
                                _didIteratorError18 = false;
                                _iteratorError18 = undefined;
                                _context22.prev = 6;
                                _iterator18 = iterators[Symbol.iterator]();

                            case 8:
                                if (_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done) {
                                    _context22.next = 36;
                                    break;
                                }

                                it = _step18.value;
                                curr = it.next();

                                if (!curr.done) {
                                    _context22.next = 32;
                                    break;
                                }

                                _iteratorNormalCompletion19 = true;
                                _didIteratorError19 = false;
                                _iteratorError19 = undefined;
                                _context22.prev = 15;

                                for (_iterator19 = iterators[Symbol.iterator](); !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                    i = _step19.value;

                                    if (i !== it) Iter.closeIterator(i);
                                }
                                _context22.next = 23;
                                break;

                            case 19:
                                _context22.prev = 19;
                                _context22.t0 = _context22['catch'](15);
                                _didIteratorError19 = true;
                                _iteratorError19 = _context22.t0;

                            case 23:
                                _context22.prev = 23;
                                _context22.prev = 24;

                                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                                    _iterator19.return();
                                }

                            case 26:
                                _context22.prev = 26;

                                if (!_didIteratorError19) {
                                    _context22.next = 29;
                                    break;
                                }

                                throw _iteratorError19;

                            case 29:
                                return _context22.finish(26);

                            case 30:
                                return _context22.finish(23);

                            case 31:
                                return _context22.abrupt('return');

                            case 32:
                                res.push(curr.value);

                            case 33:
                                _iteratorNormalCompletion18 = true;
                                _context22.next = 8;
                                break;

                            case 36:
                                _context22.next = 42;
                                break;

                            case 38:
                                _context22.prev = 38;
                                _context22.t1 = _context22['catch'](6);
                                _didIteratorError18 = true;
                                _iteratorError18 = _context22.t1;

                            case 42:
                                _context22.prev = 42;
                                _context22.prev = 43;

                                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                                    _iterator18.return();
                                }

                            case 45:
                                _context22.prev = 45;

                                if (!_didIteratorError18) {
                                    _context22.next = 48;
                                    break;
                                }

                                throw _iteratorError18;

                            case 48:
                                return _context22.finish(45);

                            case 49:
                                return _context22.finish(42);

                            case 50:
                                _context22.next = 52;
                                return res;

                            case 52:
                                _context22.next = 1;
                                break;

                            case 54:
                                _context22.prev = 54;

                                iterators.map(Iter.closeIterator);
                                return _context22.finish(54);

                            case 57:
                            case 'end':
                                return _context22.stop();
                        }
                    }
                }, _callee18, this, [[0,, 54, 57], [6, 38, 42, 50], [15, 19, 23, 31], [24,, 26, 30], [43,, 45, 49]]);
            }));
        }
    }, {
        key: 'longZip',
        value: function longZip(iterable) {
            for (var _len4 = arguments.length, iterables = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                iterables[_key4 - 1] = arguments[_key4];
            }

            var iterators = [iterable].concat(iterables).map(Iter.getIterator),
                map = new Map(Iter.zip(iterators, Iter.repeat(false))),
                count = 0;

            return new Iter(regeneratorRuntime.mark(function _callee19() {
                var res, _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, it, curr;

                return regeneratorRuntime.wrap(function _callee19$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                _context23.prev = 0;

                            case 1:
                                if (!true) {
                                    _context23.next = 28;
                                    break;
                                }

                                res = [];
                                _iteratorNormalCompletion20 = true;
                                _didIteratorError20 = false;
                                _iteratorError20 = undefined;
                                _context23.prev = 6;

                                for (_iterator20 = iterators[Symbol.iterator](); !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                                    it = _step20.value;
                                    curr = it.next();

                                    if (curr.done && !map.get(it)) {
                                        map.set(it, true);
                                        count++;
                                    }
                                    res.push(curr.value);
                                }
                                _context23.next = 14;
                                break;

                            case 10:
                                _context23.prev = 10;
                                _context23.t0 = _context23['catch'](6);
                                _didIteratorError20 = true;
                                _iteratorError20 = _context23.t0;

                            case 14:
                                _context23.prev = 14;
                                _context23.prev = 15;

                                if (!_iteratorNormalCompletion20 && _iterator20.return) {
                                    _iterator20.return();
                                }

                            case 17:
                                _context23.prev = 17;

                                if (!_didIteratorError20) {
                                    _context23.next = 20;
                                    break;
                                }

                                throw _iteratorError20;

                            case 20:
                                return _context23.finish(17);

                            case 21:
                                return _context23.finish(14);

                            case 22:
                                if (!(count >= iterators.length)) {
                                    _context23.next = 24;
                                    break;
                                }

                                return _context23.abrupt('return');

                            case 24:
                                _context23.next = 26;
                                return res;

                            case 26:
                                _context23.next = 1;
                                break;

                            case 28:
                                _context23.prev = 28;

                                iterators.map(Iter.closeIterator);
                                return _context23.finish(28);

                            case 31:
                            case 'end':
                                return _context23.stop();
                        }
                    }
                }, _callee19, this, [[0,, 28, 31], [6, 10, 14, 22], [15,, 17, 21]]);
            }));
        }
    }, {
        key: 'count',
        value: function count(start) {
            var step = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            return Iter.range(start, step * Infinity, step);
        }
    }, {
        key: 'cycle',
        value: function cycle(iterable) {
            var iterator = Iter.getIterator(iterable);

            return new Iter(regeneratorRuntime.mark(function _callee20() {
                var arr, _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, v;

                return regeneratorRuntime.wrap(function _callee20$(_context24) {
                    while (1) {
                        switch (_context24.prev = _context24.next) {
                            case 0:
                                arr = [];
                                _iteratorNormalCompletion21 = true;
                                _didIteratorError21 = false;
                                _iteratorError21 = undefined;
                                _context24.prev = 4;
                                _iterator21 = iterator[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done) {
                                    _context24.next = 14;
                                    break;
                                }

                                v = _step21.value;
                                _context24.next = 10;
                                return v;

                            case 10:
                                arr.push(v);

                            case 11:
                                _iteratorNormalCompletion21 = true;
                                _context24.next = 6;
                                break;

                            case 14:
                                _context24.next = 20;
                                break;

                            case 16:
                                _context24.prev = 16;
                                _context24.t0 = _context24['catch'](4);
                                _didIteratorError21 = true;
                                _iteratorError21 = _context24.t0;

                            case 20:
                                _context24.prev = 20;
                                _context24.prev = 21;

                                if (!_iteratorNormalCompletion21 && _iterator21.return) {
                                    _iterator21.return();
                                }

                            case 23:
                                _context24.prev = 23;

                                if (!_didIteratorError21) {
                                    _context24.next = 26;
                                    break;
                                }

                                throw _iteratorError21;

                            case 26:
                                return _context24.finish(23);

                            case 27:
                                return _context24.finish(20);

                            case 28:
                                if (!true) {
                                    _context24.next = 32;
                                    break;
                                }

                                return _context24.delegateYield(arr, 't1', 30);

                            case 30:
                                _context24.next = 28;
                                break;

                            case 32:
                            case 'end':
                                return _context24.stop();
                        }
                    }
                }, _callee20, this, [[4, 16, 20, 28], [21,, 23, 27]]);
            }));
        }
    }, {
        key: 'repeat',
        value: function repeat(val) {
            var times = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];

            return new Iter(regeneratorRuntime.mark(function _callee21() {
                var _iteratorNormalCompletion22, _didIteratorError22, _iteratorError22, _iterator22, _step22, i;

                return regeneratorRuntime.wrap(function _callee21$(_context25) {
                    while (1) {
                        switch (_context25.prev = _context25.next) {
                            case 0:
                                _iteratorNormalCompletion22 = true;
                                _didIteratorError22 = false;
                                _iteratorError22 = undefined;
                                _context25.prev = 3;
                                _iterator22 = Iter.range(toPositiveInteger(times))[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done) {
                                    _context25.next = 12;
                                    break;
                                }

                                i = _step22.value;
                                _context25.next = 9;
                                return val;

                            case 9:
                                _iteratorNormalCompletion22 = true;
                                _context25.next = 5;
                                break;

                            case 12:
                                _context25.next = 18;
                                break;

                            case 14:
                                _context25.prev = 14;
                                _context25.t0 = _context25['catch'](3);
                                _didIteratorError22 = true;
                                _iteratorError22 = _context25.t0;

                            case 18:
                                _context25.prev = 18;
                                _context25.prev = 19;

                                if (!_iteratorNormalCompletion22 && _iterator22.return) {
                                    _iterator22.return();
                                }

                            case 21:
                                _context25.prev = 21;

                                if (!_didIteratorError22) {
                                    _context25.next = 24;
                                    break;
                                }

                                throw _iteratorError22;

                            case 24:
                                return _context25.finish(21);

                            case 25:
                                return _context25.finish(18);

                            case 26:
                            case 'end':
                                return _context25.stop();
                        }
                    }
                }, _callee21, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }
    }]);

    return Iter;
}();

exports.default = Iter;
//# sourceMappingURL=Iter.js.map
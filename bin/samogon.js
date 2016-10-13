#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _regenerator = __webpack_require__(1);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _promise = __webpack_require__(4);

	var _promise2 = _interopRequireDefault(_promise);

	var _asyncToGenerator2 = __webpack_require__(69);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var readStdin = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	    var result, stdin, end;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            result = [];
	            stdin = process.stdin;

	            stdin.setEncoding('utf8'); // why not? just in case

	            end = new _promise2.default(function (resolve, reject) {
	              stdin.on('data', function (data) {
	                return result.push(data);
	              });
	              stdin.on('end', function () {
	                return resolve(result.join(''));
	              });
	              stdin.on('error', reject);
	            });


	            stdin.resume();

	            _context.next = 7;
	            return end;

	          case 7:
	            return _context.abrupt('return', _context.sent);

	          case 8:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function readStdin() {
	    return _ref.apply(this, arguments);
	  };
	}();

	var _nopt = __webpack_require__(70);

	var _nopt2 = _interopRequireDefault(_nopt);

	var _path = __webpack_require__(72);

	var _path2 = _interopRequireDefault(_path);

	var _fs = __webpack_require__(75);

	var _fs2 = _interopRequireDefault(_fs);

	var _gen = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	  var knownOpts, shortHands, parsed, csvText, queries, locales, lang;
	  return _regenerator2.default.wrap(function _callee2$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          _context2.prev = 0;
	          knownOpts = {
	            format: ["android", "apple", "apple-r-objc", "apple-dict"],
	            lang: String,
	            csv: _path2.default,
	            queries: String
	          };
	          shortHands = {
	            "f": "--format",
	            "l": "--lang",
	            "q": "--queries"
	          };
	          parsed = (0, _nopt2.default)(knownOpts, shortHands, process.argv, 2);
	          csvText = "";

	          if (!(parsed.csv != null)) {
	            _context2.next = 9;
	            break;
	          }

	          csvText = _fs2.default.readFileSync(parsed.csv, { encoding: 'utf8' });
	          _context2.next = 12;
	          break;

	        case 9:
	          _context2.next = 11;
	          return readStdin();

	        case 11:
	          csvText = _context2.sent;

	        case 12:
	          queries = '';

	          if (parsed.queries != null) {
	            queries = parsed.queries;
	          }

	          locales = (0, _gen.localesFromCSV)(csvText, queries);
	          lang = 'en';


	          if (parsed.lang != null) {
	            lang = parsed.lang;
	          }

	          if (parsed.format === 'apple') {
	            console.log((0, _gen.localeToAppleStrings)(locales[lang], locales.en));
	          } else if (parsed.format === 'android') {
	            console.log((0, _gen.localeToAndroidFormat)(locales[lang]));
	          } else if (parsed.format === 'apple-r-objc') {
	            console.log((0, _gen.localeToAppleRObjC)(locales[lang], locales.en));
	          } else if (parsed.format === 'apple-dict') {
	            console.log((0, _gen.localeToAppleStringsDict)(locales[lang], locales.en));
	          }
	          _context2.next = 23;
	          break;

	        case 20:
	          _context2.prev = 20;
	          _context2.t0 = _context2['catch'](0);

	          console.error(_context2.t0);

	        case 23:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _callee2, this, [[0, 20]]);
	}))();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(3);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(51);
	__webpack_require__(55);
	module.exports = __webpack_require__(15).Promise;

/***/ },
/* 6 */
/***/ function(module, exports) {

	

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(8)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(11)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(9)
	  , defined   = __webpack_require__(10);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(12)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(28)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(29)
	  , Iterators      = __webpack_require__(30)
	  , $iterCreate    = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(47)
	  , getPrototypeOf = __webpack_require__(49)
	  , ITERATOR       = __webpack_require__(48)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(14)
	  , core      = __webpack_require__(15)
	  , ctx       = __webpack_require__(16)
	  , hide      = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(17);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(19)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(20)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , toPrimitive    = __webpack_require__(26)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function(){
	  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , document = __webpack_require__(14).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(21);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 29 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(32)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(47)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(48)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(20)
	  , dPs         = __webpack_require__(33)
	  , enumBugKeys = __webpack_require__(45)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(25)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(46).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(19)
	  , anObject = __webpack_require__(20)
	  , getKeys  = __webpack_require__(34);

	module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(35)
	  , enumBugKeys = __webpack_require__(45);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(29)
	  , toIObject    = __webpack_require__(36)
	  , arrayIndexOf = __webpack_require__(39)(false)
	  , IE_PROTO     = __webpack_require__(42)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(37)
	  , defined = __webpack_require__(10);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(38);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(36)
	  , toLength  = __webpack_require__(40)
	  , toIndex   = __webpack_require__(41);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(9)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(9)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(43)('keys')
	  , uid    = __webpack_require__(44);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(14)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14).document && document.documentElement;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).f
	  , has = __webpack_require__(29)
	  , TAG = __webpack_require__(48)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(43)('wks')
	  , uid        = __webpack_require__(44)
	  , Symbol     = __webpack_require__(14).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(29)
	  , toObject    = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(10);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	var global        = __webpack_require__(14)
	  , hide          = __webpack_require__(18)
	  , Iterators     = __webpack_require__(30)
	  , TO_STRING_TAG = __webpack_require__(48)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(53)
	  , step             = __webpack_require__(54)
	  , Iterators        = __webpack_require__(30)
	  , toIObject        = __webpack_require__(36);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(11)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(12)
	  , global             = __webpack_require__(14)
	  , ctx                = __webpack_require__(16)
	  , classof            = __webpack_require__(56)
	  , $export            = __webpack_require__(13)
	  , isObject           = __webpack_require__(21)
	  , aFunction          = __webpack_require__(17)
	  , anInstance         = __webpack_require__(57)
	  , forOf              = __webpack_require__(58)
	  , speciesConstructor = __webpack_require__(62)
	  , task               = __webpack_require__(63).set
	  , microtask          = __webpack_require__(65)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(48)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(66)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(47)($Promise, PROMISE);
	__webpack_require__(67)(PROMISE);
	Wrapper = __webpack_require__(15)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(68)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(38)
	  , TAG = __webpack_require__(48)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(16)
	  , call        = __webpack_require__(59)
	  , isArrayIter = __webpack_require__(60)
	  , anObject    = __webpack_require__(20)
	  , toLength    = __webpack_require__(40)
	  , getIterFn   = __webpack_require__(61)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(30)
	  , ITERATOR   = __webpack_require__(48)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(56)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(30);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(20)
	  , aFunction = __webpack_require__(17)
	  , SPECIES   = __webpack_require__(48)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(16)
	  , invoke             = __webpack_require__(64)
	  , html               = __webpack_require__(46)
	  , cel                = __webpack_require__(25)
	  , global             = __webpack_require__(14)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(38)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(14)
	  , macrotask = __webpack_require__(63).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(38)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(14)
	  , core        = __webpack_require__(15)
	  , dP          = __webpack_require__(19)
	  , DESCRIPTORS = __webpack_require__(23)
	  , SPECIES     = __webpack_require__(48)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(48)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _promise = __webpack_require__(4);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            return step("next", value);
	          }, function (err) {
	            return step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// info about each config option.

	var debug = process.env.DEBUG_NOPT || process.env.NOPT_DEBUG
	  ? function () { console.error.apply(console, arguments) }
	  : function () {}

	var url = __webpack_require__(71)
	  , path = __webpack_require__(72)
	  , Stream = __webpack_require__(73).Stream
	  , abbrev = __webpack_require__(74)

	module.exports = exports = nopt
	exports.clean = clean

	exports.typeDefs =
	  { String  : { type: String,  validate: validateString  }
	  , Boolean : { type: Boolean, validate: validateBoolean }
	  , url     : { type: url,     validate: validateUrl     }
	  , Number  : { type: Number,  validate: validateNumber  }
	  , path    : { type: path,    validate: validatePath    }
	  , Stream  : { type: Stream,  validate: validateStream  }
	  , Date    : { type: Date,    validate: validateDate    }
	  }

	function nopt (types, shorthands, args, slice) {
	  args = args || process.argv
	  types = types || {}
	  shorthands = shorthands || {}
	  if (typeof slice !== "number") slice = 2

	  debug(types, shorthands, args, slice)

	  args = args.slice(slice)
	  var data = {}
	    , key
	    , remain = []
	    , cooked = args
	    , original = args.slice(0)

	  parse(args, data, remain, types, shorthands)
	  // now data is full
	  clean(data, types, exports.typeDefs)
	  data.argv = {remain:remain,cooked:cooked,original:original}
	  Object.defineProperty(data.argv, 'toString', { value: function () {
	    return this.original.map(JSON.stringify).join(" ")
	  }, enumerable: false })
	  return data
	}

	function clean (data, types, typeDefs) {
	  typeDefs = typeDefs || exports.typeDefs
	  var remove = {}
	    , typeDefault = [false, true, null, String, Array]

	  Object.keys(data).forEach(function (k) {
	    if (k === "argv") return
	    var val = data[k]
	      , isArray = Array.isArray(val)
	      , type = types[k]
	    if (!isArray) val = [val]
	    if (!type) type = typeDefault
	    if (type === Array) type = typeDefault.concat(Array)
	    if (!Array.isArray(type)) type = [type]

	    debug("val=%j", val)
	    debug("types=", type)
	    val = val.map(function (val) {
	      // if it's an unknown value, then parse false/true/null/numbers/dates
	      if (typeof val === "string") {
	        debug("string %j", val)
	        val = val.trim()
	        if ((val === "null" && ~type.indexOf(null))
	            || (val === "true" &&
	               (~type.indexOf(true) || ~type.indexOf(Boolean)))
	            || (val === "false" &&
	               (~type.indexOf(false) || ~type.indexOf(Boolean)))) {
	          val = JSON.parse(val)
	          debug("jsonable %j", val)
	        } else if (~type.indexOf(Number) && !isNaN(val)) {
	          debug("convert to number", val)
	          val = +val
	        } else if (~type.indexOf(Date) && !isNaN(Date.parse(val))) {
	          debug("convert to date", val)
	          val = new Date(val)
	        }
	      }

	      if (!types.hasOwnProperty(k)) {
	        return val
	      }

	      // allow `--no-blah` to set 'blah' to null if null is allowed
	      if (val === false && ~type.indexOf(null) &&
	          !(~type.indexOf(false) || ~type.indexOf(Boolean))) {
	        val = null
	      }

	      var d = {}
	      d[k] = val
	      debug("prevalidated val", d, val, types[k])
	      if (!validate(d, k, val, types[k], typeDefs)) {
	        if (exports.invalidHandler) {
	          exports.invalidHandler(k, val, types[k], data)
	        } else if (exports.invalidHandler !== false) {
	          debug("invalid: "+k+"="+val, types[k])
	        }
	        return remove
	      }
	      debug("validated val", d, val, types[k])
	      return d[k]
	    }).filter(function (val) { return val !== remove })

	    if (!val.length) delete data[k]
	    else if (isArray) {
	      debug(isArray, data[k], val)
	      data[k] = val
	    } else data[k] = val[0]

	    debug("k=%s val=%j", k, val, data[k])
	  })
	}

	function validateString (data, k, val) {
	  data[k] = String(val)
	}

	function validatePath (data, k, val) {
	  if (val === true) return false
	  if (val === null) return true

	  val = String(val)
	  var homePattern = process.platform === 'win32' ? /^~(\/|\\)/ : /^~\//
	  if (val.match(homePattern) && process.env.HOME) {
	    val = path.resolve(process.env.HOME, val.substr(2))
	  }
	  data[k] = path.resolve(String(val))
	  return true
	}

	function validateNumber (data, k, val) {
	  debug("validate Number %j %j %j", k, val, isNaN(val))
	  if (isNaN(val)) return false
	  data[k] = +val
	}

	function validateDate (data, k, val) {
	  debug("validate Date %j %j %j", k, val, Date.parse(val))
	  var s = Date.parse(val)
	  if (isNaN(s)) return false
	  data[k] = new Date(val)
	}

	function validateBoolean (data, k, val) {
	  if (val instanceof Boolean) val = val.valueOf()
	  else if (typeof val === "string") {
	    if (!isNaN(val)) val = !!(+val)
	    else if (val === "null" || val === "false") val = false
	    else val = true
	  } else val = !!val
	  data[k] = val
	}

	function validateUrl (data, k, val) {
	  val = url.parse(String(val))
	  if (!val.host) return false
	  data[k] = val.href
	}

	function validateStream (data, k, val) {
	  if (!(val instanceof Stream)) return false
	  data[k] = val
	}

	function validate (data, k, val, type, typeDefs) {
	  // arrays are lists of types.
	  if (Array.isArray(type)) {
	    for (var i = 0, l = type.length; i < l; i ++) {
	      if (type[i] === Array) continue
	      if (validate(data, k, val, type[i], typeDefs)) return true
	    }
	    delete data[k]
	    return false
	  }

	  // an array of anything?
	  if (type === Array) return true

	  // NaN is poisonous.  Means that something is not allowed.
	  if (type !== type) {
	    debug("Poison NaN", k, val, type)
	    delete data[k]
	    return false
	  }

	  // explicit list of values
	  if (val === type) {
	    debug("Explicitly allowed %j", val)
	    // if (isArray) (data[k] = data[k] || []).push(val)
	    // else data[k] = val
	    data[k] = val
	    return true
	  }

	  // now go through the list of typeDefs, validate against each one.
	  var ok = false
	    , types = Object.keys(typeDefs)
	  for (var i = 0, l = types.length; i < l; i ++) {
	    debug("test type %j %j %j", k, val, types[i])
	    var t = typeDefs[types[i]]
	    if (t &&
	      ((type && type.name && t.type && t.type.name) ? (type.name === t.type.name) : (type === t.type))) {
	      var d = {}
	      ok = false !== t.validate(d, k, val)
	      val = d[k]
	      if (ok) {
	        // if (isArray) (data[k] = data[k] || []).push(val)
	        // else data[k] = val
	        data[k] = val
	        break
	      }
	    }
	  }
	  debug("OK? %j (%j %j %j)", ok, k, val, types[i])

	  if (!ok) delete data[k]
	  return ok
	}

	function parse (args, data, remain, types, shorthands) {
	  debug("parse", args, data, remain)

	  var key = null
	    , abbrevs = abbrev(Object.keys(types))
	    , shortAbbr = abbrev(Object.keys(shorthands))

	  for (var i = 0; i < args.length; i ++) {
	    var arg = args[i]
	    debug("arg", arg)

	    if (arg.match(/^-{2,}$/)) {
	      // done with keys.
	      // the rest are args.
	      remain.push.apply(remain, args.slice(i + 1))
	      args[i] = "--"
	      break
	    }
	    var hadEq = false
	    if (arg.charAt(0) === "-" && arg.length > 1) {
	      if (arg.indexOf("=") !== -1) {
	        hadEq = true
	        var v = arg.split("=")
	        arg = v.shift()
	        v = v.join("=")
	        args.splice.apply(args, [i, 1].concat([arg, v]))
	      }

	      // see if it's a shorthand
	      // if so, splice and back up to re-parse it.
	      var shRes = resolveShort(arg, shorthands, shortAbbr, abbrevs)
	      debug("arg=%j shRes=%j", arg, shRes)
	      if (shRes) {
	        debug(arg, shRes)
	        args.splice.apply(args, [i, 1].concat(shRes))
	        if (arg !== shRes[0]) {
	          i --
	          continue
	        }
	      }
	      arg = arg.replace(/^-+/, "")
	      var no = null
	      while (arg.toLowerCase().indexOf("no-") === 0) {
	        no = !no
	        arg = arg.substr(3)
	      }

	      if (abbrevs[arg]) arg = abbrevs[arg]

	      var isArray = types[arg] === Array ||
	        Array.isArray(types[arg]) && types[arg].indexOf(Array) !== -1

	      // allow unknown things to be arrays if specified multiple times.
	      if (!types.hasOwnProperty(arg) && data.hasOwnProperty(arg)) {
	        if (!Array.isArray(data[arg]))
	          data[arg] = [data[arg]]
	        isArray = true
	      }

	      var val
	        , la = args[i + 1]

	      var isBool = typeof no === 'boolean' ||
	        types[arg] === Boolean ||
	        Array.isArray(types[arg]) && types[arg].indexOf(Boolean) !== -1 ||
	        (typeof types[arg] === 'undefined' && !hadEq) ||
	        (la === "false" &&
	         (types[arg] === null ||
	          Array.isArray(types[arg]) && ~types[arg].indexOf(null)))

	      if (isBool) {
	        // just set and move along
	        val = !no
	        // however, also support --bool true or --bool false
	        if (la === "true" || la === "false") {
	          val = JSON.parse(la)
	          la = null
	          if (no) val = !val
	          i ++
	        }

	        // also support "foo":[Boolean, "bar"] and "--foo bar"
	        if (Array.isArray(types[arg]) && la) {
	          if (~types[arg].indexOf(la)) {
	            // an explicit type
	            val = la
	            i ++
	          } else if ( la === "null" && ~types[arg].indexOf(null) ) {
	            // null allowed
	            val = null
	            i ++
	          } else if ( !la.match(/^-{2,}[^-]/) &&
	                      !isNaN(la) &&
	                      ~types[arg].indexOf(Number) ) {
	            // number
	            val = +la
	            i ++
	          } else if ( !la.match(/^-[^-]/) && ~types[arg].indexOf(String) ) {
	            // string
	            val = la
	            i ++
	          }
	        }

	        if (isArray) (data[arg] = data[arg] || []).push(val)
	        else data[arg] = val

	        continue
	      }

	      if (types[arg] === String && la === undefined)
	        la = ""

	      if (la && la.match(/^-{2,}$/)) {
	        la = undefined
	        i --
	      }

	      val = la === undefined ? true : la
	      if (isArray) (data[arg] = data[arg] || []).push(val)
	      else data[arg] = val

	      i ++
	      continue
	    }
	    remain.push(arg)
	  }
	}

	function resolveShort (arg, shorthands, shortAbbr, abbrevs) {
	  // handle single-char shorthands glommed together, like
	  // npm ls -glp, but only if there is one dash, and only if
	  // all of the chars are single-char shorthands, and it's
	  // not a match to some other abbrev.
	  arg = arg.replace(/^-+/, '')

	  // if it's an exact known option, then don't go any further
	  if (abbrevs[arg] === arg)
	    return null

	  // if it's an exact known shortopt, same deal
	  if (shorthands[arg]) {
	    // make it an array, if it's a list of words
	    if (shorthands[arg] && !Array.isArray(shorthands[arg]))
	      shorthands[arg] = shorthands[arg].split(/\s+/)

	    return shorthands[arg]
	  }

	  // first check to see if this arg is a set of single-char shorthands
	  var singles = shorthands.___singles
	  if (!singles) {
	    singles = Object.keys(shorthands).filter(function (s) {
	      return s.length === 1
	    }).reduce(function (l,r) {
	      l[r] = true
	      return l
	    }, {})
	    shorthands.___singles = singles
	    debug('shorthand singles', singles)
	  }

	  var chrs = arg.split("").filter(function (c) {
	    return singles[c]
	  })

	  if (chrs.join("") === arg) return chrs.map(function (c) {
	    return shorthands[c]
	  }).reduce(function (l, r) {
	    return l.concat(r)
	  }, [])


	  // if it's an arg abbrev, and not a literal shorthand, then prefer the arg
	  if (abbrevs[arg] && !shorthands[arg])
	    return null

	  // if it's an abbr for a shorthand, then use that
	  if (shortAbbr[arg])
	    arg = shortAbbr[arg]

	  // make it an array, if it's a list of words
	  if (shorthands[arg] && !Array.isArray(shorthands[arg]))
	    shorthands[arg] = shorthands[arg].split(/\s+/)

	  return shorthands[arg]
	}


/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 74 */
/***/ function(module, exports) {

	
	module.exports = exports = abbrev.abbrev = abbrev

	abbrev.monkeyPatch = monkeyPatch

	function monkeyPatch () {
	  Object.defineProperty(Array.prototype, 'abbrev', {
	    value: function () { return abbrev(this) },
	    enumerable: false, configurable: true, writable: true
	  })

	  Object.defineProperty(Object.prototype, 'abbrev', {
	    value: function () { return abbrev(Object.keys(this)) },
	    enumerable: false, configurable: true, writable: true
	  })
	}

	function abbrev (list) {
	  if (arguments.length !== 1 || !Array.isArray(list)) {
	    list = Array.prototype.slice.call(arguments, 0)
	  }
	  for (var i = 0, l = list.length, args = [] ; i < l ; i ++) {
	    args[i] = typeof list[i] === "string" ? list[i] : String(list[i])
	  }

	  // sort them lexicographically, so that they're next to their nearest kin
	  args = args.sort(lexSort)

	  // walk through each, seeing how much it has in common with the next and previous
	  var abbrevs = {}
	    , prev = ""
	  for (var i = 0, l = args.length ; i < l ; i ++) {
	    var current = args[i]
	      , next = args[i + 1] || ""
	      , nextMatches = true
	      , prevMatches = true
	    if (current === next) continue
	    for (var j = 0, cl = current.length ; j < cl ; j ++) {
	      var curChar = current.charAt(j)
	      nextMatches = nextMatches && curChar === next.charAt(j)
	      prevMatches = prevMatches && curChar === prev.charAt(j)
	      if (!nextMatches && !prevMatches) {
	        j ++
	        break
	      }
	    }
	    prev = current
	    if (j === cl) {
	      abbrevs[current] = current
	      continue
	    }
	    for (var a = current.substr(0, j) ; j <= cl ; j ++) {
	      abbrevs[a] = current
	      a += current.charAt(j)
	    }
	  }
	  return abbrevs
	}

	function lexSort (a, b) {
	  return a === b ? 0 : a > b ? 1 : -1
	}


/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localeToAppleStringsDict = exports.localeToAppleRObjC = exports.localeToAppleStrings = exports.localeToAndroidFormat = exports.localesFromCSV = undefined;

	var _stringify = __webpack_require__(77);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _defineProperty2 = __webpack_require__(79);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _slicedToArray2 = __webpack_require__(83);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _entries = __webpack_require__(90);

	var _entries2 = _interopRequireDefault(_entries);

	var _keys = __webpack_require__(95);

	var _keys2 = _interopRequireDefault(_keys);

	var _getIterator2 = __webpack_require__(87);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(99);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _sync = __webpack_require__(100);

	var _sync2 = _interopRequireDefault(_sync);

	var _xml = __webpack_require__(104);

	var _xml2 = _interopRequireDefault(_xml);

	var _querytext = __webpack_require__(106);

	var _querytext2 = _interopRequireDefault(_querytext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PLURALS = ['zero', 'one', 'two', 'few', 'many', 'other'];

	// We are expecting stding with csv format:
	//
	// HEADER: key, comments, en, ru, etc
	// app_name, "just an app name", AppName, приложение

	// key modifcators:
	//   - zero
	//   - two
	//   - few
	//   - many
	//   - other
	//   - formatted - formatted="true" for android
	//   - number - for arrays
	// example:
	// items_count.zero
	// items_count.two
	// items_names.0

	var Locale = function Locale(id) {
	  (0, _classCallCheck3.default)(this, Locale);

	  this.id = id;
	  this.strings = {};
	  this.arrays = {};
	  this.plurals = {};
	};

	function getLocaleId(key) {
	  return key.toLowerCase();
	}

	function checkFormatAndGetLocales(row) {
	  var map = {};
	  var keyFound = false;
	  var commentFound = false;
	  var localeFound = false;

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(row)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _key = _step.value;

	      switch (_key) {
	        case 'key':
	          keyFound = true;
	        case 'comment':
	          commentFound = true;
	          break;
	        case 'tags':
	          break;
	        default:
	          localeFound = true;
	          var localeId = getLocaleId(String(_key));
	          map[localeId] = new Locale(localeId);
	          break;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  if (!keyFound) {
	    throw new Error("csv MUST contain `key` column");
	  }

	  if (!commentFound) {
	    throw new Error("csv MUST contain `comment` column");
	  }

	  if (!localeFound) {
	    throw new Error("csv MUST contain at least one locale column. (`en`, `ru`)");
	  }

	  return map;
	}

	function enumerateLocaleValuesInRow(locales, row, callback) {
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;

	  try {
	    for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(row)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2);

	      var col = _step2$value[0];
	      var raw = _step2$value[1];

	      var localeId = getLocaleId(col);
	      var _locale = locales[localeId];
	      if (_locale == null) {
	        continue;
	      }

	      if (raw == null) {
	        continue;
	      }

	      var _value = "";
	      if (typeof raw == "string") {
	        _value = raw;
	      } else {
	        _value = String(raw);
	      }

	      if (_value.length === 0) {
	        continue;
	      }

	      callback(_locale, _value);
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	}

	function formatter(keyParts) {
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;

	  try {
	    for (var _iterator3 = (0, _getIterator3.default)(keyParts), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var part = _step3.value;

	      if (part[0] == '%') {
	        return part;
	      }
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }

	  return '%d';
	}

	function parseRow(locales, row) {
	  var queries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	  var keyWithAttributes = '';
	  if (row.key != null) {
	    keyWithAttributes = row.key.toLowerCase();
	  }

	  if (keyWithAttributes === '') {
	    return;
	  }

	  var tags = '';
	  if (row.tags != null) {
	    tags = row.tags.toLowerCase().replace(/,/, ' ');
	  }

	  var matched = false;
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;

	  try {
	    for (var _iterator4 = (0, _getIterator3.default)(queries), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var q = _step4.value;

	      if (q.match(tags) === true) {
	        matched = true;
	        break;
	      }
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }

	  if (!matched) {
	    return;
	  }

	  var comment = null;
	  if (row.comment != null && row.comment.length > 0) {
	    comment = row.comment;
	  }
	  var keyParts = keyWithAttributes.split(/\./);
	  var key = keyParts.shift();

	  var meta = {
	    enKey: keyParts.indexOf('en-key') >= 0,
	    formatted: null,
	    integer: keyParts.indexOf('int') >= 0 || keyParts.indexOf('integer') >= 0,
	    comment: comment
	  };

	  if (keyParts.indexOf('formatted') >= 0) {
	    meta.formatted = true;
	  } else if (keyParts.indexOf('unformatted') >= 0) {
	    meta.formatted = false;
	  }
	  var index = keyParts[0];
	  var arrayIndex = parseInt(index);

	  if (isNaN(arrayIndex)) {
	    var pluralIndex = PLURALS.indexOf(index);
	    if (pluralIndex >= 0) {
	      (function () {
	        var qty = PLURALS[pluralIndex];
	        var frmt = formatter(keyParts);
	        enumerateLocaleValuesInRow(locales, row, function (locale, value) {
	          var res = locale.plurals[key];

	          if (res == null) {
	            res = { meta: meta, key: key, zero: null, one: null, two: null, few: null, many: null, other: null, formatter: frmt, value: key + " " + frmt };
	          }
	          res[qty] = value;
	          locale.plurals[key] = res;
	        });
	      })();
	    } else {
	      enumerateLocaleValuesInRow(locales, row, function (locale, value) {
	        locale.strings[key] = { meta: meta, key: key, value: value };
	      });
	    }
	  } else {
	    enumerateLocaleValuesInRow(locales, row, function (locale, value) {
	      var res = locale.arrays[key];

	      if (res == null) {
	        res = { meta: meta, key: key, values: [] };
	      }
	      res.values[arrayIndex] = value;
	      locale.arrays[key] = res;
	    });
	  }
	}

	function localeToAndroidFormat(locale) {
	  var resources = [];
	  var keys = (0, _keys2.default)(locale.strings);
	  keys.sort();
	  var _iteratorNormalCompletion5 = true;
	  var _didIteratorError5 = false;
	  var _iteratorError5 = undefined;

	  try {
	    for (var _iterator5 = (0, _getIterator3.default)(keys), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	      var _key2 = _step5.value;

	      var _value2 = locale.strings[_key2];

	      var attrs = { name: _key2 };

	      if (_value2.meta.formatted != null) {
	        attrs.formatted = _value2.meta.formatted;
	      }

	      var str = { string: [{ _attr: attrs }, _value2.value] };

	      resources.push(str);
	    }
	  } catch (err) {
	    _didIteratorError5 = true;
	    _iteratorError5 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion5 && _iterator5.return) {
	        _iterator5.return();
	      }
	    } finally {
	      if (_didIteratorError5) {
	        throw _iteratorError5;
	      }
	    }
	  }

	  keys = (0, _keys2.default)(locale.arrays);
	  keys.sort();
	  var _iteratorNormalCompletion6 = true;
	  var _didIteratorError6 = false;
	  var _iteratorError6 = undefined;

	  try {
	    for (var _iterator6 = (0, _getIterator3.default)(keys), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	      var _key3 = _step6.value;

	      var _value3 = locale.arrays[_key3];
	      var type = _value3.meta.integer ? 'integer-array' : 'string-array';
	      var arr = (0, _defineProperty3.default)({}, type, [{ _attr: { name: _key3 } }].concat(_value3.values.map(function (v) {
	        return { item: [v] };
	      })));
	      resources.push(arr);
	    }
	  } catch (err) {
	    _didIteratorError6 = true;
	    _iteratorError6 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion6 && _iterator6.return) {
	        _iterator6.return();
	      }
	    } finally {
	      if (_didIteratorError6) {
	        throw _iteratorError6;
	      }
	    }
	  }

	  keys = (0, _keys2.default)(locale.plurals);
	  keys.sort();
	  var _iteratorNormalCompletion7 = true;
	  var _didIteratorError7 = false;
	  var _iteratorError7 = undefined;

	  try {
	    for (var _iterator7 = (0, _getIterator3.default)(keys), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	      var _key4 = _step7.value;

	      var _value4 = locale.plurals[_key4];
	      var plural = { plurals: [] };

	      plural.plurals.push({ _attr: { name: _key4 } });

	      var _iteratorNormalCompletion8 = true;
	      var _didIteratorError8 = false;
	      var _iteratorError8 = undefined;

	      try {
	        for (var _iterator8 = (0, _getIterator3.default)(PLURALS), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	          var qty = _step8.value;

	          if (_value4[qty] != null) {
	            plural.plurals.push({ item: [{ _attr: { quantity: qty } }, _value4[qty]] });
	          };
	        }
	      } catch (err) {
	        _didIteratorError8 = true;
	        _iteratorError8 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion8 && _iterator8.return) {
	            _iterator8.return();
	          }
	        } finally {
	          if (_didIteratorError8) {
	            throw _iteratorError8;
	          }
	        }
	      }

	      resources.push(plural);
	    }
	  } catch (err) {
	    _didIteratorError7 = true;
	    _iteratorError7 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion7 && _iterator7.return) {
	        _iterator7.return();
	      }
	    } finally {
	      if (_didIteratorError7) {
	        throw _iteratorError7;
	      }
	    }
	  }

	  return (0, _xml2.default)([{ resources: resources }], { declaration: true, indent: '    ' });
	}

	function snakeToCamel(s) {
	  return s.replace(/(\_\w)/g, function (m) {
	    return m[1].toUpperCase();
	  });
	}

	function localeToAppleStrings(locale, enLocale) {
	  var resources = [];
	  var keys = (0, _keys2.default)(locale.strings);
	  keys.sort();
	  var _iteratorNormalCompletion9 = true;
	  var _didIteratorError9 = false;
	  var _iteratorError9 = undefined;

	  try {
	    for (var _iterator9 = (0, _getIterator3.default)(keys), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	      var _key5 = _step9.value;

	      var _value5 = locale.strings[_key5];
	      if (_value5.meta.comment != null) {
	        resources.push('/* ' + _value5.meta.comment + ' */');
	      }
	      var s = _value5.value.replace(/%s/g, '%@');
	      var str = (0, _stringify2.default)(snakeToCamel(_key5)) + " = " + (0, _stringify2.default)(s) + ";";
	      if (_value5.meta.enKey) {
	        str = (0, _stringify2.default)(enLocale.strings[_key5].value) + " = " + (0, _stringify2.default)(s) + ";";
	      }
	      resources.push(str);
	    }
	  } catch (err) {
	    _didIteratorError9 = true;
	    _iteratorError9 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion9 && _iterator9.return) {
	        _iterator9.return();
	      }
	    } finally {
	      if (_didIteratorError9) {
	        throw _iteratorError9;
	      }
	    }
	  }

	  keys = (0, _keys2.default)(locale.plurals);
	  keys.sort();
	  var _iteratorNormalCompletion10 = true;
	  var _didIteratorError10 = false;
	  var _iteratorError10 = undefined;

	  try {
	    for (var _iterator10 = (0, _getIterator3.default)(keys), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	      var _key6 = _step10.value;

	      var _value6 = locale.plurals[_key6];
	      if (_value6.meta.comment != null) {
	        resources.push('/* ' + _value6.meta.comment + ' */');
	      }
	      var _str = (0, _stringify2.default)(snakeToCamel(_key6)) + " = " + (0, _stringify2.default)(_value6.value) + ";";

	      resources.push(_str);
	    }
	  } catch (err) {
	    _didIteratorError10 = true;
	    _iteratorError10 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion10 && _iterator10.return) {
	        _iterator10.return();
	      }
	    } finally {
	      if (_didIteratorError10) {
	        throw _iteratorError10;
	      }
	    }
	  }

	  return resources.join("\n");
	}

	function localeToAppleStringsDict(locale, enLocale) {
	  var resources = [];
	  var keys = (0, _keys2.default)(locale.plurals);
	  keys.sort();
	  var dict = [];
	  var plist = [{ _attr: { version: "1.0" } }, { dict: dict }];
	  var _iteratorNormalCompletion11 = true;
	  var _didIteratorError11 = false;
	  var _iteratorError11 = undefined;

	  try {
	    for (var _iterator11 = (0, _getIterator3.default)(keys), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	      var _key7 = _step11.value;

	      var _value7 = locale.plurals[_key7];

	      dict.push({ key: snakeToCamel(_key7) });
	      var plural = [];
	      dict.push({ dict: plural });
	      plural.push({ key: 'NSStringLocalizedFormatKey' });
	      plural.push({ string: '%#@value@' });
	      plural.push({ key: 'value' });
	      var plurals = [{ key: 'NSStringFormatSpecTypeKey' }, { string: 'NSStringPluralRuleType' }, { key: 'NSStringFormatValueTypeKey' }, { string: _value7.formatter.replace(/%/, '') }];
	      plural.push({ dict: plurals });

	      var _iteratorNormalCompletion12 = true;
	      var _didIteratorError12 = false;
	      var _iteratorError12 = undefined;

	      try {
	        for (var _iterator12 = (0, _getIterator3.default)(PLURALS), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	          var qty = _step12.value;

	          if (_value7[qty] != null) {
	            plurals.push({ key: qty });
	            var s = _value7[qty].replace(/%[sfdg]/g, _value7.formatter);
	            plurals.push({ string: s });
	          };
	        }
	      } catch (err) {
	        _didIteratorError12 = true;
	        _iteratorError12 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion12 && _iterator12.return) {
	            _iterator12.return();
	          }
	        } finally {
	          if (_didIteratorError12) {
	            throw _iteratorError12;
	          }
	        }
	      }

	      resources.push(plural);
	    }
	  } catch (err) {
	    _didIteratorError11 = true;
	    _iteratorError11 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion11 && _iterator11.return) {
	        _iterator11.return();
	      }
	    } finally {
	      if (_didIteratorError11) {
	        throw _iteratorError11;
	      }
	    }
	  }

	  return (0, _xml2.default)([{ plist: plist }], { declaration: true, indent: '    ' });
	}

	function swiftFuncArgs(value) {
	  var matches = value.value.match(/%[d|s|f]/g) || [];
	  return matches.map(function (v) {
	    if (v === "%s") {
	      return "String";
	    } else if (v === "%d") {
	      return "Int";
	    } else if (v === "%f") {
	      return "Float";
	    } else {
	      return "AnyObject";
	    }
	  });
	}

	function swiftFunc(value) {
	  var resName = snakeToCamel(value.key);
	  var args = swiftFuncArgs(value);

	  var swiftSignature = args.map(function (v, i) {
	    return 'v' + i + ': ' + v;
	  }).join(', ');
	  var swiftCall = args.map(function (v, i) {
	    return 'v' + i;
	  }).join(', ');

	  if (value.formatter != null) {
	    return '\n  public static func ' + resName + '(' + swiftSignature + ') -> String {\n      return String.localizedStringWithFormat(NSLocalizedString("' + resName + '", comment: "' + value.key + '"), ' + swiftCall + ')\n  }';
	  }

	  return '\n  public static func ' + resName + '(' + swiftSignature + ') -> String {\n      return R.string.localizable.' + resName + '(' + swiftCall + ')\n  }';
	}

	function localeToAppleRObjC(locale) {
	  var resources = [];
	  var keys = (0, _keys2.default)(locale.strings);
	  keys.sort();
	  var _iteratorNormalCompletion13 = true;
	  var _didIteratorError13 = false;
	  var _iteratorError13 = undefined;

	  try {
	    for (var _iterator13 = (0, _getIterator3.default)(keys), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	      var _key8 = _step13.value;

	      var _value8 = locale.strings[_key8];
	      if (_value8.meta.comment != null) {
	        resources.push('/* ' + _value8.meta.comment + ' */');
	      }
	      resources.push(swiftFunc(_value8));
	    }
	  } catch (err) {
	    _didIteratorError13 = true;
	    _iteratorError13 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion13 && _iterator13.return) {
	        _iterator13.return();
	      }
	    } finally {
	      if (_didIteratorError13) {
	        throw _iteratorError13;
	      }
	    }
	  }

	  keys = (0, _keys2.default)(locale.plurals);
	  keys.sort();
	  var _iteratorNormalCompletion14 = true;
	  var _didIteratorError14 = false;
	  var _iteratorError14 = undefined;

	  try {
	    for (var _iterator14 = (0, _getIterator3.default)(keys), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	      var _key9 = _step14.value;

	      var _value9 = locale.plurals[_key9];
	      if (_value9.meta.enKey) {
	        continue;
	      }
	      if (_value9.meta.comment != null && _value9.meta.comment.length > 0) {
	        resources.push('/* ' + _value9.meta.comment + ' */');
	      }
	      resources.push(swiftFunc(_value9));
	    }
	  } catch (err) {
	    _didIteratorError14 = true;
	    _iteratorError14 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion14 && _iterator14.return) {
	        _iterator14.return();
	      }
	    } finally {
	      if (_didIteratorError14) {
	        throw _iteratorError14;
	      }
	    }
	  }

	  return '\n// RS.swift\n\nimport Foundation\n\npublic class RS: NSObject {\n  ' + resources.join('\n') + '\n}\n';
	}

	function localesFromCSV(csvText) {
	  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  var csv = (0, _sync2.default)(csvText, { columns: true });

	  var locales = checkFormatAndGetLocales(csv[0]);

	  var matchers = textMatches(queries);

	  var _iteratorNormalCompletion15 = true;
	  var _didIteratorError15 = false;
	  var _iteratorError15 = undefined;

	  try {
	    for (var _iterator15 = (0, _getIterator3.default)(csv), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	      var row = _step15.value;

	      parseRow(locales, row, matchers);
	    }
	  } catch (err) {
	    _didIteratorError15 = true;
	    _iteratorError15 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion15 && _iterator15.return) {
	        _iterator15.return();
	      }
	    } finally {
	      if (_didIteratorError15) {
	        throw _iteratorError15;
	      }
	    }
	  }

	  return locales;
	}

	function textMatches(queries) {
	  var parts = queries.split(/,/);
	  var res = [];
	  var _iteratorNormalCompletion16 = true;
	  var _didIteratorError16 = false;
	  var _iteratorError16 = undefined;

	  try {
	    for (var _iterator16 = (0, _getIterator3.default)(parts), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
	      var part = _step16.value;

	      var params = {
	        query: part,
	        wholeword: true,
	        matches: false
	      };
	      res.push((0, _querytext2.default)(params));
	    }
	  } catch (err) {
	    _didIteratorError16 = true;
	    _iteratorError16 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion16 && _iterator16.return) {
	        _iterator16.return();
	      }
	    } finally {
	      if (_didIteratorError16) {
	        throw _iteratorError16;
	      }
	    }
	  }

	  return res;
	}

	exports.localesFromCSV = localesFromCSV;
	exports.localeToAndroidFormat = localeToAndroidFormat;
	exports.localeToAppleStrings = localeToAppleStrings;
	exports.localeToAppleRObjC = localeToAppleRObjC;
	exports.localeToAppleStringsDict = localeToAppleStringsDict;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(15)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(80);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	var $Object = __webpack_require__(15).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(23), 'Object', {defineProperty: __webpack_require__(19).f});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(84);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(87);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(7);
	module.exports = __webpack_require__(86);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(56)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(30);
	module.exports = __webpack_require__(15).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(7);
	module.exports = __webpack_require__(89);

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(20)
	  , get      = __webpack_require__(61);
	module.exports = __webpack_require__(15).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	module.exports = __webpack_require__(15).Object.entries;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(13)
	  , $entries = __webpack_require__(93)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(34)
	  , toIObject = __webpack_require__(36)
	  , isEnum    = __webpack_require__(94).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(50)
	  , $keys    = __webpack_require__(34);

	__webpack_require__(98)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(13)
	  , core    = __webpack_require__(15)
	  , fails   = __webpack_require__(24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	var StringDecoder, parse;

	StringDecoder = __webpack_require__(101).StringDecoder;

	parse = __webpack_require__(102);

	module.exports = function(data, options) {
	  var decoder, parser, records;
	  if (options == null) {
	    options = {};
	  }
	  records = options.objname ? {} : [];
	  if (data instanceof Buffer) {
	    decoder = new StringDecoder();
	    data = decoder.write(data);
	  }
	  parser = new parse.Parser(options);
	  parser.push = function(record) {
	    if (options.objname) {
	      return records[record[0]] = record[1];
	    } else {
	      return records.push(record);
	    }
	  };
	  parser.__write(data, false);
	  if (data instanceof Buffer) {
	    parser.__write(data.end(), true);
	  }
	  parser._flush((function() {}));
	  return records;
	};


/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = require("string_decoder");

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	var Parser, StringDecoder, stream, util;

	stream = __webpack_require__(73);

	util = __webpack_require__(103);

	StringDecoder = __webpack_require__(101).StringDecoder;

	module.exports = function() {
	  var callback, called, chunks, data, options, parser;
	  if (arguments.length === 3) {
	    data = arguments[0];
	    options = arguments[1];
	    callback = arguments[2];
	    if (typeof callback !== 'function') {
	      throw Error("Invalid callback argument: " + (JSON.stringify(callback)));
	    }
	    if (!(typeof data === 'string' || Buffer.isBuffer(arguments[0]))) {
	      return callback(Error("Invalid data argument: " + (JSON.stringify(data))));
	    }
	  } else if (arguments.length === 2) {
	    if (typeof arguments[0] === 'string' || Buffer.isBuffer(arguments[0])) {
	      data = arguments[0];
	    } else {
	      options = arguments[0];
	    }
	    if (typeof arguments[1] === 'function') {
	      callback = arguments[1];
	    } else {
	      options = arguments[1];
	    }
	  } else if (arguments.length === 1) {
	    if (typeof arguments[0] === 'function') {
	      callback = arguments[0];
	    } else {
	      options = arguments[0];
	    }
	  }
	  if (options == null) {
	    options = {};
	  }
	  parser = new Parser(options);
	  if (data != null) {
	    process.nextTick(function() {
	      parser.write(data);
	      return parser.end();
	    });
	  }
	  if (callback) {
	    called = false;
	    chunks = options.objname ? {} : [];
	    parser.on('readable', function() {
	      var chunk, results;
	      results = [];
	      while (chunk = parser.read()) {
	        if (options.objname) {
	          results.push(chunks[chunk[0]] = chunk[1]);
	        } else {
	          results.push(chunks.push(chunk));
	        }
	      }
	      return results;
	    });
	    parser.on('error', function(err) {
	      called = true;
	      return callback(err);
	    });
	    parser.on('end', function() {
	      if (!called) {
	        return callback(null, chunks);
	      }
	    });
	  }
	  return parser;
	};

	Parser = function(options) {
	  var base, base1, base10, base11, base12, base13, base14, base15, base16, base2, base3, base4, base5, base6, base7, base8, base9, k, v;
	  if (options == null) {
	    options = {};
	  }
	  options.objectMode = true;
	  this.options = {};
	  for (k in options) {
	    v = options[k];
	    this.options[k] = v;
	  }
	  stream.Transform.call(this, this.options);
	  if ((base = this.options).rowDelimiter == null) {
	    base.rowDelimiter = null;
	  }
	  if ((base1 = this.options).delimiter == null) {
	    base1.delimiter = ',';
	  }
	  if ((base2 = this.options).quote == null) {
	    base2.quote = '"';
	  }
	  if ((base3 = this.options).escape == null) {
	    base3.escape = '"';
	  }
	  if ((base4 = this.options).columns == null) {
	    base4.columns = null;
	  }
	  if ((base5 = this.options).comment == null) {
	    base5.comment = '';
	  }
	  if ((base6 = this.options).objname == null) {
	    base6.objname = false;
	  }
	  if ((base7 = this.options).trim == null) {
	    base7.trim = false;
	  }
	  if ((base8 = this.options).ltrim == null) {
	    base8.ltrim = false;
	  }
	  if ((base9 = this.options).rtrim == null) {
	    base9.rtrim = false;
	  }
	  if ((base10 = this.options).auto_parse == null) {
	    base10.auto_parse = false;
	  }
	  if ((base11 = this.options).auto_parse_date == null) {
	    base11.auto_parse_date = false;
	  }
	  if ((base12 = this.options).relax == null) {
	    base12.relax = false;
	  }
	  if ((base13 = this.options).relax_column_count == null) {
	    base13.relax_column_count = false;
	  }
	  if ((base14 = this.options).skip_empty_lines == null) {
	    base14.skip_empty_lines = false;
	  }
	  if ((base15 = this.options).max_limit_on_data_read == null) {
	    base15.max_limit_on_data_read = 128000;
	  }
	  if ((base16 = this.options).skip_lines_with_empty_values == null) {
	    base16.skip_lines_with_empty_values = false;
	  }
	  this.lines = 0;
	  this.count = 0;
	  this.skipped_line_count = 0;
	  this.empty_line_count = 0;
	  this.is_int = /^(\-|\+)?([1-9]+[0-9]*)$/;
	  this.is_float = function(value) {
	    return (value - parseFloat(value) + 1) >= 0;
	  };
	  this.decoder = new StringDecoder();
	  this.buf = '';
	  this.quoting = false;
	  this.commenting = false;
	  this.field = '';
	  this.nextChar = null;
	  this.closingQuote = 0;
	  this.line = [];
	  this.chunks = [];
	  this.rawBuf = '';
	  return this;
	};

	util.inherits(Parser, stream.Transform);

	module.exports.Parser = Parser;

	Parser.prototype._transform = function(chunk, encoding, callback) {
	  var err, error;
	  if (chunk instanceof Buffer) {
	    chunk = this.decoder.write(chunk);
	  }
	  try {
	    this.__write(chunk, false);
	    return callback();
	  } catch (error) {
	    err = error;
	    return this.emit('error', err);
	  }
	};

	Parser.prototype._flush = function(callback) {
	  var err, error;
	  try {
	    this.__write(this.decoder.end(), true);
	    if (this.quoting) {
	      this.emit('error', new Error("Quoted field not terminated at line " + (this.lines + 1)));
	      return;
	    }
	    if (this.line.length > 0) {
	      this.__push(this.line);
	    }
	    return callback();
	  } catch (error) {
	    err = error;
	    return this.emit('error', err);
	  }
	};

	Parser.prototype.__push = function(line) {
	  var field, i, j, len, lineAsColumns, rawBuf, row;
	  if (this.options.skip_lines_with_empty_values && line.join('').trim() === '') {
	    return;
	  }
	  row = null;
	  if (this.options.columns === true) {
	    this.options.columns = line;
	    rawBuf = '';
	    return;
	  } else if (typeof this.options.columns === 'function') {
	    this.options.columns = this.options.columns(line);
	    rawBuf = '';
	    return;
	  }
	  if (!this.line_length && line.length > 0) {
	    this.line_length = this.options.columns ? this.options.columns.length : line.length;
	  }
	  if (line.length === 1 && line[0] === '') {
	    this.empty_line_count++;
	  } else if (line.length !== this.line_length) {
	    if (this.options.relax_column_count) {
	      this.skipped_line_count++;
	    } else if (this.options.columns != null) {
	      throw Error("Number of columns on line " + this.lines + " does not match header");
	    } else {
	      throw Error("Number of columns is inconsistent on line " + this.lines);
	    }
	  } else {
	    this.count++;
	  }
	  if (this.options.columns != null) {
	    lineAsColumns = {};
	    for (i = j = 0, len = line.length; j < len; i = ++j) {
	      field = line[i];
	      if (this.options.columns[i] === false) {
	        continue;
	      }
	      lineAsColumns[this.options.columns[i]] = field;
	    }
	    if (this.options.objname) {
	      row = [lineAsColumns[this.options.objname], lineAsColumns];
	    } else {
	      row = lineAsColumns;
	    }
	  } else {
	    row = line;
	  }
	  if (this.options.raw) {
	    this.push({
	      raw: this.rawBuf,
	      row: row
	    });
	    return this.rawBuf = '';
	  } else {
	    return this.push(row);
	  }
	};

	Parser.prototype.__write = function(chars, end, callback) {
	  var areNextCharsDelimiter, areNextCharsRowDelimiters, auto_parse, char, escapeIsQuote, i, isDelimiter, isEscape, isNextCharAComment, isQuote, isRowDelimiter, is_float, is_int, l, ltrim, nextCharPos, ref, remainingBuffer, results, rowDelimiter, rowDelimiterLength, rtrim, wasCommenting;
	  is_int = (function(_this) {
	    return function(value) {
	      if (typeof _this.is_int === 'function') {
	        return _this.is_int(value);
	      } else {
	        return _this.is_int.test(value);
	      }
	    };
	  })(this);
	  is_float = (function(_this) {
	    return function(value) {
	      if (typeof _this.is_float === 'function') {
	        return _this.is_float(value);
	      } else {
	        return _this.is_float.test(value);
	      }
	    };
	  })(this);
	  auto_parse = (function(_this) {
	    return function(value) {
	      var m;
	      if (_this.options.auto_parse && is_int(_this.field)) {
	        _this.field = parseInt(_this.field);
	      } else if (_this.options.auto_parse && is_float(_this.field)) {
	        _this.field = parseFloat(_this.field);
	      } else if (_this.options.auto_parse && _this.options.auto_parse_date) {
	        m = Date.parse(_this.field);
	        if (!isNaN(m)) {
	          _this.field = new Date(m);
	        }
	      }
	      return _this.field;
	    };
	  })(this);
	  ltrim = this.options.trim || this.options.ltrim;
	  rtrim = this.options.trim || this.options.rtrim;
	  chars = this.buf + chars;
	  l = chars.length;
	  rowDelimiterLength = this.options.rowDelimiter ? this.options.rowDelimiter.length : 0;
	  i = 0;
	  if (this.lines === 0 && 0xFEFF === chars.charCodeAt(0)) {
	    i++;
	  }
	  while (i < l) {
	    if (!end) {
	      remainingBuffer = chars.substr(i, l - i);
	      if ((!this.commenting && l - i < this.options.comment.length && this.options.comment.substr(0, l - i) === remainingBuffer) || (this.options.rowDelimiter && l - i < rowDelimiterLength && this.options.rowDelimiter.substr(0, l - i) === remainingBuffer) || (this.options.rowDelimiter && this.quoting && l - i < (this.options.quote.length + rowDelimiterLength) && (this.options.quote + this.options.rowDelimiter).substr(0, l - i) === remainingBuffer) || (l - i <= this.options.delimiter.length && this.options.delimiter.substr(0, l - i) === remainingBuffer) || (l - i <= this.options.escape.length && this.options.escape.substr(0, l - i) === remainingBuffer)) {
	        break;
	      }
	    }
	    char = this.nextChar ? this.nextChar : chars.charAt(i);
	    this.nextChar = l > i + 1 ? chars.charAt(i + 1) : '';
	    if (this.options.raw) {
	      this.rawBuf += char;
	    }
	    if (this.options.rowDelimiter == null) {
	      if ((!this.quoting) && (char === '\n' || char === '\r')) {
	        rowDelimiter = char;
	        nextCharPos = i + 1;
	      } else if (this.nextChar === '\n' || this.nextChar === '\r') {
	        rowDelimiter = this.nextChar;
	        nextCharPos = i + 2;
	        if (this.raw) {
	          rawBuf += this.nextChar;
	        }
	      }
	      if (rowDelimiter) {
	        if (rowDelimiter === '\r' && chars.charAt(nextCharPos) === '\n') {
	          rowDelimiter += '\n';
	        }
	        this.options.rowDelimiter = rowDelimiter;
	        rowDelimiterLength = this.options.rowDelimiter.length;
	      }
	    }
	    if (!this.commenting && char === this.options.escape) {
	      escapeIsQuote = this.options.escape === this.options.quote;
	      isEscape = this.nextChar === this.options.escape;
	      isQuote = this.nextChar === this.options.quote;
	      if (!(escapeIsQuote && !this.field && !this.quoting) && (isEscape || isQuote)) {
	        i++;
	        char = this.nextChar;
	        this.nextChar = chars.charAt(i + 1);
	        this.field += char;
	        if (this.options.raw) {
	          this.rawBuf += char;
	        }
	        i++;
	        continue;
	      }
	    }
	    if (!this.commenting && char === this.options.quote) {
	      if (this.quoting) {
	        areNextCharsRowDelimiters = this.options.rowDelimiter && chars.substr(i + 1, this.options.rowDelimiter.length) === this.options.rowDelimiter;
	        areNextCharsDelimiter = chars.substr(i + 1, this.options.delimiter.length) === this.options.delimiter;
	        isNextCharAComment = this.nextChar === this.options.comment;
	        if (this.nextChar && !areNextCharsRowDelimiters && !areNextCharsDelimiter && !isNextCharAComment) {
	          if (this.options.relax) {
	            this.quoting = false;
	            this.field = "" + this.options.quote + this.field;
	          } else {
	            throw Error("Invalid closing quote at line " + (this.lines + 1) + "; found " + (JSON.stringify(this.nextChar)) + " instead of delimiter " + (JSON.stringify(this.options.delimiter)));
	          }
	        } else {
	          this.quoting = false;
	          this.closingQuote = this.options.quote.length;
	          i++;
	          if (end && i === l) {
	            this.line.push(auto_parse(this.field));
	            this.field = '';
	          }
	          continue;
	        }
	      } else if (!this.field) {
	        this.quoting = true;
	        i++;
	        continue;
	      } else if (this.field && !this.options.relax) {
	        throw Error("Invalid opening quote at line " + (this.lines + 1));
	      }
	    }
	    isRowDelimiter = this.options.rowDelimiter && chars.substr(i, this.options.rowDelimiter.length) === this.options.rowDelimiter;
	    if (isRowDelimiter || (end && i === l - 1)) {
	      this.lines++;
	    }
	    wasCommenting = false;
	    if (!this.commenting && !this.quoting && this.options.comment && chars.substr(i, this.options.comment.length) === this.options.comment) {
	      this.commenting = true;
	    } else if (this.commenting && isRowDelimiter) {
	      wasCommenting = true;
	      this.commenting = false;
	    }
	    isDelimiter = chars.substr(i, this.options.delimiter.length) === this.options.delimiter;
	    if (!this.commenting && !this.quoting && (isDelimiter || isRowDelimiter)) {
	      if (isRowDelimiter && this.line.length === 0 && this.field === '') {
	        if (wasCommenting || this.options.skip_empty_lines) {
	          i += this.options.rowDelimiter.length;
	          this.nextChar = chars.charAt(i);
	          continue;
	        }
	      }
	      if (rtrim) {
	        if (!this.closingQuote) {
	          this.field = this.field.trimRight();
	        }
	      }
	      this.line.push(auto_parse(this.field));
	      this.closingQuote = 0;
	      this.field = '';
	      if (isDelimiter) {
	        i += this.options.delimiter.length;
	        this.nextChar = chars.charAt(i);
	        if (end && !this.nextChar) {
	          isRowDelimiter = true;
	          this.line.push('');
	        }
	      }
	      if (isRowDelimiter) {
	        this.__push(this.line);
	        this.line = [];
	        i += (ref = this.options.rowDelimiter) != null ? ref.length : void 0;
	        this.nextChar = chars.charAt(i);
	        continue;
	      }
	    } else if (!this.commenting && !this.quoting && (char === ' ' || char === '\t')) {
	      if (!(ltrim && !this.field)) {
	        this.field += char;
	      }
	      if (end && i + 1 === l) {
	        if (this.options.trim || this.options.rtrim) {
	          this.field = this.field.trimRight();
	        }
	      }
	      i++;
	    } else if (!this.commenting) {
	      this.field += char;
	      i++;
	    } else {
	      i++;
	    }
	    if (!this.commenting && this.field.length > this.options.max_limit_on_data_read) {
	      throw Error("Delimiter not found in the file " + (JSON.stringify(this.options.delimiter)));
	    }
	    if (!this.commenting && this.line.length > this.options.max_limit_on_data_read) {
	      throw Error("Row delimiter not found in the file " + (JSON.stringify(this.options.rowDelimiter)));
	    }
	  }
	  if (end) {
	    if (rtrim) {
	      if (!this.closingQuote) {
	        this.field = this.field.trimRight();
	      }
	    }
	    if (this.field !== '') {
	      this.line.push(auto_parse(this.field));
	      this.field = '';
	    }
	    if (this.field.length > this.options.max_limit_on_data_read) {
	      throw Error("Delimiter not found in the file " + (JSON.stringify(this.options.delimiter)));
	    }
	    if (l === 0) {
	      this.lines++;
	    }
	    if (this.line.length > this.options.max_limit_on_data_read) {
	      throw Error("Row delimiter not found in the file " + (JSON.stringify(this.options.rowDelimiter)));
	    }
	  }
	  this.buf = '';
	  results = [];
	  while (i < l) {
	    this.buf += chars.charAt(i);
	    results.push(i++);
	  }
	  return results;
	};


/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var escapeForXML = __webpack_require__(105);
	var Stream = __webpack_require__(73).Stream;

	var DEFAULT_INDENT = '    ';

	function xml(input, options) {

	    if (typeof options !== 'object') {
	        options = {
	            indent: options
	        };
	    }

	    var stream      = options.stream ? new Stream() : null,
	        output      = "",
	        interrupted = false,
	        indent      = !options.indent ? ''
	                        : options.indent === true ? DEFAULT_INDENT
	                            : options.indent,
	        instant     = true;


	    function delay (func) {
	        if (!instant) {
	            func();
	        } else {
	            process.nextTick(func);
	        }
	    }

	    function append (interrupt, out) {
	        if (out !== undefined) {
	            output += out;
	        }
	        if (interrupt && !interrupted) {
	            stream = stream || new Stream();
	            interrupted = true;
	        }
	        if (interrupt && interrupted) {
	            var data = output;
	            delay(function () { stream.emit('data', data) });
	            output = "";
	        }
	    }

	    function add (value, last) {
	        format(append, resolve(value, indent, indent ? 1 : 0), last);
	    }

	    function end() {
	        if (stream) {
	            var data = output;
	            delay(function () {
	              stream.emit('data', data);
	              stream.emit('end');
	              stream.readable = false;
	              stream.emit('close');
	            });
	        }
	    }

	    function addXmlDeclaration(declaration) {
	        var encoding = declaration.encoding || 'UTF-8',
	            attr =  { version: '1.0', encoding: encoding };

	        if (declaration.standalone) {
	            attr.standalone = declaration.standalone
	        }

	        add({'?xml': { _attr: attr } });
	        output = output.replace('/>', '?>');
	    }

	    // disable delay delayed
	    delay(function () { instant = false });

	    if (options.declaration) {
	        addXmlDeclaration(options.declaration);
	    }

	    if (input && input.forEach) {
	        input.forEach(function (value, i) {
	            var last;
	            if (i + 1 === input.length)
	                last = end;
	            add(value, last);
	        });
	    } else {
	        add(input, end);
	    }

	    if (stream) {
	        stream.readable = true;
	        return stream;
	    }
	    return output;
	}

	function element (/*input, …*/) {
	    var input = Array.prototype.slice.call(arguments),
	        self = {
	            _elem:  resolve(input)
	        };

	    self.push = function (input) {
	        if (!this.append) {
	            throw new Error("not assigned to a parent!");
	        }
	        var that = this;
	        var indent = this._elem.indent;
	        format(this.append, resolve(
	            input, indent, this._elem.icount + (indent ? 1 : 0)),
	            function () { that.append(true) });
	    };

	    self.close = function (input) {
	        if (input !== undefined) {
	            this.push(input);
	        }
	        if (this.end) {
	            this.end();
	        }
	    };

	    return self;
	}

	function create_indent(character, count) {
	    return (new Array(count || 0).join(character || ''))
	}

	function resolve(data, indent, indent_count) {
	    indent_count = indent_count || 0;
	    var indent_spaces = create_indent(indent, indent_count);
	    var name;
	    var values = data;
	    var interrupt = false;

	    if (typeof data === 'object') {
	        var keys = Object.keys(data);
	        name = keys[0];
	        values = data[name];

	        if (values && values._elem) {
	            values._elem.name = name;
	            values._elem.icount = indent_count;
	            values._elem.indent = indent;
	            values._elem.indents = indent_spaces;
	            values._elem.interrupt = values;
	            return values._elem;
	        }
	    }

	    var attributes = [],
	        content = [];

	    var isStringContent;

	    function get_attributes(obj){
	        var keys = Object.keys(obj);
	        keys.forEach(function(key){
	            attributes.push(attribute(key, obj[key]));
	        });
	    }

	    switch(typeof values) {
	        case 'object':
	            if (values === null) break;

	            if (values._attr) {
	                get_attributes(values._attr);
	            }

	            if (values._cdata) {
	                content.push(
	                    ('<![CDATA[' + values._cdata).replace(/\]\]>/g, ']]]]><![CDATA[>') + ']]>'
	                );
	            }

	            if (values.forEach) {
	                isStringContent = false;
	                content.push('');
	                values.forEach(function(value) {
	                    if (typeof value == 'object') {
	                        var _name = Object.keys(value)[0];

	                        if (_name == '_attr') {
	                            get_attributes(value._attr);
	                        } else {
	                            content.push(resolve(
	                                value, indent, indent_count + 1));
	                        }
	                    } else {
	                        //string
	                        content.pop();
	                        isStringContent=true;
	                        content.push(escapeForXML(value));
	                    }

	                });
	                if (!isStringContent) {
	                    content.push('');
	                }
	            }
	        break;

	        default:
	            //string
	            content.push(escapeForXML(values));

	    }

	    return {
	        name:       name,
	        interrupt:  interrupt,
	        attributes: attributes,
	        content:    content,
	        icount:     indent_count,
	        indents:    indent_spaces,
	        indent:     indent
	    };
	}

	function format(append, elem, end) {

	    if (typeof elem != 'object') {
	        return append(false, elem);
	    }

	    var len = elem.interrupt ? 1 : elem.content.length;

	    function proceed () {
	        while (elem.content.length) {
	            var value = elem.content.shift();

	            if (value === undefined) continue;
	            if (interrupt(value)) return;

	            format(append, value);
	        }

	        append(false, (len > 1 ? elem.indents : '')
	            + (elem.name ? '</' + elem.name + '>' : '')
	            + (elem.indent && !end ? '\n' : ''));

	        if (end) {
	            end();
	        }
	    }

	    function interrupt(value) {
	       if (value.interrupt) {
	           value.interrupt.append = append;
	           value.interrupt.end = proceed;
	           value.interrupt = false;
	           append(true);
	           return true;
	       }
	       return false;
	    }

	    append(false, elem.indents
	        + (elem.name ? '<' + elem.name : '')
	        + (elem.attributes.length ? ' ' + elem.attributes.join(' ') : '')
	        + (len ? (elem.name ? '>' : '') : (elem.name ? '/>' : ''))
	        + (elem.indent && len > 1 ? '\n' : ''));

	    if (!len) {
	        return append(false, elem.indent ? '\n' : '');
	    }

	    if (!interrupt(elem)) {
	        proceed();
	    }
	}

	function attribute(key, value) {
	    return key + '=' + '"' + escapeForXML(value) + '"';
	}

	module.exports = xml;
	module.exports.element = module.exports.Element = element;


/***/ },
/* 105 */
/***/ function(module, exports) {

	
	var XML_CHARACTER_MAP = {
	    '&': '&amp;',
	    '"': '&quot;',
	    "'": '&apos;',
	    '<': '&lt;',
	    '>': '&gt;'
	};

	function escapeForXML(string) {
	    return string && string.replace
	        ? string.replace(/([&"<>'])/g, function(str, item) {
	            return XML_CHARACTER_MAP[item];
	          })
	        : string;
	}

	module.exports = escapeForXML;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof2 = __webpack_require__(107);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// querytext.js 1.1 (c) 2012-2015 niko 
	// https://github.com/nikopol/querytext.js

	/*
	test or highlight if a text/html match a boolean query

	supported query syntax:

	  - AND (including + leading character)
	  - OR  (including | character)
	  - NOT (including leading ! or - charaters),
	  - parenthesis
	  - left and right truncatures (with * character)
	  - "quotes" for exact matching
	  - "word1 word2"~x
	    to search word1 a x words of distance from word2 

	constructors:

	  querytext()          // get empty querytext object
	  querytext("query")   // get a querytext object with a parsed query
	  querytext({          // get a querytext object object with options:
	    sensitive: false,  //   case sensitive (default=false)
	    wholeword: true,   //   whole word only (default=true)
	    unaccent: true,    //   accent unsensitive (default=true)
	    matches: true ,    //   want matched words with their position (default=true)
	                       //     set it to false if you don't need highlighting or
	                       //     matches positions
	    debug: false,      //   console debugging ouput (default=false)
	    query: "query"     //   query string
	  })                   // return a querytext object

	querytext object methods:

	  parse('query');    // return {error:"msg",pos:offset} or the
	                     // querytext object
	  
	  flatten();         // return a flat version of the tree in the form :
	                     // { or:[...], and:[...], not:[...] }

	  normalize();       // return the normalized query as string
	  
	  match('text');     // test if the text match the query
	                     // if matches flag is true =>
	                     //	   return an array of matches :
	                           [ { txt:"match", ofs:match_offset_in_bytes, pos:word_num } ...]
	                     // if matches flag is false =>
	                     //    return true or false
	  
	  dump();            // return a string dump of the query tree
	                     // (called after match, its include each
	                     // nodes results)
	  
	  highlight('text','before','after',ishtml)
	                     // highlight a text with the query, inserting
	                     // 'before' and 'after' around each matching node.
	                     // return the text higlighted
	  
	  highlightml(DOMelement,'before','after')
	                     // highlight a DOM tree with the query, inserting
	                     // 'before' and 'after' around each matching node.
	                     // return the DOMelement higlighted

	match usages:

	  querytext('!!tata').match('toto TaTa TITI'); //-> true
	  querytext('--zaza').match('toto TaTa TITI'); //return false
	  querytext('NOT NOT zaza').match('toto ZaZa TITI'); //-> true

	  querytext('-tata').match('toto TaTa TITI'); //-> false

	  querytext('toto AND "TATA TITI"').match('toto TaTa TITI'); //-> true
	  querytext('toto +"TATA TITI"').match('toto TaTa TITI'); //-> true

	  querytext({
	    query: "T",
	    matches: true,
	    wholeword: false
	  }).match("toto") //-> [ {ofs:0,txt:'t'}, {ofs:2,txt:'t'} ]

	analysis usages:

	  var qt = querytext('toto AND (tata OR zizi)'); //-> querytext object
	  qt.match('toto TaTa TITI');  //-> true
	  console.log(qt.dump()); //output the following dump

	  AND = true
	   | "toto" = true
	   | OR = true : (tata OR zizi)
	   |  | "tata" = true
	   |  | "zizi"

	normalization usages:

	  querytext('toto tata').normalize() //-> "toto OR tata"
	  querytext('to -ta ti').normalize() //-> "(to AND NOT ta) OR ti"

	highlight usages:

	  querytext({query:"zob",matches:true})
	    .highlight("<span class='zob'>zob</span>","[","]");
	    //-> "<span class='[zob]'>[zob]</span>"

	  querytext({query:"zob",matches:true})
	    .highlightml("<span class='zob'>zob</span>","[","]");
	    //-> "<span class='zob'>[zob]</span>"

	=========================================================================
	LICENSE
	=========================================================================

	DO WHAT THE FUCK YOU WANT WITH
	ESPECIALLY IF YOU OFFER ME A BEER
	PUBLIC LICENSE
	Version 1, March 2012

	Copyright (C) 2012 - niko

	Everyone is permitted to copy and distribute verbatim 
	or modified copies of this license document, and 
	changing it is allowed as long as the name is changed.

	DO WHAT THE FUCK YOU WANT TO PUBLIC
	ESPECIALLY IF YOU OFFER ME A BEER LICENSE
	TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND
	MODIFICATION :
	- You just DO WHAT THE FUCK YOU WANT.
	- Especially if you offer me a beer.

	*/

	var querytext = function querytext(o) {

		"use strict";

		var unaccent = function unaccent(t) {
			return t
			//.replace(/Æ/gm,'AE')
			.replace(/[ÁÂÀÅÃÄ]/gm, 'A').replace(/Ç/gm, 'C').replace(/[ÉÊÈË]/gm, 'E').replace(/[ÍÎÌÏ]/gm, 'I').replace(/Ñ/gm, 'N')
			//.replace(/Œ/gm,'OE')
			.replace(/[ÓÔÒØÕÖ]/gm, 'O').replace(/[ÚÛÙÜ]/gm, 'U').replace(/Ý/gm, 'Y')
			//.replace(/æ/gm,'ae')
			.replace(/[áâàåãä]/gm, 'a').replace(/ç/gm, 'c').replace(/[éêèë]/gm, 'e').replace(/[íîìï]/gm, 'i').replace(/ñ/gm, 'n').replace(/[óôòøõö]/gm, 'o').replace(/[úûùü]/gm, 'u').replace(/[ýÿ]/gm, 'y');
		},
		    lighton = function lighton(match, txt, bef, aft) {
			if (match) {
				var hl = [];
				//merge intersections
				match.forEach(function (m) {
					var x = false,
					    p = m.ofs,
					    l = m.txt.length,
					    e = p + l - 1;
					for (var n in hl) {
						if (p >= hl[n].p && p <= hl[n].e) {
							//start intersect
							if (e > hl[n].e) {
								hl[n].e = e;
								hl[n].l = 1 + e - hl[n].p;
							}
							x = true;
						} else if (e >= hl[n].p && e <= hl[n].e) {
							//end intersect
							hl[n].p = p;
							hl[n].l = 1 + hl[n].e - p;
							x = true;
						} else if (p < hl[n].p && e > hl[n].e) {
							//global intersect
							hl[n].p = p;
							hl[n].e = e;
							hl[n].l = l;
							x = true;
						}
					}
					//no intersection, add it
					if (!x) hl.push({ p: p, l: l, e: e });
				});
				//highlight last first
				hl.sort(function (a, b) {
					return b.p - a.p;
				}).forEach(function (m) {
					txt = txt.substr(0, m.p) + bef + txt.substr(m.p, m.l) + aft + txt.substr(m.p + m.l);
				});
			}
			return txt;
		},
		    qt = {
			VERSION: '1.1',
			opts: {
				dftbool: 'OR',
				sensitive: false,
				wholeword: true,
				unaccent: true,
				matches: true,
				debug: false,
				wordpos: false
			},
			error: false,
			query: false,
			tree: false,
			parse: function parse(q) {
				var parse_branch = function parse_branch(qry, offset, opts) {
					//qry = qry.replace(/(^\s+|\s+$)/g,''); //trim
					if (!offset) offset = 0;
					var n = 0,
					    not = false,
					    mode = false,
					    len = qry.length,
					    o,
					    op,
					    q,
					    t,
					    p,
					    b,
					    d,
					    root,
					    text_rex = function text_rex(text) {
						var txt = text.replace(/(^\s+|\s+$)/gm, ''),

						//set truncatures
						ltrunc = txt[0] == '*' || !opts.wholeword ? '' : '(^|[\\s\.,;:\\-+=<>\\\\\\/\'"\\(\\)~&\\[\\]{}》《，]:?)',
						    rtrunc = txt.substr(-1) == '*' || !opts.wholeword ? '' : '($|[\\s\.,;:\\-+=<>\\\\\\/\'"\\(\\)~&\\[\\]{}》《，]:?)';
						txt = txt.replace(/(^\*|\*$)/g, '');
						//escape special regexp chars
						txt = txt.replace(/([\(\)\+\*\?\:\[\]])/g, "\\$1");
						//concats spaces
						txt = txt.replace(/\s+/g, '\\s+');
						return new RegExp(ltrunc + txt + rtrunc, 'm' + (opts.sensitive ? '' : 'i') + (opts.matches ? 'g' : ''));
					},
					    add_branch = function add_branch(node, src) {
						if (not) {
							node.not = true;
							if (!mode) mode = 'AND';
							not = false;
						}
						if (node.text) node.rex = text_rex(node.text);
						if (src) node.src = src;
						if (root) {
							if (!mode) mode = opts.dftbool;
							if (mode === root.bool && not === (root.not || false)) root.subs.push(node);else root = { bool: mode, subs: [root, node] };
						} else root = node;
						mode = false;
					};

					while (n < len) {
						if (qry[n] == '"') {
							//PARSE QUOTES
							o = n++;
							t = '';
							while (n < len && qry[n] != '"') {
								t += qry[n++];
							}if (n >= len) return { error: 'unbalanced quotes', pos: o + offset };
							if (!t.length || t == '*') return { error: 'empty quotes', pos: o + offset };
							n++;
							if (n < len && qry[n] == '~') {
								//QUOTED NEAR
								n++;
								d = '';
								while (n < len && qry[n] >= '0' && qry[n] <= '9') {
									d += qry[n++];
								}if (!d.length) return { error: 'proximity distance missing', pos: o + offset };
								d = parseInt(d, 10);
								b = { bool: 'NEAR', dist: d, subs: [] };
								t.split(/\s+/).forEach(function (w) {
									b.subs.push({
										text: w,
										rex: text_rex(w)
									});
								});
								if (b.subs.length < 2) return { error: '2 words expected at least for near operator', pos: o + offset };
								add_branch(b);
								opts.wordpos = opts.matches = true;
							} else add_branch({ text: t });
						} else if (qry[n] == ')') {
							//PARSE PARENTHESIS
							return { error: 'unbalanced parenthesis', pos: o + offset };
						} else if (qry[n] == '(') {
							o = n++;
							p = 1;
							t = '';
							while (n < len) {
								if (qry[n] == ')' && --p == 0) break;
								if (qry[n] == '(') p++;
								t += qry[n];
								if (qry[n] == '"') {
									q = n++;
									while (n < len && qry[n] != '"') {
										t += qry[n++];
									}t += qry[n];
									if (n >= len) return { error: 'unbalanced quotes', pos: q + offset };
								}
								n++;
							}
							if (n >= len) return { error: 'unbalanced parenthesis', pos: o + offset };
							var b = parse_branch(t, o + offset + 1, opts);
							if (b.error) return b;
							add_branch(b, t);
							n++;
						} else if (qry[n] <= ' ') {
							//SKIP SPACES
							while (n < len && qry[n] <= ' ') {
								n++;
							}
						} else if (qry[n] == '+') {
							//AND
							if (not || mode) return { error: 'unexpected operator', pos: n + offset };
							mode = 'AND';
							op = n++;
						} else if (qry[n] == '|') {
							//OR
							if (not || mode) return { error: 'unexpected operator', pos: n + offset };
							mode = 'OR';
							op = n++;
						} else if (qry[n] == '-' || qry[n] == '!') {
							//NOT
							not = !not;
							op = n++;
						} else {
							//PARSE WORD
							o = n;
							t = '';
							while (n < len && qry[n] > ' ' && !/[\(\)\+\-\|\!\"]/.test(qry[n])) {
								t += qry[n++];
							}if (/^(AND|OR|NOT)$/i.test(t)) {
								//booleans
								op = o;
								var b = RegExp.$1.toUpperCase();
								if (b == 'NOT') {
									not = !not;
								} else if (not || mode) {
									return { error: 'unexpected operator', pos: o + offset };
								} else {
									mode = b;
								}
							} else if (t == '*') return { error: 'empty word', pos: o + offset };else add_branch({ text: t });
						}
					}
					if (not || mode) return { error: 'unexpected operator', pos: op + offset };
					return root ? root : { error: 'empty query', pos: offset };
				};
				this.error = this.tree = false;
				this.query = this.opts.unaccent ? unaccent(q) : q;
				var b = parse_branch(this.query, 0, this.opts);
				delete this.pos;
				if (b.error) {
					this.error = b.error;
					this.pos = b.pos;
					if (this.opts.debug) console.log(b.error, 'at', b.pos);
				} else {
					this.tree = b;
					if (this.opts.debug) console.log("[QT:parser]\n" + this.dump());
				}
				return this;
			},
			dump: function dump(node, ind) {
				if (!this.tree) return '';
				if (!node) node = this.tree;
				if (!ind) ind = '';
				var not = node.not ? 'NOT ' : '',
				    src = node.src ? ' : ' + not + '(' + node.src + ')' : '',
				    dst = node.dist != undefined ? '(' + node.dist + ')' : '',
				    hit = node.match != undefined ? ' = ' + node.match : '',
				    pos = node.pos != undefined ? ' [' + node.pos.map(function (p) {
					return p.txt + ":" + p.ofs + ":" + p.pos;
				}).join('|') + ']' : '',
				    self = this;
				return node.bool ? ind + not + node.bool + dst + hit + src + "\n" + node.subs.map(function (n) {
					return self.dump(n, ind + ' | ');
				}).join("\n") : ind + not + '"' + node.text + '"' + hit + pos;
			},
			flatten: function flatten(node, flat, mode) {
				if (node == undefined) node = this.tree;
				if (flat == undefined) flat = { not: [], or: [], and: [] };
				if (mode == undefined) mode = {};
				if (node.not) mode.not = !mode.not;
				if (node.bool) {
					var self = this;
					node.subs.forEach(function (s) {
						flat = self.flatten(s, flat, { not: mode.not, or: node.bool == "OR", and: node.bool == "AND" });
					});
				} else if (mode.not) flat.not.push(node.text);else if (mode.and) flat.and.push(node.text);else flat.or.push(node.text);
				return flat;
			},
			normalize: function normalize(node) {
				if (!node) node = this.tree;
				if (!node) return '';
				var not = node.not ? 'NOT ' : '',
				    lst = [],
				    self = this,
				    t;
				if (node.bool) {
					if (node.bool == 'NEAR') {
						t = node.subs.map(function (n) {
							return n.text;
						}).join(' ');
						return not + '"' + t + '"~' + node.dist;
					} else {
						node.subs.forEach(function (n) {
							lst.push(self.normalize(n));
						});
						return not || node != this.tree ? not + '(' + lst.join(' ' + node.bool + ' ') + ')' : lst.join(' ' + node.bool + ' ');
					}
				}
				return (/^(and|or|not)$/i.test(node.text) || /[\s\(\)\+\-\!\?\|]/.test(node.text) ? not + '"' + node.text + '"' : not + node.text
				);
			},
			match: function match(txt) {
				if (!this.tree) return false;
				var self = this,
				    matches = this.opts.matches ? [] : false,
				    wordidx = this.opts.wordpos ? {} : false,
				    reset_node = function reset_node(node) {
					delete node.match;
					delete node.pos;
					if (node.bool) node.subs.forEach(function (n) {
						reset_node(n);
					});
				},
				    wordpos = function wordpos(o) {
					if (wordidx[o] == undefined) {
						var w = 0,
						    i;
						for (i in wordidx) {
							if (i > o) break;
							w = wordidx[i];
						}
						return w;
					} else return wordidx[o];
				},
				    mindist = function mindist(pos, node) {
					var d,
					    min = Number.MAX_VALUE;
					node.pos.forEach(function (p) {
						d = Math.abs(p.pos - pos);
						if (d < min) min = d;
					});
					return min - 1;
				},
				    node_match = function node_match(node, text) {
					var ok, i, j, k, n, w, p, l;
					if (node.bool) {
						if (node.bool == 'NEAR') {
							for (ok = true, l = node.subs.length, i = 0; i < l && ok; ++i) {
								ok = node_match(node.subs[i], text);
							}if (ok) {
								for (i = 0; i < l && ok; ++i) {
									n = node.subs[i];
									n.pos = n.pos.filter(function (p) {
										for (j = 0; j < l; ++j) {
											if (j != i && mindist(p.pos, node.subs[j]) <= node.dist) return true;
										}return false;
									});
									ok = n.pos.length;
								}
							}
						} else if (node.bool == 'AND') for (ok = true, i = 0; i < node.subs.length && ok; ++i) {
							ok = node_match(node.subs[i], text);
						} else for (ok = false, i = 0; i < node.subs.length; ++i) {
							ok = node_match(node.subs[i], text) || ok;
							if (ok && !matches) break;
						}
					} else if (matches && !node.not) {
						ok = false;
						node.pos = [];
						while ((i = node.rex.exec(text)) != null) {
							ok = true;
							w = i[0];
							p = i.index;
							if (!self.opts.sensitive) w = w.toLowerCase();
							if (self.opts.wholeword) {
								l = w.length;
								w = w.replace(/^[\s\.,;:\-+=<>\\\/'"\(\)~&\[\]{}》《，]+/g, '');
								p += l - w.length;
								w = w.replace(/[\s,\.;:\-+=<>\\\/'"\(\)~&\[\]{}》《，]+$/g, '');
								if (l > 1) node.rex.lastIndex--;
							}
							p = { txt: w, ofs: p };
							if (wordidx) p.pos = wordpos(p.ofs);
							node.pos.push(p);
						}
					} else ok = node.rex.test(text);
					if (node.not) ok = !ok;
					node.match = ok;
					return ok;
				},
				    get_matches = function get_matches(node) {
					if (node.bool && node.match) node.subs.forEach(function (n) {
						get_matches(n);
					});else if (node.pos) node.pos.forEach(function (p) {
						matches.push(p);
					});
					return matches;
				},
				    ok;
				if (wordidx) {
					//NEAR spotted, need to calc wordidx
					var n = 0,
					    w = 0,
					    l = txt.length,
					    wchar = /^[\-0-9A-Za-z\u00C0-\u017F]+$/;
					while (n < l) {
						if (wchar.test(txt[n])) {
							wordidx[n] = w++;
							while (++n < l && wchar.test(txt[n])) {}
						} else while (++n < l && !wchar.test(txt[n])) {}
					}
				}
				reset_node(this.tree);
				ok = node_match(this.tree, this.opts.unaccent ? unaccent(txt) : txt);
				if (this.opts.debug) console.log("[QT:matcher]\n" + this.dump());
				if (ok && matches) {
					var dup = {};
					return get_matches(this.tree).filter(function (m) {
						var ok = !dup[m.ofs];
						dup[m.ofs] = true;
						return ok;
					});
				}
				return ok;
			},
			highlightml: function highlightml(node, bef, aft) {
				if (!this.tree) return node;
				if (!this.opts.matches) return false;
				var htm = node.innerHTML,
				    txt = "",
				    k = 0,
				    p = false;
				//mask html tags
				while (k < htm.length) {
					if (!p) p = htm[k] == '<';
					if (p) {
						p = htm[k] != '>';
						txt += ' ';
					} else txt += htm[k];
					k++;
				}
				//matches
				node.innerHTML = lighton(this.match(txt), htm, bef, aft);
				return node;
			},
			highlight: function highlight(txt, bef, aft, ishtml) {
				if ((typeof txt === 'undefined' ? 'undefined' : (0, _typeof3.default)(txt)) == 'object') return this.highlightml(txt, bef, aft);else if (ishtml) {
					var d = document.createElement('div');
					d.innerHTML = txt;
					return this.highlightml(d, bef, aft).innerHTML;
				} else {
					if (!this.tree) return txt;
					if (!this.opts.matches) return false;
					return lighton(this.match(txt), txt, bef, aft);
				}
			}
		};
		if (o) {
			if (typeof o == 'string') qt.parse(o);else if ((typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) == 'object') {
				//merge options
				for (var k in qt.opts) {
					if (o[k] !== undefined) qt.opts[k] = o[k];
				}if (o.query) qt.parse(o.query);
			}
		}
		return qt;
	};

	exports.default = querytext;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(108);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(111);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(51);
	module.exports = __webpack_require__(110).f('iterator');

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(48);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(113);
	__webpack_require__(6);
	__webpack_require__(123);
	__webpack_require__(124);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(14)
	  , has            = __webpack_require__(29)
	  , DESCRIPTORS    = __webpack_require__(23)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(28)
	  , META           = __webpack_require__(114).KEY
	  , $fails         = __webpack_require__(24)
	  , shared         = __webpack_require__(43)
	  , setToStringTag = __webpack_require__(47)
	  , uid            = __webpack_require__(44)
	  , wks            = __webpack_require__(48)
	  , wksExt         = __webpack_require__(110)
	  , wksDefine      = __webpack_require__(115)
	  , keyOf          = __webpack_require__(116)
	  , enumKeys       = __webpack_require__(117)
	  , isArray        = __webpack_require__(119)
	  , anObject       = __webpack_require__(20)
	  , toIObject      = __webpack_require__(36)
	  , toPrimitive    = __webpack_require__(26)
	  , createDesc     = __webpack_require__(27)
	  , _create        = __webpack_require__(32)
	  , gOPNExt        = __webpack_require__(120)
	  , $GOPD          = __webpack_require__(122)
	  , $DP            = __webpack_require__(19)
	  , $keys          = __webpack_require__(34)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(121).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(94).f  = $propertyIsEnumerable;
	  __webpack_require__(118).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(12)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(44)('meta')
	  , isObject = __webpack_require__(21)
	  , has      = __webpack_require__(29)
	  , setDesc  = __webpack_require__(19).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(24)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(14)
	  , core           = __webpack_require__(15)
	  , LIBRARY        = __webpack_require__(12)
	  , wksExt         = __webpack_require__(110)
	  , defineProperty = __webpack_require__(19).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(34)
	  , toIObject = __webpack_require__(36);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(34)
	  , gOPS    = __webpack_require__(118)
	  , pIE     = __webpack_require__(94);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 118 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(38);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(36)
	  , gOPN      = __webpack_require__(121).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(35)
	  , hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(94)
	  , createDesc     = __webpack_require__(27)
	  , toIObject      = __webpack_require__(36)
	  , toPrimitive    = __webpack_require__(26)
	  , has            = __webpack_require__(29)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115)('asyncIterator');

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115)('observable');

/***/ }
/******/ ]);

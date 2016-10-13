#!/usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

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

var _nopt = require('nopt');

var _nopt2 = _interopRequireDefault(_nopt);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ = require('.');

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

          locales = (0, _.localesFromCSV)(csvText, queries);
          lang = 'en';


          if (parsed.lang != null) {
            lang = parsed.lang;
          }

          if (parsed.format === 'apple') {
            console.log((0, _.localeToAppleStrings)(locales[lang], locales.en));
          } else if (parsed.format === 'android') {
            console.log((0, _.localeToAndroidFormat)(locales[lang]));
          } else if (parsed.format === 'apple-r-objc') {
            console.log((0, _.localeToAppleRObjC)(locales[lang], locales.en));
          } else if (parsed.format === 'apple-dict') {
            console.log((0, _.localeToAppleStringsDict)(locales[lang], locales.en));
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localeToAppleStringsDict = exports.localeToAppleRObjC = exports.localeToAppleStrings = exports.localeToAndroidFormat = exports.localesFromCSV = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _sync = require('csv-parse/lib/sync');

var _sync2 = _interopRequireDefault(_sync);

var _xml = require('xml');

var _xml2 = _interopRequireDefault(_xml);

var _querytext = require('./querytext');

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
"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var csv = "tags,key,comment,en,ru\ncustomer,key1,,value1,\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u04351\n,,,,\napp1,key2,comment,value2,\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u04352\napp2,key3,comment,value3,\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u04353\n";

test("detect locales", function () {
  var locales = (0, _.localesFromCSV)(csv, "customer");
  var en = locales['en'];
  expect(en).not.toBeNull();
  var ru = locales['ru'];
  expect(ru).not.toBeNull();
});

test("filtering", function () {
  var en = (0, _.localesFromCSV)(csv, "customer")['en'];
  expect((0, _keys2.default)(en.strings)).toEqual(['key1']);

  en = (0, _.localesFromCSV)(csv, "customer app1")['en'];
  expect((0, _keys2.default)(en.strings)).toEqual(['key1', 'key2']);

  en = (0, _.localesFromCSV)(csv, "!customer")['en'];
  expect((0, _keys2.default)(en.strings)).toEqual(['key2', 'key3']);
});

test("multiple filtering", function () {
  var en = (0, _.localesFromCSV)(csv, "customer,app1")['en'];
  expect((0, _keys2.default)(en.strings)).toEqual(['key1', 'key2']);
});

test("localeToAndroidFormat", function () {
  var en = (0, _.localesFromCSV)(csv, "customer app2")['en'];
  expect((0, _.localeToAndroidFormat)(en)).toMatchSnapshot();
});

test("localeToAppleStrings", function () {
  var en = (0, _.localesFromCSV)(csv, "customer app2")['en'];
  expect((0, _.localeToAppleStrings)(en, en)).toMatchSnapshot();
});

test("localeToAppleRObjC", function () {
  var en = (0, _.localesFromCSV)(csv, "customer app2")['en'];
  expect((0, _.localeToAppleRObjC)(en, en)).toMatchSnapshot();
});

test("localeToAppleStringsDict", function () {
  var en = (0, _.localesFromCSV)(csv, "customer app2")['en'];
  expect((0, _.localeToAppleStringsDict)(en, en)).toMatchSnapshot();
});
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

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
"use strict";

var _querytext = require("./querytext");

var _querytext2 = _interopRequireDefault(_querytext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matchQuery(src, query) {
  var params = {
    query: query,
    wholeword: true,
    matches: false
  };

  return (0, _querytext2.default)(params).match(src);
}

test("basic", function () {
  expect(matchQuery("a b c", "a")).toBe(true);
  expect(matchQuery("a b c", "!d")).toBe(true);
  expect(matchQuery("a b c", "a+b")).toBe(true);
});

test("real world", function () {
  expect(matchQuery("customer app1", "customer")).toBe(true);
  expect(matchQuery("customer app1", "customer+app1")).toBe(true);
  expect(matchQuery("customer app1", "customer+app1!iosonly")).toBe(true);

  expect(matchQuery("customer app1 app2", "customer+app1!iosonly")).toBe(true);

  expect(matchQuery("customer app1 iosonly", "customer+app1!iosonly")).toBe(false);
  expect(matchQuery("customer app1 iosonly", "customer+app1!iosonly")).toBe(false);

  expect(matchQuery("partner", "partner")).toBe(true);
  expect(matchQuery("partner plist iosonly", "partner+plist!iosonly")).toBe(false);
  expect(matchQuery("partner plist iosonly", "partner+plist")).toBe(true);
  expect(matchQuery("partner plist iosonly", "partner!plist")).toBe(false);
});

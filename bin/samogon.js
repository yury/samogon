#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// We are expecting stding with csv format:
//
// HEADER: key, comments, en, ru, etc
// app_name, "just an app name", AppName, приложение

// key modifcators:
//   - android-only
//   - ios-only
//   - zero
//   - two
//   - few
//   - many
//   - other
//   - formatted - formatted="true" for android
//   - number - for arrays
// example:
// app_extension_name.ios-only
// items_count.zero
// items_count.two
// items_names.0

let readStdin = (() => {
  var _ref3 = _asyncToGenerator(function* () {
    let result = [];
    let stdin = process.stdin;
    stdin.setEncoding('utf8'); // why not? just in case

    let end = new Promise(function (resolve, reject) {
      stdin.on('data', function (data) {
        return result.push(data);
      });
      stdin.on('end', function () {
        return resolve(result.join(''));
      });
      stdin.on('error', reject);
    });

    stdin.resume();

    return yield end;
  });

  return function readStdin() {
    return _ref3.apply(this, arguments);
  };
})();

var _sync = require('csv-parse/lib/sync');

var _sync2 = _interopRequireDefault(_sync);

var _xml = require('xml');

var _xml2 = _interopRequireDefault(_xml);

var _nopt = require('nopt');

var _nopt2 = _interopRequireDefault(_nopt);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const PLURALS = ['zero', 'one', 'two', 'few', 'many', 'other'];

class Locale {

  constructor(id) {
    this.id = id;
    this.strings = {};
    this.arrays = {};
    this.plurals = {};
  }
}

function getLocaleId(key) {
  return key.toLowerCase();
}

function checkFormatAndGetLocales(row) {
  let map = {};
  let keyFound = false;
  let commentFound = false;
  let localeFound = false;

  for (let key of Object.keys(row)) {
    switch (key) {
      case 'key':
        keyFound = true;
        break;
      case 'comment':
        commentFound = true;
        break;
      default:
        localeFound = true;
        let localeId = getLocaleId(String(key));
        map[localeId] = new Locale(localeId);
        break;
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
  for (let _ref of Object.entries(row)) {
    var _ref2 = _slicedToArray(_ref, 2);

    let col = _ref2[0];
    let raw = _ref2[1];

    let localeId = getLocaleId(col);
    let locale = locales[localeId];
    if (locale == null) {
      continue;
    }

    if (raw == null) {
      continue;
    }

    let value = "";
    if (typeof raw == "string") {
      value = raw;
    } else {
      value = String(raw);
    }

    if (value.length === 0) {
      continue;
    }

    callback(locale, value);
  }
}

function parseRow(locales, row) {
  let keyWithAttributes = "";
  if (row.key != null) {
    keyWithAttributes = row.key.toLowerCase();
  }

  let comment = null;
  if (row.comment != null && row.comment.length > 0) {
    comment = row.comment;
  }
  const keyParts = keyWithAttributes.split(/\./);
  const key = keyParts.shift();

  let meta = {
    iosOnly: keyParts.indexOf('ios-only') >= 0,
    androidOnly: keyParts.indexOf('android-only') >= 0,
    formatted: keyParts.indexOf('formatted') >= 0,
    comment
  };

  let index = keyParts[0];
  let arrayIndex = parseInt(index);

  if (isNaN(arrayIndex)) {
    let pluralIndex = PLURALS.indexOf(index);
    if (pluralIndex >= 0) {
      let qty = PLURALS[pluralIndex];
      enumerateLocaleValuesInRow(locales, row, (locale, value) => {
        let res = locale.plurals[key];

        if (res == null) {
          res = { meta, key, zero: null, one: null, two: null, few: null, many: null, other: null };
        }
        res[qty] = value;
        locale.plurals[key] = res;
      });
    } else {
      enumerateLocaleValuesInRow(locales, row, (locale, value) => {
        locale.strings[key] = { meta: meta, key, value: value };
      });
    }
  } else {
    enumerateLocaleValuesInRow(locales, row, (locale, value) => {
      let res = locale.arrays[key];

      if (res == null) {
        res = { meta, key, values: [] };
      }
      res.values[arrayIndex] = value;
      locale.arrays[key] = res;
    });
  }
}

function localeToAndroidFormat(locale) {
  let resources = [];
  let keys = Object.keys(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];
    if (value.meta.iosOnly) {
      continue;
    }
    let str = { string: [{ _attr: { name: key } }, value.value] };
    if (value.formatted) {
      str[0]._attr.formatted = true;
    }
    resources.push(str);
  }

  keys = Object.keys(locale.arrays);
  keys.sort();
  for (let key of keys) {
    let value = locale.arrays[key];
    if (value.meta.iosOnly) {
      continue;
    }
    let arr = { 'string-array': [{ _attr: { name: key } }].concat(value.values.map(v => {
        return { item: [v] };
      })) };
    resources.push(arr);
  }

  keys = Object.keys(locale.plurals);
  keys.sort();
  for (let key of keys) {
    let value = locale.plurals[key];
    if (value.meta.iosOnly) {
      continue;
    }
    let plural = { plurals: [] };

    plural.plurals.push({ _attr: { name: key } });

    for (let qty of PLURALS) {
      if (value[qty] != null) {
        plural.plurals.push({ item: [{ _attr: { quantity: qty } }, value[qty]] });
      };
    }

    resources.push(plural);
  }

  return (0, _xml2.default)([{ resources: resources }], { declaration: true, indent: '    ' });
}

function snakeToCamel(s) {
  return s.replace(/(\_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}

function localeToIOSStrings(locale) {
  let resources = [];
  let keys = Object.keys(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];
    if (value.meta.androidOnly) {
      continue;
    }
    if (value.meta.comment != null) {
      resources.push(`/* ${ value.meta.comment } */`);
    }
    let str = JSON.stringify(snakeToCamel(key)) + " = " + JSON.stringify(value.value) + ";";
    resources.push(str);
  }

  return resources.join("\n");
}

_asyncToGenerator(function* () {

  try {

    let knownOpts = {
      format: ["android", "apple"],
      lang: String,
      csv: _path2.default
    };

    let shortHands = {};

    let parsed = (0, _nopt2.default)(knownOpts, shortHands, process.argv, 2);

    var csvText = "";

    if (parsed.csv != null) {
      csvText = _fs2.default.readFileSync(parsed.csv, { encoding: 'utf8' });
    } else {
      csvText = yield readStdin();
    }

    var csv = (0, _sync2.default)(csvText, { columns: true });

    var locales = checkFormatAndGetLocales(csv[0]);

    for (let row of csv) {
      parseRow(locales, row);
    }

    let lang = "en";

    if (parsed.lang == null) {
      lang = parsed.lang;
    }

    if (parsed.format === "apple") {
      console.log(localeToIOSStrings(locales[lang]));
    } else {
      console.log(localeToAndroidFormat(locales[lang]));
    }
  } catch (e) {
    console.error(e);
  }
})();

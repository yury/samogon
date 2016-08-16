#!/usr/bin/env node
'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

let readStdin = (() => {
  var _ref3 = (0, _asyncToGenerator3.default)(function* () {
    let result = [];
    let stdin = process.stdin;
    stdin.setEncoding('utf8'); // why not? just in case

    let end = new _promise2.default(function (resolve, reject) {
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

const PLURALS = ['zero', 'one', 'two', 'few', 'many', 'other'];

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

  for (let key of (0, _keys2.default)(row)) {
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
  for (let _ref of (0, _entries2.default)(row)) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

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
  let keys = (0, _keys2.default)(locale.strings);
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

  keys = (0, _keys2.default)(locale.arrays);
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

  keys = (0, _keys2.default)(locale.plurals);
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
  let keys = (0, _keys2.default)(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];
    if (value.meta.androidOnly) {
      continue;
    }
    if (value.meta.comment != null) {
      resources.push(`/* ${ value.meta.comment } */`);
    }
    let str = (0, _stringify2.default)(snakeToCamel(key)) + " = " + (0, _stringify2.default)(value.value) + ";";
    resources.push(str);
  }

  return resources.join("\n");
}

(0, _asyncToGenerator3.default)(function* () {

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

    if (parsed.lang != null) {
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

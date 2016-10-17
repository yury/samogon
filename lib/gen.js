// @flow

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
//   - unformatted - formatted="false" for android
//   - number - for arrays
// example:
// items_count.zero
// items_count.two
// items_names.0

import parseCSV from 'csv-parse/lib/sync';
import querytext from './querytext';
import xml from 'xml';

type ResourceMeta = {
  formatted: ?boolean;  // Android flag (unsupported in iOS format)
  comment: ?string;     // comment for resource.
  enKey: boolean;       // use english variant as a key
  integer: boolean;
}

type StringResource = {
  key: string;
  value: string;
  meta: ResourceMeta;
}

const PLURALS: string[] = ['zero', 'one', 'two', 'few', 'many', 'other'];

type PluralResource = {
  key: string;
  meta: ResourceMeta;
  zero: ?string;
  one: ?string;
  two: ?string;
  few: ?string;
  many: ?string;
  other: ?string;
  formatter: string;
  value: string;
}

type ArrayResource = {
  key: string;
  meta: ResourceMeta;
  values: string[];
}

class Locale {
  id: string;
  strings: {[key: string]: StringResource };
  arrays:  {[key: string]: ArrayResource };
  plurals: {[key: string]: PluralResource };

  constructor(id) {
    this.id = id;
    this.strings = {};
    this.arrays = {};
    this.plurals = {};
  }
}

type LocalesMap = {[key: string]: Locale};

function getLocaleId(key: string): string {
  return key.toLowerCase();
}

function checkFormatAndGetLocales(row): LocalesMap {
  let map: LocalesMap = {};
  let keyFound = false;
  let commentFound = false;
  let localeFound = false;
  let tagsFound = false;

  for (let key:string of Object.keys(row)) {
    switch(key) {
      case 'key':
        keyFound = true;
      case 'comment':
        commentFound = true;
        break;
      case 'tags':
        tagsFound = true;
        break;
      default:
        localeFound = true;
        let localeId = getLocaleId(String(key));
        map[localeId] = new Locale(localeId);
        break;
    }
  }

  if (!keyFound) {
    throw new Error("csv MUST contain `key` column")
  }

  if (!commentFound) {
    throw new Error("csv MUST contain `comment` column")
  }

  if (!tagsFound) {
    throw new Error("csv MUST contain `tags` column")
  }

  if (!localeFound) {
    throw new Error("csv MUST contain at least one locale column. (`en`, `ru`)");
  }

  return map;
}

function enumerateLocaleValuesInRow(locales: LocalesMap, row, callback: (locale: Locale, value: string) => void) {
  for (let [col: string, raw: mixed] of Object.entries(row)) {
    let localeId = getLocaleId(col);
    let locale = locales[localeId];
    if (locale == null) {
      continue;
    }

    if (raw == null) {
      continue;
    }

    let value: string = '';
    if (typeof raw == 'string') {
      value = raw;
    } else {
      value = String(raw);
    }

    if (value.length === 0) {
      continue;
    }

    callback(locale, value)
  }
}

function formatter(keyParts: string[]): string {
  for (var part of keyParts) {
    if (part[0] == '%') {
      return part;
    }
  }

  return '%d';
}

function parseRow(locales: LocalesMap, row, queries: any[] = []) {
  let keyWithAttributes = '';
  if (row.key != null) {
    keyWithAttributes = row.key.toLowerCase();
  }

  if (keyWithAttributes === '') {
    return;
  }

  let tags = '';
  if (row.tags != null) {
    tags = row.tags.toLowerCase().replace(/,/, ' ');
  }

  var matched = false;
  for (var q of queries) {
    if (q.match(tags) === true) {
      matched = true;
      break;
    }
  }

  if (!matched) {
    return;
  }

  let comment: ?string = null;
  if (row.comment != null && row.comment.length > 0) {
    comment = row.comment;
  }
  const keyParts = keyWithAttributes.split(/\./);
  const key = keyParts.shift();

  let meta: ResourceMeta = {
    enKey:       keyParts.indexOf('en-key') >= 0,
    formatted:   null,
    integer:     keyParts.indexOf('int') >= 0 || keyParts.indexOf('integer') >= 0,
    comment
  }

  if (keyParts.indexOf('formatted') >= 0) {
    meta.formatted = true
  } else if (keyParts.indexOf('unformatted') >= 0) {
    meta.formatted = false
  }
  let index: string = keyParts[0];
  let arrayIndex: number = parseInt(index);

  if (isNaN(arrayIndex)) {
    let pluralIndex = PLURALS.indexOf(index);
    if (pluralIndex >= 0 ) {
      let qty = PLURALS[pluralIndex];
      let frmt = formatter(keyParts);
      enumerateLocaleValuesInRow(locales, row, (locale, value) => {
        let res = locale.plurals[key];

        if (res == null) {
          res = {
            meta,
            key,
            zero: null,
            one: null,
            two: null,
            few: null,
            many: null,
            other: null,
            formatter: frmt,
            value: key + " " + frmt
          }
        }
        res[qty] = value
        locale.plurals[key] = res
      });
    } else {
      enumerateLocaleValuesInRow(locales, row, (locale, value) => {
        locale.strings[key] = { meta: meta, key, value: value }
      });
    }
  } else {
    enumerateLocaleValuesInRow(locales, row, (locale, value) => {
      let res = locale.arrays[key];

      if (res == null) {
        res = { meta, key, values: [] }
      }
      res.values[arrayIndex] = value
      locale.arrays[key] = res
    });
  }
}


function localeToAndroidFormat(locale: Locale): string {
  let resources = [];
  let keys = Object.keys(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];

    let attrs: Object = { name: key }

    if (value.meta.formatted != null) {
      attrs.formatted = value.meta.formatted;
    }

    let str = {string: [ {_attr: attrs }, value.value]};

    resources.push(str);
  }

  keys = Object.keys(locale.arrays);
  keys.sort();
  for (let key of keys) {
    let value = locale.arrays[key];
    let type = value.meta.integer ? 'integer-array' : 'string-array';
    let arr = {[type]: [ {_attr: {name: key} } ].concat(value.values.map((v) => { return {item: [v] }} ))};
    resources.push(arr);
  }

  keys = Object.keys(locale.plurals);
  keys.sort();
  for (let key of keys) {
    let value = locale.plurals[key];
    let plural = { plurals: [] };

    plural.plurals.push({ _attr: {name: key} })

    for (let qty of PLURALS) {
      if (value[qty] != null) {
        plural.plurals.push({item: [ {_attr: {quantity: qty } }, value[qty] ]})
      };
    }

    resources.push(plural);
  }

  return xml([{resources: resources}], {declaration: true, indent: '    '});
}

function snakeToCamel(s){
    return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
}

function localeToAppleStrings(locale: Locale, enLocale: Locale): string {
  let resources = [];
  let keys = Object.keys(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];
    if (value.meta.comment != null) {
      resources.push(`/* ${value.meta.comment} */`);
    }
    let s = value.value.replace(/%s/g, '%@');
    let str = JSON.stringify(snakeToCamel(key)) + " = " + JSON.stringify(s) + ";";
    if (value.meta.enKey) {
      str = JSON.stringify(enLocale.strings[key].value) + " = " + JSON.stringify(s) + ";";
    }
    resources.push(str);
  }

  keys = Object.keys(locale.plurals);
  keys.sort();
  for (let key of keys) {
    let value = locale.plurals[key];
    if (value.meta.comment != null) {
      resources.push(`/* ${value.meta.comment} */`);
    }
    let str = JSON.stringify(snakeToCamel(key)) + " = " + JSON.stringify(value.value) + ";";

    resources.push(str);
  }

  return resources.join("\n");
}

function localeToAppleStringsDict(locale: Locale, enLocale: Locale): string {
  let resources = [];
  let keys = Object.keys(locale.plurals);
  keys.sort();
  let dict = [];
  let plist = [{_attr: { version: "1.0" }}, {dict: dict} ];
  for (let key of keys) {
    let value = locale.plurals[key];

    dict.push({key: snakeToCamel(key)})
    let plural = [];
    dict.push({dict: plural});
    plural.push({key: 'NSStringLocalizedFormatKey'});
    plural.push({string: '%#@value@'});
    plural.push({key: 'value'});
    let plurals = [
      {key: 'NSStringFormatSpecTypeKey'}, {string: 'NSStringPluralRuleType'},
      {key: 'NSStringFormatValueTypeKey'}, {string: value.formatter.replace(/%/, '')},
    ];
    plural.push({dict: plurals})

    for (let qty of PLURALS) {
      if (value[qty] != null) {
        plurals.push({key: qty})
        let s = value[qty].replace(/%[sfdg]/g, value.formatter);
        plurals.push({string: s})
      };
    }

    resources.push(plural);
  }
  return xml([{plist: plist}], {declaration: true, indent: '    '});
}

function swiftFuncArgs(value): string[] {
  let matches = value.value.match(/%[d|s|f]/g) || []
  return matches.map((v) => {
    if (v === "%s") {
      return "String"
    } else if (v === "%d") {
      return "Int"
    } else if (v === "%f") {
      return "Float"
    } else {
      return "AnyObject"
    }
  })
}

function swiftFunc(value): string {
  let resName = snakeToCamel(value.key);
  let args = swiftFuncArgs(value);

  let swiftSignature = args.map((v, i) => `v${i}: ${v}`).join(', ')
  let swiftCall = args.map((v, i) => `v${i}`).join(', ')

  if (value.formatter != null) {
    return `
  public static func ${resName}(${swiftSignature}) -> String {
      return String.localizedStringWithFormat(NSLocalizedString("${resName}", comment: "${value.key}"), ${swiftCall})
  }`
  }

  return `
  public static func ${resName}(${swiftSignature}) -> String {
      return R.string.localizable.${resName}(${swiftCall})
  }`
}

function localeToAppleRObjC(locale: Locale): string {
  let resources = [];
  let keys = Object.keys(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];
    if (value.meta.enKey) {
      continue;
    }
    if (value.meta.comment != null) {
      resources.push(`/* ${value.meta.comment} */`);
    }
    resources.push(swiftFunc(value));
  }

  keys = Object.keys(locale.plurals);
  keys.sort();
  for (let key of keys) {
    let value = locale.plurals[key];
    if (value.meta.enKey) {
      continue;
    }
    if (value.meta.comment != null && value.meta.comment.length > 0) {
      resources.push(`/* ${value.meta.comment} */`);
    }
    resources.push(swiftFunc(value));
  }

  return `
// RS.swift

import Foundation

public class RS: NSObject {
  ${resources.join('\n')}
}
`;
}

function localesFromCSV(csvText: string, queries: string = '') : LocalesMap {
  var csv = parseCSV(csvText, {columns: true})

  var locales = checkFormatAndGetLocales(csv[0])

  var matchers = textMatches(queries)

  for (let row of csv) {
    parseRow(locales, row, matchers);
  }
  return locales;
}

function textMatches(queries: string): any[] {
  var parts = queries.split(/,/);
  var res = [];
  for (var part of parts) {
    let params = {
      query: part,
      wholeword: true,
      matches: false
    }
    res.push(querytext(params));
  }
  return res;
}

export {
  localesFromCSV,
  localeToAndroidFormat,
  localeToAppleStrings,
  localeToAppleRObjC,
  localeToAppleStringsDict,
}


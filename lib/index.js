// @flow

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

import parseCSV from 'csv-parse/lib/sync';
import xml from 'xml';
import nopt from 'nopt';
import path from 'path';
import fs from 'fs';

type ResourceMeta = {
  iosOnly: boolean; // will only exports in iOS format
  androidOnly: boolean; // will only exports in Android format
  formatted: ?boolean; // Android flag (unsupported in iOS format)
  comment: ?string; // comment for resource.
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

  for (let key:string of Object.keys(row)) {
    switch(key) {
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
    throw new Error("csv MUST contain `key` column")
  }

  if (!commentFound) {
    throw new Error("csv MUST contain `comment` column")
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

    let value: string = "";
    if (typeof raw == "string") {
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

function parseRow(locales: LocalesMap, row) {
  let keyWithAttributes: string = "";
  if (row.key != null) {
    keyWithAttributes = row.key.toLowerCase();
  }

  let comment: ?string = null;
  if (row.comment != null && row.comment.length > 0) {
    comment = row.comment;
  }
  const keyParts = keyWithAttributes.split(/\./);
  const key = keyParts.shift();

  let meta: ResourceMeta = {
    iosOnly:     keyParts.indexOf('ios-only') >= 0,
    androidOnly: keyParts.indexOf('android-only') >= 0,
    formatted:   keyParts.indexOf('formatted') >= 0,
    comment
  }

  let index: string = keyParts[0];
  let arrayIndex: number = parseInt(index);

  if (isNaN(arrayIndex)) {
    let pluralIndex = PLURALS.indexOf(index);
    if (pluralIndex >= 0 ) {
      let qty = PLURALS[pluralIndex];
      enumerateLocaleValuesInRow(locales, row, (locale, value) => {
        let res = locale.plurals[key];

        if (res == null) {
          res = { meta, key, zero: null, one: null, two: null, few: null, many: null, other: null }
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

async function readStdin(): Promise<string> {
  let result = [];
  let stdin = process.stdin;
  stdin.setEncoding('utf8'); // why not? just in case

  let end = new Promise((resolve, reject) => {
    stdin.on('data', (data) => result.push(data));
    stdin.on('end', () => resolve(result.join('')));
    stdin.on('error', reject);
  });

  stdin.resume();

  return await end;
}

function localeToAndroidFormat(locale: Locale): string {
  let resources = [];
  let keys = Object.keys(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];
    if (value.meta.iosOnly) {
      continue;
    }
    let str = {string: [ {_attr: {name: key} }, value.value]};
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
    let arr = {'string-array': [ {_attr: {name: key} } ].concat(value.values.map((v) => { return {item: [v] }} ))};
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

function localeToIOSStrings(locale: Locale): string {
  let resources = [];
  let keys = Object.keys(locale.strings);
  keys.sort();
  for (let key of keys) {
    let value = locale.strings[key];
    if (value.meta.androidOnly) {
      continue;
    }
    if (value.meta.comment != null) {
      resources.push(`/* ${value.meta.comment} */`);
    }
    let str = JSON.stringify(snakeToCamel(key)) + " = " + JSON.stringify(value.value) + ";";
    resources.push(str);
  }

  return resources.join("\n");
}



(async function() {

  try {

    let knownOpts = {
      format: ["android", "apple"],
      lang: String,
      csv: path,
    };

    let shortHands = {
    };

    let parsed = nopt(knownOpts, shortHands, process.argv, 2);

    var csvText = "";

    if (parsed.csv != null) {
      csvText = fs.readFileSync(parsed.csv, {encoding: 'utf8'});
    } else {
      csvText = await readStdin();
    }

    var csv = parseCSV(csvText, {columns: true})

    var locales = checkFormatAndGetLocales(csv[0])

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
  } catch(e) {
    console.error(e);
  }

})();


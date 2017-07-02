// @flow

import nopt from 'nopt';
import path from 'path';
import fs from 'fs';
import {
  localesFromCSV,
  localeToAndroidFormat,
  localeToAppleStrings,
  localeToAppleRObjC,
  localeToAppleStringsDict,
} from './gen';

async function readStdin(): Promise<string> {
  let result = [];
  let stdin = process.stdin;
  stdin.setEncoding('utf8'); // why not? just in case

  let end = new Promise((resolve, reject) => {
    stdin.on('data', data => result.push(data));
    stdin.on('end', () => resolve(result.join('')));
    stdin.on('error', reject);
  });

  stdin.resume();

  return await end;
}

(async function() {
  try {
    let knownOpts = {
      format: ['android', 'apple', 'apple-r-objc', 'apple-dict'],
      lang: String,
      csv: path,
      queries: String,
    };

    let shortHands = {
      f: '--format',
      l: '--lang',
      q: '--queries',
    };

    let parsed = nopt(knownOpts, shortHands, process.argv, 2);

    var csvText = '';

    if (parsed.csv != null) {
      csvText = fs.readFileSync(parsed.csv, { encoding: 'utf8' });
    } else {
      csvText = await readStdin();
    }

    var queries = '';
    if (parsed.queries != null) {
      queries = parsed.queries;
    }

    let locales = localesFromCSV(csvText, queries);

    let lang = 'en';

    if (parsed.lang != null) {
      lang = parsed.lang;
    }

    if (parsed.format === 'apple') {
      console.log(localeToAppleStrings(locales[lang], locales.en));
    } else if (parsed.format === 'android') {
      console.log(localeToAndroidFormat(locales[lang]));
    } else if (parsed.format === 'apple-r-objc') {
      console.log(localeToAppleRObjC(locales[lang]));
    } else if (parsed.format === 'apple-dict') {
      console.log(localeToAppleStringsDict(locales[lang], locales.en));
    }
  } catch (e) {
    console.error(e);
  }
})();

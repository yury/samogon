//@flow

import {
  localesFromCSV,
  localeToAndroidFormat,
  localeToAppleStrings,
  localeToAppleRObjC,
  localeToAppleStringsDict,
} from './gen';

const csv = `\
tags,key,comment,en,ru
customer,key1,,value1,значение1
,,,,
app1,key2,comment,value2,значение2
app2,key3,comment,value3,значение3
app3,key4.en-key,comment,value3,значение3
`;

test('detect locales', () => {
  let locales = localesFromCSV(csv, 'customer');
  let en = locales['en'];
  expect(en).not.toBeNull();
  let ru = locales['ru'];
  expect(ru).not.toBeNull();
});

test('filtering', () => {
  let en = localesFromCSV(csv, 'customer')['en'];
  expect(Object.keys(en.strings)).toEqual(['key1']);

  en = localesFromCSV(csv, 'customer app1')['en'];
  expect(Object.keys(en.strings)).toEqual(['key1', 'key2']);

  en = localesFromCSV(csv, '!customer')['en'];
  expect(Object.keys(en.strings)).toEqual(['key2', 'key3', 'key4']);
});

test('en-key', () => {
  let en = localesFromCSV(csv, 'app3')['en'];
  let objc = localeToAppleRObjC(en, en);
  expect(objc).not.toMatch(/key4/);
});

test('multiple filtering', () => {
  let en = localesFromCSV(csv, 'customer,app1')['en'];
  expect(Object.keys(en.strings)).toEqual(['key1', 'key2']);
});

test('localeToAndroidFormat', () => {
  let en = localesFromCSV(csv, 'customer app2')['en'];
  expect(localeToAndroidFormat(en)).toMatchSnapshot();
});

test('localeToAppleStrings', () => {
  let en = localesFromCSV(csv, 'customer app2')['en'];
  expect(localeToAppleStrings(en, en)).toMatchSnapshot();
});

test('localeToAppleRObjC', () => {
  let en = localesFromCSV(csv, 'customer app2')['en'];
  expect(localeToAppleRObjC(en, en)).toMatchSnapshot();
});

test('localeToAppleStringsDict', () => {
  let en = localesFromCSV(csv, 'customer app2')['en'];
  expect(localeToAppleStringsDict(en, en)).toMatchSnapshot();
});

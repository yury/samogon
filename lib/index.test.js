import { spawnSync } from 'child_process';
import {
  localesFromCSV,
  localeToAndroidFormat,
  localeToAppleStrings,
  localeToAppleRObjC,
  localeToAppleStringsDict,
} from '.';

test("test 1", () => {
  let res = spawnSync('curl', ['--help']).stdout.toString()
  console.log(res);
});


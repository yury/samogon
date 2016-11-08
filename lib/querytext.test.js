//@flow

import querytext from './querytext';

function matchQuery(src, query) {
  let params = {
    query: query,
    wholeword: true,
    matches: false
  }

  return querytext(params).match(src)
}

test("basic", () => {
  expect(matchQuery("a b c", "a")).toBe(true);
  expect(matchQuery("a b c", "!d")).toBe(true);
  expect(matchQuery("a b c", "a+b")).toBe(true);
});

test("real world", () => {
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


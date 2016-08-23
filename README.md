# Samogon is localization tool

The Samogon is localization tool which allows to generate iOS and Android strings resources from base csv file.

## Getting starged

### Installation

```
$ npm install -g samogon
```

### Preparing resources

First of all, you need download [template.xls](https://raw.githubusercontent.com/alexustinovsm/samogon/master/sources/template.xls). This document contains 2 main columns `key` and `comment`.

The `key` column is alias which will be used for getting access to string.

For instance,

```
/* [comment] */
"[key]"="Some text"


<!-- [comment] -->
<string name="[key]">Some text</string>
```

After, you need add columns they will be equal localization locale.

For instance,

```
key, comment, en, ru
```

#### Sample of small document

```
key, comment, en, ru
app_name, , My app, Моё приложение
```

### Ready, stady go

If you use local file

```
$ samogon --src part/to/src.csv --lang [name of locale] --platform [android,ios] > to/resource/file
```

If you use [Google Spreadsheets]("https://www.google.ru/intl/en/sheets/about/"). **Pay attention, document should be shared by link only for viewing**.

```
curl "https://docs.google.com/spreadsheets/d/someHashCodeHere/export?gid=0&format=csv" | samogon --lang [name of locale] --platform [android,ios] > to/resource/file
```

## Roadmap

- [ ] Added support comment in Android platform
- [ ] Generate all localization in project

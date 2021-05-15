# Log Sanitizer

Log sanitization tool PoC app

## Usage - Unattended
Interactive is not coded yet. To see options for unattended, run as:
```sh
node . -h
```

Current mode flags are:
- `-r, --read_only`: read only mode (does not modify logs)')
- `-d, --debug`: output extra debugging')
- `-f, --file <logfile>`: log file path')
- `-t, --type <logtypetype>`: log type (-T to list all types)')

Run on sample data:
```sh
node . -f test/fixtures/nginx-accesslogs.txt  -t nginx
```

## Development

Prequisites:
- Node.js

To run the project:
```sh
git clone git@github.com:yasinaydinnet/log-sanitizer-poc.git
cd log-sanitizer-poc
npm install
npm run build
```

To watch changes:
```sh
npm run watch
```

### Automated Tests

To run tests:
```sh
npm test
```

To run code coverage:
```sh
npm run coverage
```
which should create an output like:
```
$ npm run coverage
> logsanitizer@1.0.0 coverage
> jest --coverage
 PASS  src/lib/fields.test.ts
 PASS  src/drivers/logagent.test.ts
---------------------|---------|----------|---------|---------|-------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files            |     100 |      100 |     100 |     100 |                   
 config              |     100 |      100 |     100 |     100 |                   
  compositeFields.ts |     100 |      100 |     100 |     100 |                   
  fieldTypes.ts      |     100 |      100 |     100 |     100 |                   
 drivers             |     100 |      100 |     100 |     100 |                   
  logagent.ts        |     100 |      100 |     100 |     100 |                   
 lib                 |     100 |      100 |     100 |     100 |                   
  fields.ts          |     100 |      100 |     100 |     100 |                   
---------------------|---------|----------|---------|---------|-------------------
Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.969 s, estimated 3 s
Ran all test suites.
```

## Sensitivity Levels
- Personal secret (passwords)
- Personal unique ID (ID code, email)
- PII (zip code, name, surname etc)
- 0: public

## Future Work

Packaging:
- OS packages like for Arch Linux
- npx-style one line runs
- compiling/packaging into one file (executable?)
- specify engine and npm version
- publish as npm package

Interface:
- Interactive CLI
- Store past scan results and configs (parameters) in a DB (like SQLite)
- Allow providing config parameters via config file

Documentation
- Add sample screenshots

Code/development:
- Provide Docker and asdf

Engine:
- Detect nginx log location(s) automatically if no --file is provided
- Use heuristics to detect fields and values for missing drivers and plaintext files
- Merge log type and source type (eg: nginx+file)
- Speed up by using custom drivers (not logagent), merging regexs, caching some variables
- Add translations for regex matches/terms for field names (ie passwort)

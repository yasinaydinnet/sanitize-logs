# sanitize-logs

Unattended log sanitization tool PoC app

## Usage

Requirements: [npm](nodejs.org/en/download)

Run via `npx`:
```sh
npx sanitize-logs --type nginx --file nginx-log-file
```

Or install and run via `npm global`:
```sh
npm i -g sanitize-logs
sanitize-logs --type nginx --file nginx-log-file
```

### Sample Data
To run using sample data, type:
```sh
npx sanitize-logs --testrun --debug
```
which should produce an output like below:
```
$ sanitize-logs --testrun --debug
logsanitizer@1.0.18
[debug] Debug mode enabled
[debug] Started in unattended mode
[info]  Source file is: .../sanitize-logs/test/fixtures/nginx-accesslogs.txt
[debug] Source type is: file
[debug] Checking log type... nginx
[debug] Detecting driver... logAgent
[debug] Checking file permissions... OK
[debug] Reading file contents... OK
[debug] Analyzing log file and determining fields... OK

Scan is done.
Lines scanned: 30
Sensitive values found: 7

Unique sensitive values for each field is below:

Field name  Sensitive Data Type  Field Sensitivity   Sensitive Value
----------  -------------------  ------------------  ---------------
path        Password             3: Secret           MyPassw0rd     
referer     Password             3: Secret           MyPassw0rd     
client_ip   IP Address           2: Unique Personal  1.2.3.4        
```

## Development

Prequisites:
- Node.js >= 16.0.0

To install the project:
```sh
git clone git@github.com:yasinaydinnet/sanitize-logs.git
cd sanitize-logs
npm install
npm run build
```

To watch changes:
```sh
npm run watch
```

### Automated Tests

To run tests, type:
```sh
npm test
```

To run code coverage, type:
```sh
npm run coverage
```
which should create an output like:
```
$ npm run coverage
> sanitize-logs@1.0.0 coverage
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

- 3: Personal secret (passwords)
- 2: Personally unique ID (ID code, email)
- 1: PII (zip code, name, surname etc)
- 0: public

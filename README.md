# Log Sanitizer

Log sanitization tool PoC app

## Usage - Unattended
Interactive is not coded yet. To see options for unattended, run as:
```sh
node . -h
```

Run on sample data:
```sh
node . -f test/fixtures/nginx-accesslogs.txt  -t nginx
```

## Development

Step 0: Prequisites:
- Node.js
- Yarn

To run the project:
```sh
git clone git@github.com:yasinaydinnet/log-sanitizer-poc.git
cd log-sanitizer-poc
yarn install
yarn run tsc
```

To watch changes:
```sh
yarn run tsc --watch
```

To run tests:
```sh
yarn test
```


## Features & Supported Formats

Provided by `@sematext/logagent`:
- web & cloud: httpd, access_log, apache2, nginx, heroku, cloudfoundry
- db: mongo, redis, mysql, sqlio, cassandra, couchdb, postgres
- indexing & analysis: elasticsearch, solr, hdfs, hbase, clickhouse
- streams: flink, kafka, rabbitmq
- config: zookeeper, traefik
- containers: containerd, dockerd, hyperkube, tutum, swarm
- apps: nodebb, nexus, frontend apps, npm/yarn
- logging & monitoring: sematext/logagent, syslog

## Sensitivity Levels
- Personal secret (passwords)
- Personal unique ID (ID code, email)
- PII (zip code, name, surname etc)
- 0: public

## Courses Used
- speait
- log ve monitoring
- linux admin, nginx etc
- databases
- genel programlama dersleri

## Future Work

Packaging:
- OS packages like for Arch Linux
- npx-style one line runs
- compiling/packaging into one file (executable?)
- specify engine and npm version
- publish as npm package

Interface:
- Interactive CLI
- Add dry run mode
- Store past scan results and configs (parameters) in a DB (like SQLite)
- Allow providing config parameters via config file

Documentation
- add sample screenshots

Code/development:
- Typescript: more types and untyped stuff (eg logagent driver)
- (unit) Test coverage: 100%
- Provide Docker and asdf

Other projects:
- How others did?

Engine:
- Detect nginx log location(s) automatically if no --file is provided
- Use heuristics to detect fields and values for missing drivers and plaintext files

## Alternatives
For accessing logs:
- alpine
- @robojones/nginx-log-parser

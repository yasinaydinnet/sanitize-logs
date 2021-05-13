# Log Sanitizer

About: tbd

## Usage
Running in interactive mode:
```sh
node .
```

Running unattended:
```sh
node . -f FILENAME
```

## Development

Step 0: Prequisites:
- Node.js

Step 1:
clone project

step 2:
yarn install

step 3:
```sh
#oncce
yarn run tsc
#compile watch:
yarn run tsc --watch
```

step 4: run app
```sh
node .
```


## Features & Supported Formats
by `@sematext/logagent`:

sematext\/agent|containerd|dockerd/
clickhouse/
hyperkube/
elasticsearch/
solr/i
kafka/
hdfs/
hbase/
yarn/
zookeeper|zk/
assandra
mongo/
redis/i
nexus/
nodebb/i
mysql/ 
sqio\/nsq
httpd|access_log|apache2|nginx|sematext\/frontend-app/
flink/
flink/
traefik/
tutum\/cleanup/
rabbitmq/
postgres/
couchdb/
syslog_framed|heroku/ 
cloudfoundry.*|syslog_raw/ 
swarm/ # catch all .log files  
\.log/ # catch all .log files  
logagent/



## Future
- Packaging
  - OS packages like for Arch Linux
  - npx-style one line runs
  - compiling/packaging into one file (executable?)
- NPM packages
  - get rid of old packages
  - specify engine and npm version
- Interactive CLI
- Parameters
  - Add description before option
  - Dry run mode
  - Detect nginx log location(s) automatically if no --file is provided
- How others did?
- Delete levels:
  - Personal secret (passwords)
  - Personal unique ID (ID code, email)
  - PII (zip code, name, surname etc)
- Typescript
  - more types and untyped stuff (eg logagent driver)
- (unit) Test coverage: 100%
- different log levels

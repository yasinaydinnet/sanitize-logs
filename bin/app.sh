node -e "console.log('logsanitizer@'+require('./package.json').version);"
node ./dist/app.js $@

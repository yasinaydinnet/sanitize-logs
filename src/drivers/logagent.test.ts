const Logagent = require('@sematext/logagent');

// For more tests see:
//  https://github.com/sematext/logagent-js/blob/master/test/test.js

test('adds 1 + 2 to equal 3', done => {
  const nginxline = '1.1.1.13 - - [04/May/2021:09:15:28 +0300] "GET /login HTTP/1.1" 200 8851 "https://test.local" Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.0; Trident/3.1)"';

  const logAgent = new Logagent();

  logAgent.parseLine(
    nginxline,
    'nginx',
    (error, response) => {
      // console.log({response})
      expect(response.logSource).toBe('nginx');
      done()
    }
  );
});

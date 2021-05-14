// For more tests see:
//  https://github.com/sematext/logagent-js/blob/master/test/test.js

import { parseLine } from "./logagent";

test('checks if driver works', async () => {
  const nginxline = '1.1.1.13 - - [04/May/2021:09:15:28 +0300] "GET /login HTTP/1.1" 200 8851 "https://test.local" Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.0; Trident/3.1)"';

  const response: any = await parseLine(nginxline, "nginx");

  expect(response.logSource).toBe('nginx');
});

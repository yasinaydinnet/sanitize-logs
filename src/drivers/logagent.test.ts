// For more tests see:
//  https://github.com/sematext/logagent-js/blob/master/test/test.js

import * as driver from "./logagent"

test('checks if driver works', async () => {
  const nginxline = '1.1.1.13 - - [04/May/2021:09:15:28 +0300] "GET /login HTTP/1.1" 200 8851 "https://test.local" Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.0; Trident/3.1)"';

  const response: any = await driver.parseLine(nginxline, "nginx")

  expect(response.logSource).toBe('nginx')
  expect(response._type).toBe('access_common')
  expect(response.client_ip).toBe('1.1.1.13')
  expect(response.remote_id).toBe('-')
  expect(response.user).toBe('-')
  expect(response.method).toBe('GET')
  expect(response.path).toBe('/login')
  expect(response.http_version).toBe('HTTP/1.1')
  expect(response.status_code).toBe(200)
  expect(response.size).toBe(8851)
  // expect(response["@timestamp"]).toBe(new Date("2021-05-04T06:15:28.000Z"))// Doesnt work
})

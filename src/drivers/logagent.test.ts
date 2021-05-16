// For more tests see:
//  https://github.com/sematext/logagent-js/blob/master/test/test.js

import * as driver from "./logagent"
import { fieldTypes } from "../config/fieldTypes"

const nginxline = '1.1.1.13 remoteUser httpUser [04/May/2021:09:15:28 +0300] "GET /login?pass=Password1&timestamp=1620861634 HTTP/1.1" 200 8851 "https://test.local" Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.0; Trident/3.1)"';

test('parseLine - error', async done => {
  expect.assertions(1)

  try {
    await driver.parseLine(nginxline, "wrongtype")
  } catch (e) {
    expect(e).toEqual("not found")
  } finally {
    done()
  }
})

test('parseLine', async done => {
  const response: any = await driver.parseLine(nginxline, "nginx")

  expect(response.logSource).toBe('nginx')
  expect(response._type).toBe('access_common')
  expect(response.client_ip).toBe('1.1.1.13')
  expect(response.remote_id).toBe('remoteUser')
  expect(response.user).toBe('httpUser')
  expect(response.method).toBe('GET')
  expect(response.path).toBe('/login?pass=Password1&timestamp=1620861634')
  expect(response.http_version).toBe('HTTP/1.1')
  expect(response.status_code).toBe(200)
  expect(response.size).toBe(8851)
  // expect(response["@timestamp"]).toBe(new Date("2021-05-04T06:15:28.000Z"))// Doesnt work

  done()
})

test('detectSensitiveFields-error', async () => {
  expect(driver.detectSensitiveFields({invalid_field: "someValue"})).toStrictEqual({})
})

test('detectSensitiveFields', async () => {
  const response: any = await driver.parseLine(nginxline, "nginx")

  expect(driver.detectSensitiveFields(response)).toStrictEqual({
    client_ip: [
      {
        key: "client_ip",
        parentKey: null,
        value: "1.1.1.13",
        field: fieldTypes.ip_address
      },
    ],
    remote_id: [
      {
        key: "remote_id",
        parentKey: null,
        value: "remoteUser",
        field: fieldTypes.username
      },
    ],
    user: [
      {
        key: "user",
        parentKey: null,
        value: "httpUser",
        field: fieldTypes.username
      },
    ],
    path: [
      {
        key: "pass",
        parentKey: "path",
        value: "Password1",
        field: fieldTypes.password
      }
    ]
  })
})

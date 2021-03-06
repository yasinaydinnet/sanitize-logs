import { findFieldTypesFromStrings, isSafeValue } from "../lib/fields"
import { fieldTypes } from "../config/fieldTypes"
import { compositeFields } from "../config/compositeFields"
const Logagent = require('@sematext/logagent')

const logAgent = new Logagent()

export const name: string = "logAgent"

export async function parseLine(line: string, source: string) {
  return new Promise((resolve, reject) => {
    logAgent.parseLine(line, source, (error: Error, response: Object) => {
      if (error) return reject(error)

      return resolve(response)
    })
  })
}

/* All possible fields coming from logagent:nginx:
logSource: 'nginx',
_type: 'access_common',
client_ip: '1.1.1.13',
remote_id: '-',
user: '-',
method: 'GET',
path: '/test.html?first_name=John&last_name=Doe&password=MyPassw0rd',
protocol: 'HTTP/1.1',
status_code: 200,
size: 8851,
'@timestamp': 2021-05-04T06:15:28.000Z
referer: 'http://localhost/test.html'
user_agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',
message: 'GET /test.html?first_name=John&last_name=Doe&password=MyPassw0rd'
*/

const fields = {
  client_ip: fieldTypes.ip_address,
  user: fieldTypes.username,
  remote_id: fieldTypes.username,
}

const composites = {
  path: compositeFields.url_path,
  referer: compositeFields.url_path,
  // message: generated by logagent and doesnt exist in nginx log
}

function buildSensitiveFields (fields, values, result, parentKey:string|null=null) {
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const value = values[fieldName]

    if (field && !isSafeValue(field,value)) {
      result[parentKey||fieldName] ||= []
      result[parentKey||fieldName].push({key:fieldName,value,field,parentKey})
    }
  }
}

export function detectSensitiveFields(values: Object) {
  let result = {}

  buildSensitiveFields(fields, values, result)

  for (const fieldName in composites) {
    const compositeField = composites[fieldName]
    const compositeValues = compositeField.parse(values[fieldName]);
    const compositeFields = findFieldTypesFromStrings(Object.keys(compositeValues))

    buildSensitiveFields(compositeFields, compositeValues, result, fieldName)
  }

  return result
}

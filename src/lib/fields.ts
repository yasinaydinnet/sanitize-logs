/**
  Note: Any field that is not defined here is public (no action needed)

  Sensitivity levels:
  0-public: no change is necessary.
  1-pii: ie name, surname, city
  2-directly identifying: ie email, ID code, IP address
  3-secret: ie passwords

  TODO: Add more fields incl name, city
  TODO: Define possible actions for each type (ie delete, fullmask, partialmask for IP, postal code)
*/

export const compositeFields: CompositeFields = {
  url_path(path: string) {
    const queryParams: URLSearchParams = new URL(path, "http://localhost").searchParams

    const result: CompositeField = {}

    queryParams.forEach((val: any, key: string) => {
      const fieldTypeByString = findFieldTypeByString(key)

      if (fieldTypeByString) result[key] = fieldTypeByString
    })

    return result
  },
}

export function findFieldTypeByString(fieldName: string): FieldType|null {
  if (fieldTypes[fieldName]) return fieldTypes[fieldName]

  let result: FieldType|null = null

  for (const fieldTypeName in fieldTypes) {
    const fieldType: FieldType = fieldTypes[fieldTypeName]

    if (!fieldType.match_values?.length) continue

    if(fieldType.match_values.includes(fieldName)) {
      result = fieldType
      break
    }
  }

  return result
}

export const fieldTypes: FieldTypes = {
  user_agent: {
    sensitivity: 1,
  },
  city: {
    sensitivity: 1,
  },
  ip_address: {
    sensitivity: 2,
    match_values: ["ip", "ipaddr", "ipaddress", "ip_addr"],
    safe_values_regex: [
      // ipv6
      /fe80:(:[0-9a-f]{0,4}){0,4}%[0-9a-z]{1,}/i,
      // ipv4
      "0.0.0.0",
      "255.255.255.255",
      /(^127\.)/,
      /(^10\.)/,
      /(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)/,
      /(^192\.168\.)/,
    ],
  },
  username: {
    sensitivity: 2,
    match_values: ["user", "user_name"],
    safe_values_regex: ["admin", "root", "user"],
  },
  password: {
    sensitivity: 3,
    match_values: ["pass"],
  },
}

export function isValueSafe(fieldType: string, value: string|null): boolean {
  if (!value) return true
  if (value == "-") return true

  const safeValues: FieldSafeValues|undefined = fieldTypes[fieldType].safe_values_regex
  if (!safeValues) return false

  let isSafe: boolean = false
  for (const safeValue of safeValues) {
    if (value.match(safeValue)) {
      isSafe = true
      break
    }
  }

  return isSafe
}

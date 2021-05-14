import { findFieldTypeByString, isValueSafe, compositeFields, fieldTypes } from "./fields"

test("isValueSafe", () => {
  expect(isValueSafe("any_field", null)).toBe(true)
  expect(isValueSafe("any_field", "")).toBe(true)
  expect(isValueSafe("any_field", "-")).toBe(true)

  expect(isValueSafe("username", "admin")).toBe(true)
  expect(isValueSafe("username", "root")).toBe(true)
  expect(isValueSafe("username", "john")).toBe(false)

  expect(isValueSafe("password", "Pass123")).toBe(false)

  expect(isValueSafe("ip_address", "fe80:0000:0000:0000:771b:314b:4413:77e1")).toBe(true)
  expect(isValueSafe("ip_address", "FE80:0000:0000:0000:f282:2abc:3e54:22E4")).toBe(true)
  expect(isValueSafe("ip_address", "0.0.0.0")).toBe(true)
  expect(isValueSafe("ip_address", "255.255.255.255")).toBe(true)
  expect(isValueSafe("ip_address", "127.0.0.1")).toBe(true)
  expect(isValueSafe("ip_address", "192.168.0.1")).toBe(true)
  expect(isValueSafe("ip_address", "1.2.3.4")).toBe(false)
})

test("findFieldTypeByString", () => {
  expect(findFieldTypeByString("password")).toBe(fieldTypes.password)
  expect(findFieldTypeByString("pass")).toBe(fieldTypes.password)
})

test("compositeFields", () => {
  expect(compositeFields.url_path("/aaa?b=c&password=e")).toStrictEqual({
    password: fieldTypes.password
  })
})

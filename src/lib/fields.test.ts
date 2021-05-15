import { findFieldTypesFromStrings, findFieldTypeByString, isSafeValue } from "./fields"
import { fieldTypes } from "../config/fieldTypes"
import { compositeFields } from "../config/compositeFields"

test("isSafeValue", () => {
  expect(isSafeValue(fieldTypes.username, null)).toBe(true)
  expect(isSafeValue(fieldTypes.username, "-")).toBe(true)
  expect(isSafeValue(fieldTypes.username, "admin")).toBe(true)
  expect(isSafeValue(fieldTypes.username, "root")).toBe(true)
  expect(isSafeValue(fieldTypes.username, "john")).toBe(false)

  expect(isSafeValue(fieldTypes.password, "")).toBe(true)
  expect(isSafeValue(fieldTypes.password, "Pass123")).toBe(false)

  expect(isSafeValue(fieldTypes.ip_address, "fe80::314b:4413:77e1")).toBe(true)
  expect(isSafeValue(fieldTypes.ip_address, "FE80:0000:0000:0000:f282:2abc:3e54:22E4")).toBe(true)
  expect(isSafeValue(fieldTypes.ip_address, "0.0.0.0")).toBe(true)
  expect(isSafeValue(fieldTypes.ip_address, "255.255.255.255")).toBe(true)
  expect(isSafeValue(fieldTypes.ip_address, "127.0.0.1")).toBe(true)
  expect(isSafeValue(fieldTypes.ip_address, "192.168.0.1")).toBe(true)
  expect(isSafeValue(fieldTypes.ip_address, "1.2.3.4")).toBe(false)
})

test("findFieldTypeByString", () => {
  expect(findFieldTypeByString("password")).toBe(fieldTypes.password)
  expect(findFieldTypeByString("pass")).toBe(fieldTypes.password)
})

test("findFieldTypesFromStrings", () => {
  expect(findFieldTypesFromStrings(["pass"])).toStrictEqual({
    pass: fieldTypes.password
  })
})

test("compositeFields", () => {
  const values = compositeFields.url_path.parse("/action?user=johndoe&password=Pass123")
  expect(values).toStrictEqual({
    user: "johndoe",
    password: "Pass123",
  })

  const fields = findFieldTypesFromStrings(Object.keys(values))
  expect(fields).toStrictEqual({
    user: fieldTypes.username,
    password: fieldTypes.password,
  })
})

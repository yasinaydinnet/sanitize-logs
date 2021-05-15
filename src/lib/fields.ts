import { fieldTypes } from "../config/fieldTypes"

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

export function isSafeValue(fieldType: FieldType, value: string|null): boolean {
  if (!value) return true
  if (value == "-") return true

  const safeValues: FieldSafeValues|undefined = fieldType.safe_values_regex
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

export function findFieldTypesFromStrings(keys: Array<string>) {
  const result = {}

  keys.forEach(key => {
    const fieldType = findFieldTypeByString(key)
    if (fieldType) result[key] = fieldType
  })

  return result
}

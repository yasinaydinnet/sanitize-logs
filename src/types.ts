interface Driver {
  name: string,
  parseLine: Function,
  sensitiveFields: SensitiveFields,
  detectSensitiveFields: Function
}

interface CompositeField {
  [key: string]: FieldType
}

interface CompositeFields {
  [key: string]: {
    parse: Function
  }
}

type FieldSafeValues = Array<string|RegExp>

interface FieldType {
  label: String,
  sensitivity: Number,
  safe_values_regex?: FieldSafeValues,
  match_values?: Array<string>
}

interface FieldTypes {
  [key: string]: FieldType
}

type LogLevel = "error" | "debug" | "info"

interface SensitiveFields {
  [key: string]: FieldType|Function
}

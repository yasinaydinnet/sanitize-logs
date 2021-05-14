interface Driver {
  name: string,
  parseLine: Function,
  getPossibleFields: Function
}

type FieldSafeValues = Array<string|RegExp>

interface FieldType {
  sensitivity: Number,
  safe_values_regex?: FieldSafeValues,
  match_values?: Array<string>
}

interface FieldTypes {
  [key: string]: FieldType
}

interface CompositeField {
  [key: string]: FieldType
}

interface CompositeFields {
  [key: string]: Function
}

type LogLevel = "error" | "debug" | "log"

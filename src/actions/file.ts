import { log, logAppend } from "../lib/log"
import { checkFilePermissions, readFileContents } from "../lib/file"
import { detectDriverByFiletype } from "../drivers/index"
import { appArguments } from "../lib/args"
require('console.table');

function checkLogTypes () {
  log("debug", "Checking log type...", true)

  if (!appArguments.type) {
    throw new Error("Please specify logtype with -t")
  }

  if (appArguments.type !== "nginx") {
    throw new Error(`Log type is not supported: ${appArguments.type}`)
  }

  logAppend("debug", appArguments.type)
}

export default async (): Promise<void> => {
  checkLogTypes()

  const driver: Driver = detectDriverByFiletype(appArguments.type)

  await checkFilePermissions(appArguments.file)

  const fileContents = await readFileContents(appArguments.file)

  log("debug", "Analyzing log file and determining fields...", true)
  const lines = fileContents.split(/\r?\n/)

  let result: object = {}
  let lineCounter = 0
  let dataCounter = 0
  for await (const line of lines) {
    if (!line) continue
    lineCounter++

    const parsedLine = await driver.parseLine(line, "nginx")

    const sensitiveFields: object = driver.detectSensitiveFields(parsedLine)
    for (const [key, value] of Object.entries(sensitiveFields)) {
      dataCounter++
      result[key] ||= []
      result[key] = [...result[key], ...value]
    }
  }

  const sensitivities = {
    3:"3: Secret",
    2:"2: Unique Personal",
    1:"1: PII",
  }

  logAppend("debug", "OK")

  console.log("\nScan is done.\n"+
    `Lines scanned: ${lineCounter}\n`+
    `Sensitive values found: ${dataCounter}\n`+
    `\nUnique sensitive values for each field is below:\n`);

  const resultsTable: any = []
  for (const [fieldName, fieldInfo] of Object.entries(result)) {
    const field: any = fieldInfo[0].field
    resultsTable.push({
      "Field name": fieldInfo[0].parentKey ? fieldInfo[0].parentKey : fieldName,
      "Sensitive Data Type": field.label,
      "Field Sensitivity": sensitivities[field.sensitivity],
      "Sensitive Value": fieldInfo[0].value,
    })
  }
  console.table(resultsTable)

  if (appArguments.read_only) {
    log("log", "App started with read only flag, not doing any changes")
    return
  }
}

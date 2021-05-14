import { log, logAppend } from "../lib/log"
import { checkFilePermissions, readFileContents } from "../lib/file"
import { detectDriverByFiletype } from "../drivers/index"
import { appArguments } from "../lib/args"

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

  log("debug", "Analyzing log file and determining fields...")
  const lines = fileContents.split(/\r?\n/)

  for await (const line of lines) {
    if (!line) continue

    const parsedLine = await driver.parseLine(line, "nginx")

    console.log({line})
    console.log({parsedLine})
  }
}

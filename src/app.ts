import { appArguments, hasAppArguments } from "./lib/args"
import { log, logAppend } from "./lib/log"
import FileAction from "./actions/file"

const PACKAGE_VERSION = require('../package.json').version;

const main = async () => {
  console.log(`logsanitizer@${PACKAGE_VERSION}`)

  log("debug", "Debug mode enabled")

  try {
    if (!hasAppArguments) {
      throw new Error("Interactive mode is unavailable.\nPlease run with '-h' to see usage")
    }
    log("debug", "Started in unattended mode")

    if (appArguments.testrun) {
      appArguments.file = "test/fixtures/nginx-accesslogs.txt"
      appArguments.type = "nginx"
    }

    if (appArguments.file) {
      await FileAction()
    } else {
      throw new Error("No mode is selected")
    }

    process.exit(0)
  } catch (error) {
    log("error", error.message)
    process.exit(1)
  }
}

main()

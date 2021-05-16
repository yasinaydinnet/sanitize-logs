import { appArguments, hasAppArguments } from "./lib/args"
import { log } from "./lib/log"
import FileAction from "./actions/file"
import { resolve } from "path"

const PACKAGE_VERSION = require('../package.json').version;
const TEST_FILE = resolve(__dirname, "../test/fixtures/nginx-accesslogs.txt")

const main = async () => {
  console.log(`logsanitizer@${PACKAGE_VERSION}`)

  log("debug", "Debug mode enabled")

  try {
    if (!hasAppArguments) {
      throw new Error("Interactive mode is unavailable.\nPlease run with '-h' to see usage")
    }
    log("debug", "Started in unattended mode")

    if (appArguments.testrun) {
      appArguments.file = TEST_FILE
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

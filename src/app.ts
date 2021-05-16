import { appArguments, hasAppArguments } from "./lib/args"
import { log } from "./lib/log"

import FileAction from "./actions/file"

const main = async () => {
  try {
    log("debug", "Debug mode enabled")

    if (!hasAppArguments) {
      throw new Error("Interactive mode is unavailable.\nPlease run with '-h' to see usage")
    }

    log("debug", "Started in unattended mode")

    if (appArguments.file) {
      log("debug", "Source type is: file")

      await FileAction()
    } else {
      log("error", "No mode is selected")
    }

    process.exit(0)
  } catch (error) {
    log("error", error.message)
    process.exit(1)
  }
}

main()

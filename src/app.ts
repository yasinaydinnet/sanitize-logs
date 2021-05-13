import { appArguments, hasAppArguments} from "./lib/args";
import { exitAppWithErrorMessage, errorMessages} from "./lib/error";
import { log } from "./lib/log";

import FileAction from "./actions/file";

const main = async () => {
  if (!hasAppArguments) {
    exitAppWithErrorMessage(errorMessages.args.interactive_disabled)
  }

  log("debug", "Started in unattended mode");

  if (appArguments.file) {
    log("debug", "Source type is: file")
    await FileAction()
  }

  // log("debug", "Done. Exiting application")
  console.log("")
  process.exit(0)
}

main();

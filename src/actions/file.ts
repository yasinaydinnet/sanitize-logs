import { log, logAppend } from "../lib/log";
import { checkFilePermissions } from "../lib/file";
import { exitAppWithError, exitAppWithErrorMessage, errorMessages} from "../lib/error";
import { detectDriverByFiletype } from "../drivers/index";
import { appArguments } from "../lib/args";

export default async () => {
  log("debug", "Checking file permissions...", true)
  try {
    await checkFilePermissions(appArguments.file);
  } catch (error) {
    exitAppWithError(error)
  }
  logAppend("debug", "OK");


  log("debug", "Checking log type...", true)
  // TODO check against valid types
  if (!appArguments.type) {
    exitAppWithErrorMessage(errorMessages.file.type_missing)
  }
  logAppend("debug", appArguments.type);


  let driver;
  log("debug", "Detecting driver...", true)
  try {
    driver = detectDriverByFiletype(appArguments.type)
  } catch (error) {
    exitAppWithError(error)
  }
  logAppend("debug", driver.name)


  log("debug", "Reading log and determining fields...", true)
  try {
    // driver.
    // aa

  } catch (error) {
    exitAppWithError(error)
  }
}

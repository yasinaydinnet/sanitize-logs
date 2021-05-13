import { log } from "./log";

export const errorMessages = {
  args: {
    interactive_disabled: "Interactive mode is not developed yet.\nPlease run the application with '-h' or '--help' parameter to see its usage.\n"
  },
  file: {
    not_readable: "File is not readable: %s",
    not_writeable: "File is not writeable: %s",
    type_missing: "Please specify type of logfile with type parameter (see -h for all options)"
  }
}

export function errorWithArgs (message: string, ...args) {
  let i = 0;
  return message.replace(/%s/g, () => args[i++]);
}

export function exitAppWithError (error: Error) {
  log("error", error.message);
  process.exit(1);
}

export function exitAppWithErrorMessage (errorMessage: string) {
  return exitAppWithError(new Error(errorMessage))
}

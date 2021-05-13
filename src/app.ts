import { appArguments, hasAppArguments } from "./lib/parse_args";

if (!hasAppArguments) {
  console.log("Interactive mode is not developed yet.")
  console.log("Please run the application with '-h' or '--help' parameter to see its usage.\n")
  process.exit(0)
}


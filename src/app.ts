import getOptions from "./lib/options";

const options = getOptions();

if (Object.keys(options).length === 0) {
  console.log("Interactive mode is not developed yet.")
  console.log("Please run the application with '-h' or '--help' parameter to see its usage.\n")
  process.exit(0)
}

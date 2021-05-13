import { appArguments } from "../lib/args";

type LogLevel = "error" | "debug"

export function logAppend(logLevel: LogLevel, message: string) {
  if (logLevel == "debug" && !appArguments.debug) return;
  
  console[logLevel](` ${message}`)
}

export function log(logLevel: LogLevel, message: string, appendable: boolean = false) {
  if (logLevel == "debug" && !appArguments.debug) return;

  const output = `[${logLevel}] ${message}`
  
  if (appendable) process.stdout.write(output)
  else console[logLevel](output)
}

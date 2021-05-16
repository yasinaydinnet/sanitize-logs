import { appArguments } from "../lib/args"


export function logAppend(logLevel: LogLevel, message: string) {
  if (logLevel == "debug" && !appArguments.debug) return
  
  console[logLevel](` ${message}`)
}

export function log(logLevel: LogLevel, message: string, appendable: boolean = false) {
  if (logLevel == "debug" && !appArguments.debug) return

  let prefix = `[${logLevel}]`.padEnd(7,' ')
  if (logLevel == "error") prefix = "\n" + prefix

  const output = `${prefix} ${message}`

  if (appendable) process.stdout.write(output)
  else console[logLevel](output)
}

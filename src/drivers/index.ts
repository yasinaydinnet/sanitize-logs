import { log, logAppend } from "../lib/log"
const logAgent = require("./logagent")

export function detectDriverByFiletype(fileType: string): Driver {
  log("debug", "Detecting driver...", true)

  let driver: Driver

  if (fileType === "nginx") driver = logAgent
  else {
    throw new Error("Log type not found: ${fileType}")
  }

  logAppend("debug", driver.name)
  return driver
}

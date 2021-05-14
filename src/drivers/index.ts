import { log, logAppend } from "../lib/log";
const logAgent = require("./logagent")

export function detectDriverByFiletype(fileType: string) {
  log("debug", "Detecting driver...", true)

  let driver;

  if (fileType === "nginx") driver = logAgent;

  if (!driver) {
    throw new Error("Log type not found: ${fileType}")
  }

  logAppend("debug", driver.name)
  return driver;
}

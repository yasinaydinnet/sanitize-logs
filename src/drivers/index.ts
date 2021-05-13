const logAgent = require("./logagent")

export function detectDriverByFiletype(fileType: string) {
  let driver;

  if (fileType === "nginx") driver = logAgent;

  if (!driver) {
    throw new Error("Log type not found: ${fileType}")
  }

  return driver;
}

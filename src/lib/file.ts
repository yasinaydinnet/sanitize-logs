import { resolve } from 'path'
import { access, readFile } from 'fs/promises'
import { constants } from 'fs'
import { log, logAppend } from "./log"

export async function checkFilePermissions (filePath: string) {
  log("debug", "Checking file permissions...", true)

  const fileAbsolutePath: string = resolve(filePath)

  try {
    await access(fileAbsolutePath, constants.R_OK)
  } catch (error) {
    throw new Error(`File is not readable: ${filePath}`)
  }

  try {
    await access(fileAbsolutePath, constants.W_OK)
  } catch (error) {
    throw new Error(`File is not writeable: ${filePath}`)
  }

  logAppend("debug", "OK")
}

export async function readFileContents (filePath: string) {
  log("debug", "Reading file contents...", true)

  const fileAbsolutePath: string = resolve(filePath)

  const contents = readFile(fileAbsolutePath, { encoding: "utf-8" })

  logAppend("debug", "OK");
  return contents;
}

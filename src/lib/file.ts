import { resolve } from 'path'
import { access, readFile } from 'fs/promises'
import { constants } from 'fs'
import { log, logAppend } from "./log"

export function getFilePath (filePath: string): string {
  return resolve(filePath)
}

export async function checkFilePermissions (filePath: string) {
  log("debug", "Checking file permissions...", true)

  const fileAbsolutePath: string = getFilePath(filePath)

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
  const fileAbsolutePath: string = getFilePath(filePath)

  return readFile(fileAbsolutePath, { encoding: "utf-8" })
}

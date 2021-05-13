import { resolve } from 'path';
import { access } from 'fs/promises';
import { constants } from 'fs';
import { errorMessages, errorWithArgs } from "./error";

export function getFilePath (filePath: string): string {
  return resolve(filePath);
}

export async function checkFilePermissions (filePath: string) {
  const fileAbsolutePath: string = getFilePath(filePath);

  try {
    await access(fileAbsolutePath, constants.R_OK);
  } catch (error) {
    throw new Error(errorWithArgs(errorMessages.file.not_readable, fileAbsolutePath))
  }

  try {
    return await access(fileAbsolutePath, constants.W_OK);
  } catch (error) {
    throw new Error(errorWithArgs(errorMessages.file.not_writeable, fileAbsolutePath))
  }
}

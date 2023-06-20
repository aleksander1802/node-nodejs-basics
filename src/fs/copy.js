import fs from 'fs/promises';
import { resolve } from 'path';

const copy = async () => {
  const pathToDir = resolve('src/fs/files');
  const pathToCopyDir = resolve('src/fs/files_copy');
  const errorMessage = 'FS operation failed';

  try {
    await fs.access(pathToDir);
    try {
      await fs.access(pathToCopyDir);
      throw new Error(errorMessage);
    } catch {
      await fs.mkdir(pathToCopyDir);
    }

    let entries = await fs.readdir(pathToDir, { withFileTypes: true });

    for (let entry of entries) {
      let srcPath = resolve(`${pathToDir}/${entry.name}`);
      let destPath = resolve(`${pathToCopyDir}/${entry.name}`);

      entry.isDirectory()
        ? await copyDir(srcPath, destPath)
        : await fs.copyFile(srcPath, destPath);
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await copy();

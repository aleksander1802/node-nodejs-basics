import fs from 'fs';
import { resolve } from 'path';

const rename = async () => {
  const fileName = resolve('src/fs/files/wrongFilename.txt');
  const renameFileName = resolve('src/fs/files/properFilename.md');
  const errorMessage = 'FS operation failed';

  fs.access(renameFileName, async (err) => {
    if (err) {
      try {
        await fs.promises.rename(fileName, renameFileName);
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new Error(errorMessage);
        }
      }
    } else {
      throw new Error(errorMessage);
    }
  });
};

await rename();

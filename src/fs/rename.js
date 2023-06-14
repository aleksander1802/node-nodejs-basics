import fs from 'fs/promises';
import path from 'path';

const rename = async () => {
  const fileName = path.resolve('src/fs/files/wrongFilename.txt');
  const renameFileName = path.resolve('src/fs/files/properFilename.md');

  try {
    await fs.access(renameFileName);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.rename(fileName, renameFileName);
    } else {
      throw error;
    }
  }
};

await rename();

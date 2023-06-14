import fs from 'fs/promises';
import path from 'path';

const remove = async () => {
  const fileName = path.resolve('src/fs/files/fileToRemove.txt');

  try {
    await fs.unlink(fileName);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

await remove();

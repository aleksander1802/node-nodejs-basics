import fs from 'fs/promises';
import path from 'path';

const read = async () => {
  const pathToFile = path.resolve('src/fs/files/fileToRead.txt');

  try {
    await fs.readFile(pathToFile, 'utf-8').then((data) => console.log(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

await read();

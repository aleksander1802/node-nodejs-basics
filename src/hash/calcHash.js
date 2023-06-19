import { createHash } from 'crypto';
import { resolve } from 'path';
import fs from 'fs/promises';

const calculateHash = async () => {
  const pathToFile = resolve('src/hash/files/fileToCalculateHashFor.txt');

  try {
    const message = await fs.readFile(pathToFile, 'utf8');

    const hash = createHash('sha256').update(message).digest('hex');

    console.log(hash);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('File not found');
    }
  }
};

await calculateHash();

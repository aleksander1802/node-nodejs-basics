import { createHmac } from 'node:crypto';
import path from 'path';
import fs from 'fs/promises';

const calculateHash = async () => {
  const pathToFile = path.resolve('src/hash/files/fileToCalculateHashFor.txt');

  try {
    const secret = await fs.readFile(pathToFile, 'utf8');

    const hash = createHmac('sha256', secret).digest('hex');

    console.log(hash);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error();
    }
  }
};

await calculateHash();

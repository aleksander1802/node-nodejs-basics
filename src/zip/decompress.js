import { createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'path';

const decompress = async () => {
  const pathToDir = resolve('src/zip/files');
  const source = createReadStream(resolve(pathToDir, 'archive.gz'));
  const destination = createWriteStream(resolve(pathToDir, 'fileToCompress.txt'));
  const gunzip = createGunzip();

  try {
    source.pipe(gunzip).pipe(destination);
  } catch (error) {
    if (error) {
      console.error(`Error decompress: ${error}`);
    }
  }
};

await decompress();

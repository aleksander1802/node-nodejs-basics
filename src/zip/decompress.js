import { createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const decompress = async () => {
  const pipe = promisify(pipeline);
  const pathToDir = resolve('src/zip/files');
  const source = createReadStream(resolve(pathToDir, 'archive.gz'));
  const destination = createWriteStream(resolve(pathToDir, 'fileToCompress.txt'));
  const gunzip = createGunzip();

  try {
    pipe(source, gunzip, destination);
  } catch (error) {
    if (error) {
      console.error(`Error decompress: ${error}`);
    }
  }
};

await decompress();

import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'path';
import { promisify } from 'node:util';

const compress = async () => {
  const pipe = promisify(pipeline);
  const pathToDir = resolve('src/zip/files');
  const gzip = createGzip();
  const source = createReadStream(resolve(pathToDir, 'fileToCompress.txt'));
  const destination = createWriteStream(resolve(pathToDir, 'archive.gz'));

  try {
    await pipe(source, gzip, destination);
  } catch (error) {
    if (error) {
        console.error(`Error compress: ${error}`);
    }
  }
};

await compress();

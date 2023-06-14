import { createReadStream } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { stdout } from 'process';
import path from 'path';

async function read() {
  const pathToFile = path.resolve('src/streams/files/fileToRead.txt');
  const pipelineAsync = promisify(pipeline);
  const fileReadStream = createReadStream(pathToFile);

  try {
    await pipelineAsync(fileReadStream, stdout);
  } catch (error) {
    if (error) {
      console.error(`An error occurred: ${error}`);
    }
  }
}

await read();

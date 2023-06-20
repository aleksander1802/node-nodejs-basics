import { createWriteStream } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { stdin } from 'process';
import path from 'path';

const write = async () => {
  const pathToFile = path.resolve('src/streams/files/fileToWrite.txt');
  const pipelineAsync = promisify(pipeline);
  const fileWriteStream = createWriteStream(pathToFile);

  try {
    await pipelineAsync(stdin, fileWriteStream);
  } catch (error) {
    if (error) {
      console.error(`An error occurred: ${error}`);
    }
  }
};

await write();

import { stdout, stdin } from 'process';
import { promisify } from 'util';
import { pipeline, Transform } from 'stream';

const transform = async () => {
  const pipelinePromise = promisify(pipeline);

  try {
    await pipelinePromise(
      stdin,
      new Transform({
        transform(chunk, encoding = 'utf-8', callback) {
          const reversed = chunk.toString().split('').reverse().join('');
          callback(null, reversed + '\n');
        },
      }),
      stdout,
    );
  } catch (err) {
    console.error(`Error reversing text: ${err}`);
  }
};

await transform();

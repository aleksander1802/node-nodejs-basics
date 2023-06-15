import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { resolve } from 'path';

async function performCalculations() {
  const pathToDir = resolve('src/wt/worker.js');
  const numCores = cpus().length;
  const workerPromises = [];
  const results = [];

  for (let i = 0; i < numCores; i += 1) {
    const n = i + 10;
    workerPromises.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(pathToDir, {
          workerData: n,
        });
        worker.on('message', (result) => resolve(result));
        worker.on('error', (error) => reject(error));
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      }),
    );
  }

  for (let promise of workerPromises) {
    try {
      const result = await promise;
      results.push({ status: 'resolved', data: result });
    } catch (error) {
      console.log(`Error in worker: ${error}`);
      results.push({ status: 'error', data: null });
    }
  }

  console.log(results);
}

await performCalculations();

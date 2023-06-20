import { workerData as n, parentPort } from 'worker_threads';

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

function sendResult(result) {
  return parentPort.postMessage(result);
}

sendResult(nthFibonacci(n));

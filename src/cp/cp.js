import { spawn } from 'child_process';
import { resolve } from 'path';

const spawnChildProcess = async (args) => {
  const pathToFile = resolve('src/cp/files/script.js');

  const child = spawn('node', [pathToFile, ...args]);

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  child.stdin.write(JSON.stringify(args));
  child.stdin.end();
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);

import { fork } from 'child_process';
import { resolve } from 'path';

const spawnChildProcess = async (args) => {
  const pathToFile = resolve('src/cp/files/script.js');

  const child = fork(pathToFile, [...args], { stdio: 'inherit' });

  await new Promise((resolve) => {
    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`Child process exited with code ${code}`);
      }
      resolve();
    });
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);

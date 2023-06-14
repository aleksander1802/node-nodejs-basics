import fs from 'fs/promises';
import path from 'path';

const copy = async () => {
  const pathToDir = path.resolve('src/fs/files');
  const pathToCopyDir = path.resolve('src/fs/files_copy');

  try {
    await fs.access(pathToCopyDir);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(pathToCopyDir, { recursive: true });
      let entries = await fs.readdir(pathToDir, { withFileTypes: true });

      for (let entry of entries) {
        let srcPath = path.resolve(`${pathToDir}/${entry.name}`);
        let destPath = path.resolve(`${pathToCopyDir}/${entry.name}`);

        entry.isDirectory()
          ? await copyDir(srcPath, destPath)
          : await fs.copyFile(srcPath, destPath);
      }
    } else {
      throw error;
    }
  }
};

await copy();

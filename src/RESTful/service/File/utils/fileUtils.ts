import fs from 'fs';
import path from 'path';

const checkAllChunksReceived = (filename, totalChunks) => {
  console.debug(`Checking all chunks received for ${filename}. Total chunks expected: ${totalChunks}`);

  let chunksReceived = 0;
  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join('temp', `${filename}.part${i}`);
    if (fs.existsSync(chunkPath)) {
      chunksReceived++;
      console.debug(`Chunk ${i} for ${filename} found (${chunksReceived}/${totalChunks})`);
    } else {
      console.debug(`Chunk ${i} for ${filename} missing`);
    }
  }

  if (chunksReceived === totalChunks) {
    console.debug(`All ${totalChunks} chunks received for ${filename}`);
    return true;
  } else {
    console.debug(`Not all chunks received for ${filename} (${chunksReceived}/${totalChunks})`);
    return false;
  }
};

const destination = path.join(__dirname, '..', '..', '..', '..','..', 'public/files');

const reassembleFile = async (filename, totalChunks, finalDir) => {
  const finalFilePath = path.join(destination, filename);
  try {
    const writeStream = fs.createWriteStream(finalFilePath, { encoding: 'binary', flags: 'w' });
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(finalDir, `${filename}.part${i}`);
      const chunk = fs.readFileSync(chunkPath, 'binary');
      writeStream.write(chunk);
      fs.unlinkSync(chunkPath);
    }
    writeStream.end();
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(finalFilePath));
      writeStream.on('error', (error) => reject(error));
    });
  } catch (error) {
    throw new Error(`Error reassembling file: ${error.message}`);
  }
};

const getPublicFileUrl = (filePath) => {
  const fileName = path.basename(filePath);
  const host = process.env.HOST;
  const port = process.env.SERVER_PORT || 4000;
  return `${host}:${port}/files/${fileName}`;
};

export { checkAllChunksReceived, reassembleFile, getPublicFileUrl };

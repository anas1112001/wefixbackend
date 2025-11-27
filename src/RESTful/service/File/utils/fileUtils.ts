import fs from 'fs';
import path from 'path';
import { getDestinationPath, FileCategory, ensureDirectoryExists } from '../../../utils/filePathHelper';

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

const reassembleFile = async (filename, totalChunks, finalDir, category?: FileCategory) => {
  // Determine destination based on category, default to CONTRACT
  const fileCategory = category || FileCategory.CONTRACT;
  const destination = getDestinationPath(fileCategory);
  
  // Ensure destination directory exists
  ensureDirectoryExists(destination);
  
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

const getPublicFileUrl = (filePath, category?: FileCategory) => {
  const fileName = path.basename(filePath);
  const fileCategory = category || FileCategory.CONTRACT;
  const host = process.env.HOST;
  const port = process.env.SERVER_PORT || 4000;
  
  // Determine URL path based on category
  let urlPath = '';
  if (fileCategory === FileCategory.IMAGE) {
    urlPath = `/WeFixFiles/Images/${fileName}`;
  } else {
    urlPath = `/WeFixFiles/Contracts/${fileName}`;
  }
  
  return `${host}:${port}${urlPath}`;
};

export { checkAllChunksReceived, reassembleFile, getPublicFileUrl };

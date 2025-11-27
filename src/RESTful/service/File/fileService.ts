import fs from 'fs';
import path from 'path';

import * as fileUtils from './utils/fileUtils';

const tempDir = path.join(__dirname, '..', '..', '..', '..', 'temp');

class FileService {
    referenceToPathMap: Map<any, any>;

    constructor() {
        this.referenceToPathMap = new Map();
    }

    async processChunk(file, chunkInfo) {
        const { chunkIndex, filename, totalChunks, category } = chunkInfo;

        const desiredTempFilePath = path.join(tempDir, `${filename}.part${chunkIndex}`);

        console.debug(`Processing chunk: filename=${filename}, chunkIndex=${chunkIndex}, totalChunks=${totalChunks}`);
        console.debug(`Moving file from ${file.path} to ${desiredTempFilePath}`);

        if (fs.existsSync(file.path)) {
            fs.renameSync(file.path, desiredTempFilePath);
        } else {
            throw new Error(`File chunk not found: ${file.path}`);
        }

        // Additional check: Only proceed to check all chunks if it's the last chunk
        if (chunkIndex === totalChunks - 1) {
            if (fileUtils.checkAllChunksReceived(filename, totalChunks)) {
                try {
                    console.debug(`All chunks received for ${filename}, starting reassembly`);
                    const finalFilePath = await fileUtils.reassembleFile(filename, totalChunks, tempDir, category);
                    this.storeFileReference(filename, finalFilePath);
                    // Removed the line that deletes the reference
                } catch (error) {
                    console.error(`Error in reassembling file: ${error.message}`);
                }
            } else {
                console.debug(`Not all chunks received yet for ${filename}`);
            }
        }

        console.debug(`Chunk processing complete for ${filename}`);
        return filename;
    }

    storeFileReference(reference, filePath) {
        this.referenceToPathMap.set(reference, filePath);
        console.debug(`Storing file reference: ${reference} -> ${filePath}`);
    }

    getPathFromReference(reference) {
        console.debug(`Getting path for reference: ${reference}`);

        if (!this.referenceToPathMap.has(reference)) {
            console.error(`No file found for reference: ${reference}`);
            throw new Error(`No file found for reference: ${reference}`);
        }

        const filePath = this.referenceToPathMap.get(reference);
        console.debug(`Path from reference ${reference}: ${filePath}`);
        return filePath;
    }
}

const fileService = new FileService();
export default fileService;

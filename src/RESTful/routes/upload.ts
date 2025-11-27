import express from 'express';
import multer from 'multer';
import path from 'path';

import fileService from '../service/File/fileService';
import { getFileCategory, getDestinationPath, ensureDirectoryExists, FileCategory } from '../utils/filePathHelper';

const router = express.Router();

const storage = multer.diskStorage({
  destination (req, file, cb) {
    // Get file category from request body or determine from mimetype
    const categoryParam = req.body.category;
    const category = getFileCategory(file.mimetype, categoryParam);
    const destination = getDestinationPath(category);
    
    // Ensure directory exists
    ensureDirectoryExists(destination);
    
    cb(null, destination);
  },
  filename (req, file, cb) {
    // If you want to use the filename from the request body
    const filenameFromBody = req.body.filename;
    cb(null, filenameFromBody || file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const {filename} = req.body; // Extract filename from the request body
    const {chunkIndex} = req.body; // Extract chunkIndex from the request body
    const {totalChunks} = req.body;
    const {category} = req.body; // Extract category (image/contract)
    
    const chunkIndexNumber = parseInt(chunkIndex, 10);
    const totalChunksNumber = parseInt(totalChunks, 10) || 1;

    if (!req.file || !filename) {
      return res.status(400).send('File or filename not provided');
    }

    // Determine file category
    const fileCategory = getFileCategory(req.file.mimetype, category);

    // For single file uploads (non-chunked), return immediately
    // Multer has already saved the file to the correct destination
    if (totalChunksNumber === 1 && chunkIndexNumber === 0) {
      const publicPath = fileCategory === FileCategory.IMAGE 
        ? `/WeFixFiles/Images/${filename}`
        : `/WeFixFiles/Contracts/${filename}`;
      
      return res.status(200).json({ 
        fileReference: filename, 
        message: 'File uploaded successfully',
        category: fileCategory,
        path: publicPath
      });
    }

    // For chunked uploads, use the chunk processing service
    if (isNaN(chunkIndexNumber)) {
      return res.status(400).send('chunkIndex is required for chunked uploads');
    }

    const fileReference = await fileService.processChunk(req.file, {
      chunkIndex: chunkIndexNumber,
      filename,
      totalChunks: totalChunksNumber,
      category: fileCategory
    });

    if (fileReference) {
      res.status(200).json({ 
        fileReference, 
        message: 'Chunk processed',
        category: fileCategory
      });
    } else {
      res.status(200).send('Chunk processed');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


export default router;

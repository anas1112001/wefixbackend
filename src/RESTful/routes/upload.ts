import express from 'express';
import multer from 'multer';
import path from 'path';

import fileService from '../service/File/fileService';

const destination = path.join(__dirname, '..', '..', '..', 'public');

const router = express.Router();
const storage = multer.diskStorage({
  destination (req, file, cb) {
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
    const {totalChunks} = req.body
    const chunkIndexNumber = parseInt(chunkIndex, 10);

    if (!req.file || !filename || isNaN(chunkIndexNumber)) {
      return res.status(400).send('File or filename/chunkIndex not provided');
    }

    const fileReference = await fileService.processChunk(req.file, {
      chunkIndex: chunkIndexNumber,
      filename,
      totalChunks
    });

    if (fileReference) {
      res.status(200).json({ fileReference, message: 'Chunk processed' });
    } else {
      res.status(200).send('Chunk processed');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


export default router;

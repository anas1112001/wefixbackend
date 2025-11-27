import path from 'path';
import fs from 'fs';

export enum FileCategory {
  IMAGE = 'image',
  CONTRACT = 'contract',
}

/**
 * Determines the file category based on file type or explicit category
 */
export const getFileCategory = (mimetype: string, category?: string): FileCategory => {
  // If category is explicitly provided, use it
  if (category === 'contract') {
    return FileCategory.CONTRACT;
  }
  if (category === 'image') {
    return FileCategory.IMAGE;
  }

  // Otherwise, determine from mimetype
  if (mimetype.startsWith('image/')) {
    return FileCategory.IMAGE;
  }

  // Default to contract for documents (PDF, DOC, etc.)
  return FileCategory.CONTRACT;
};

/**
 * Gets the destination folder path based on file category
 */
export const getDestinationPath = (category: FileCategory): string => {
  const basePath = path.join(__dirname, '..', '..', '..', 'public', 'WeFixFiles');
  
  switch (category) {
    case FileCategory.IMAGE:
      return path.join(basePath, 'Images');
    case FileCategory.CONTRACT:
      return path.join(basePath, 'Contracts');
    default:
      return path.join(basePath, 'Contracts');
  }
};

/**
 * Ensures the destination directory exists, creates it if it doesn't
 */
export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Gets the public URL path for a file
 */
export const getPublicUrlPath = (category: FileCategory, filename: string): string => {
  switch (category) {
    case FileCategory.IMAGE:
      return `/WeFixFiles/Images/${filename}`;
    case FileCategory.CONTRACT:
      return `/WeFixFiles/Contracts/${filename}`;
    default:
      return `/WeFixFiles/Contracts/${filename}`;
  }
};


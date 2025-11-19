import { Request } from 'express';
import { File } from 'multer';

declare module 'express-serve-static-core' {
  export interface Request {
    file?: File;
  }
}
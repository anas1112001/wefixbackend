# File Upload Folder Structure

## Overview
The WeFixFiles folder structure has been created to organize uploaded files by category.

## Folder Structure

```
Backend/public/WeFixFiles/
├── Images/          # For logos, user images, icons
│   └── .gitkeep
└── Contracts/      # Only for contract documents
    └── .gitkeep
```

## Implementation Details

### 1. Folder Creation
- **Location**: `Backend/public/WeFixFiles/`
- **Images Folder**: `Backend/public/WeFixFiles/Images/`
- **Contracts Folder**: `Backend/public/WeFixFiles/Contracts/`
- Folders are automatically created if they don't exist during upload

### 2. File Upload Route
**Endpoint**: `POST /upload`

**Request Body**:
```javascript
{
  file: File,              // The file to upload
  filename: string,        // Desired filename
  chunkIndex: number,      // Chunk index (for chunked uploads)
  totalChunks: number,     // Total number of chunks
  category?: string        // Optional: "image" or "contract"
}
```

**Response**:
```javascript
{
  fileReference: string,
  message: "Chunk processed",
  category: "image" | "contract"
}
```

### 3. File Categorization

Files are categorized automatically based on:
1. **Explicit category** (if provided in request): `category: "image"` or `category: "contract"`
2. **MIME type** (if no category provided):
   - Files with `image/*` MIME type → `Images/` folder
   - All other files → `Contracts/` folder

### 4. Public URL Access

Files are accessible via:
- **Images**: `http://your-domain/WeFixFiles/Images/{filename}`
- **Contracts**: `http://your-domain/WeFixFiles/Contracts/{filename}`

### 5. Code Changes

#### New Files Created:
- `Backend/src/RESTful/utils/filePathHelper.ts` - Utility functions for file path management

#### Modified Files:
- `Backend/src/RESTful/routes/upload.ts` - Updated to use new folder structure
- `Backend/src/RESTful/service/File/fileService.ts` - Updated to support categories
- `Backend/src/RESTful/service/File/utils/fileUtils.ts` - Updated to use category-based paths

### 6. Usage Examples

#### Upload Company Logo (Image)
```javascript
const formData = new FormData();
formData.append('file', logoFile);
formData.append('filename', `company-${companyId}-logo.jpg`);
formData.append('category', 'image');
formData.append('chunkIndex', '0');
formData.append('totalChunks', '1');

const response = await fetch('/upload', {
  method: 'POST',
  body: formData
});
```

#### Upload Contract Document
```javascript
const formData = new FormData();
formData.append('file', contractFile);
formData.append('filename', `contract-${contractId}.pdf`);
formData.append('category', 'contract');
formData.append('chunkIndex', '0');
formData.append('totalChunks', '1');

const response = await fetch('/upload', {
  method: 'POST',
  body: formData
});
```

### 7. Database Storage

Store only the file path/URL in the database:
```typescript
// Company logo
logo: "/WeFixFiles/Images/company-123-logo.jpg"

// Contract file
contractFile: "/WeFixFiles/Contracts/contract-456.pdf"
```

### 8. Static File Serving

Files are automatically served via Express static middleware:
```typescript
app.use(express.static(path.join(__dirname, '..', 'public')));
```

This makes files accessible at `/WeFixFiles/Images/` and `/WeFixFiles/Contracts/`

## Benefits

1. **Organized Structure**: Clear separation between images and contracts
2. **Automatic Categorization**: Files are automatically sorted based on type
3. **Easy Access**: Simple URL structure for accessing files
4. **Scalable**: Easy to add more categories in the future
5. **Type Safety**: TypeScript enums ensure correct category usage

## Notes

- Folders are created automatically if they don't exist
- `.gitkeep` files ensure empty folders are tracked in git
- The old `public/files` folder still exists but new uploads use the new structure
- Consider migrating existing files to the new structure if needed


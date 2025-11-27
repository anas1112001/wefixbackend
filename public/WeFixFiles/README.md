# WeFixFiles Directory Structure

This directory contains all uploaded files for the WeFix application.

## Folder Structure

```
WeFixFiles/
├── Images/          # For logos, user images, icons
└── Contracts/      # Only for contract documents
```

## Usage

### Images
- Company logos
- User profile images
- Icons and other image assets

### Contracts
- Contract documents (PDF, DOC, etc.)
- Contract-related files

## File Access

Files in this directory are served statically via the Express server.
- Images: `/WeFixFiles/Images/{filename}`
- Contracts: `/WeFixFiles/Contracts/{filename}`

## Upload API

When uploading files, specify the category:
- `category: "image"` - Saves to Images folder
- `category: "contract"` - Saves to Contracts folder

If no category is specified, files are automatically categorized based on MIME type.


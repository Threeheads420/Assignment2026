'use strict';

// Import multer for handling file uploads
import multer from 'multer';

// Import Cloudinary storage engine for multer
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Import your Cloudinary configuration file
import cloudinary from './utils/cloudinary.js';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Use your Cloudinary account
  params: {
    folder: 'moons', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'] // Only allow image formats
  }
});

// Export upload middleware using Cloudinary storage
export const upload = multer({ storage: storage });
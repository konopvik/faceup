import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory for easy access
export const upload = multer({ storage });
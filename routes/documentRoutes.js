import express from 'express';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { uploadDocument, getAllDocuments, getDocumentById } from '../controllers/documentController.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadDocument);
router.get('/', protect, getAllDocuments);
router.get('/:id', protect, getDocumentById);

export default router;

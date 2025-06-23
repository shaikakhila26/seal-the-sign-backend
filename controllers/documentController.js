import Document from '../models/Document.js';

export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const document = new Document({
      fileName: file.originalname,
      filePath: file.path,
      uploadedBy: req.user._id
    });

    await document.save();

    res.status(201).json({ message: 'Document uploaded successfully', document });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

export const getAllDocuments = async (req, res) => {
  const docs = await Document.find({ uploadedBy: req.user._id });
  res.json(docs);
};

export const getDocumentById = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Document not found' });
  res.json(doc);
};

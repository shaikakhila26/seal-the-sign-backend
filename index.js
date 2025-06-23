import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // if Vite dev server is running here
  credentials: true
}

));
app.use(express.json());

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

// Temporary root route
app.get('/', (req, res) => {
  res.send('Seal the Sign backend is running');
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));






app.use('/uploads', express.static('uploads'));


import documentRoutes from './routes/documentRoutes.js';
app.use('/api/docs', documentRoutes);


// Custom error handler
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === 'Only PDF files are allowed') {
    return res.status(400).json({ message: err.message });
  }

  // Default error fallback
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

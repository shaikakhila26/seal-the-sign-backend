# Seal the Sign - Backend (Express + MongoDB)

A secure and scalable digital document signing backend built with **Node.js**, **Express**, **MongoDB**, and **JWT**. Supports file uploads, user authentication, signature coordination, PDF processing.

## 📁 Folder Structure

seal-the-sign-backend/
├── controllers/            # Core business logic
├── middleware/             # JWT Auth middleware
├── models/                 # Mongoose schemas (User, Document, Signature)
├── routes/                 # Express routes (auth, docs, signatures)
├── utils/                  # PDF-lib logic
├── uploads/                # PDF files (excluded in .gitignore)
├── .env                    # Environment variables
├── index.js               # Entry point

## 🚀 Features

- JWT Authentication (Login/Register)
- Secure PDF upload using Multer
- Drag-and-drop signature coordinate storage
- Font selection and styling per signature
- Signature rendering via `pdf-lib`
- MongoDB Atlas integration
- Render-compatible deployment

---

## 🧪 API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Documents

- `POST /api/docs/upload` → Upload PDF
- `GET /api/docs/` → Get documents uploaded by user
- `GET /api/docs/:id` → Get document metadata

### Signatures

- `POST /api/signatures/` → Save signature coordinates (dragged)

---

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- Multer (PDF upload)
- JWT + Bcrypt (auth)
- PDF-lib (modify PDF with signature)

## 🛠 Deployment Notes

- ✅ Backend deployed on **Render**
- Enable CORS for frontend origin

## ✅ Author

Kidoo26 (Akhila Shaik)
Computer Science | MERN Developer | Loves building full-stack apps

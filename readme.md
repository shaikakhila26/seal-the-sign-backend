# Seal the Sign - Backend (Express + MongoDB)

A secure and scalable digital document signing backend built with **Node.js**, **Express**, **MongoDB**, and **JWT**. Supports file uploads, user authentication, signature coordination, PDF processing.

## 📁 Folder Structure

seal-the-sign-backend/
 1.controllers/            # Core business logic
 2. middleware/             # JWT Auth middleware
 3. models/                 # Mongoose schemas (User, Document, Signature)
 4. routes/                 # Express routes (auth, docs, signatures)
 5. utils/                  # PDF-lib logic
 6. uploads/                # PDF files (excluded in .gitignore)
 7. .env                    # Environment variables
 8. index.js               # Entry point

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

- Backend deployed on **Render**
- Enable CORS for frontend origin

## ✅ Author

Kidoo26 (Akhila Shaik)
Computer Science | MERN Developer | Loves building full-stack apps

# 📜 CertiSign – PDF Notarization Platform  

CertiSign is a **minimal prototype for a PDF notarization workflow**.  
It allows users to **signup, login, upload a PDF, stamp/sign it, and download the notarized version**.  

This project demonstrates secure authentication, file handling, and PDF manipulation using **MERN stack technologies**.  

---

## 🔗 Links
- **Frontend Repo:** [https://github.com/deft-n-dusk/CertiSign_FE](https://github.com/deft-n-dusk/CertiSign_FE)  
- **Backend Repo:** [https://github.com/deft-n-dusk/CertiSign_BE](https://github.com/deft-n-dusk/CertiSign_BE)  
- **Live Frontend:** [https://certi-sign-fe.vercel.app/](https://certi-sign-fe.vercel.app/)  
- **Live Backend API:** [https://certisign-be.onrender.com](https://certisign-be.onrender.com)  


---

## 🚀 Features
- **User Authentication**
  - Signup, Login, Logout (JWT + httpOnly cookies)  
  - Secure password hashing with bcrypt  
  - Strong validation for email & password  
- **PDF Notarization**
  - Upload a PDF file  
  - Stamp & sign with notary info (`pdf-lib`)  
  - Generate SHA256 hash for integrity  
  - Store signed document in MongoDB  
  - Download signed document securely  
- **Role-based Flow**
  - Auth middleware to protect routes  
  - Session validation via `/check` route  
- **Frontend**
  - React (Vite) + Tailwind CSS  
  - Protected/ Public routes  
  - User-friendly UI for authentication & PDF signing  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Frontend:** React (Vite), Tailwind CSS, Axios  
- **Auth & Security:** JWT, bcrypt, cookie-parser, CORS  
- **File Handling:** multer, pdf-lib  
- **Deployment:**  
  - Backend → Render  
  - Frontend → Vercel  

---

## 📂 Project Structure

## 📂 Backend Folder Structure (`CertiSign_BE`)

```bash
CertiSign_BE/
├── config/
│   └── database.js        # MongoDB connection
├── middlewares/
│   ├── auth.js            # JWT auth middleware
│   └── upload.js          # Multer setup
├── models/
│   ├── user.js            # User schema & methods
│   └── signedDocument.js  # Signed PDF schema
├── routes/
│   ├── authRouter.js      # Signup, Login, Logout
│   ├── authCheckRouter.js # /check route
│   └── pdfRouter.js       # Upload, sign, download
├── utils/
│   ├── pdfSigner.js       # PDF stamping/signing
│   └── validation.js      # Input validation
├── public/
│   └── notary-stamp.png   # Stamp image
├── server.js              # Express entry point
└── package.json


### 🔹 Local Development

#### 1. Clone Repositories
```bash
# Backend
git clone https://github.com/deft-n-dusk/CertiSign_BE.git
cd CertiSign_BE
npm install

# Frontend
git clone https://github.com/deft-n-dusk/CertiSign_FE.git
cd CertiSign_FE
npm install

2. Configure Environment
In CertiSign_BE/.env:

PORT=2713
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

3. Run the Apps
bash

# Start Backend
cd CertiSign_BE
npm start

# Start Frontend
cd ../CertiSign_FE
npm run dev

### Backend (`CertiSign_BE`)

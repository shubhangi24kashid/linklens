# 📌 LinkLens – AI-Powered Link Management Web Application

LinkLens is a full-stack web application designed to help users **save, organize, and summarize web links** with AI assistance. It combines a sleek React.js frontend, a secure Express.js backend, Firebase Firestore for storage and authentication, and Hugging Face NLP models for intelligent link categorization and summarization.

---

## 🚀 Features

- 🔗 Save and manage personal links effortlessly.
- 🤖 AI-powered metadata extraction (title, description, favicon).
- 📰 Auto-summarization & categorization using Hugging Face News Model X.
- 🛡️ Secure user authentication via Firebase Auth (Email/Password + Google Sign-In).
- ⚡ Prevents duplicate link storage.
- 🌐 Full-stack architecture with React (frontend) and Express.js (backend).

---

## 🏗️ Architecture

### Frontend (React.js)
- Handles UI, authentication, and API requests.
- Users can add and manage links after logging in.

### Backend (Express.js)
- Provides REST APIs (`/api/links/add`, `/api/links/check`, etc.).
- Verifies Firebase tokens for secure operations.
- Calls Hugging Face APIs for link summaries and categorization.

### Database (Firestore)
- Stores user links with metadata, category, and summary.
- User-based separation using `userId`.

### AI Integration (Hugging Face)
- Summarizes article descriptions.
- Categorizes links into:
  - Technology
  - Education
  - Health
  - News
  - Entertainment
  - Business
  - Research
  - Other

---

## ⚙️ Tech Stack

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database & Auth:** Firebase Firestore + Firebase Authentication
- **AI/NLP:** Hugging Face News Model X
- **Others:** dotenv, CORS, cheerio, node-fetch

---

## ⚡ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/linklens.git
cd linklens
2️⃣ Install Dependencies
Frontend

bash
Copy code
cd frontend
npm install
cd ..
Backend

bash
Copy code
cd backend
npm install
cd ..
3️⃣ Setup Environment Variables
Backend .env

env
Copy code
PORT=5000
HF_API_KEY=your_huggingface_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your_cert_url
Frontend .env

env
Copy code
REACT_APP_API_URL=http://localhost:5000
▶️ Run Locally
Backend

bash
Copy code
cd backend
npm start
Runs on: http://localhost:5000

Frontend

bash
Copy code
cd frontend
npm start
Runs on: http://localhost:3000

Open in your browser: http://localhost:3000

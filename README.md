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

## 📂 Project Structure

linklens/
├── backend/
│ ├── config/
│ │ └── firebase.js
│ ├── routes/
│ │ └── links.js
│ ├── services/
│ │ └── linkParser.js
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── AddLink.js
│ │ └── auth/firebase.js
│ └── public/
├── .env
└── README.md

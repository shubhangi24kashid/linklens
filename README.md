# 📌 LinkLens – AI-Powered Link Management Web Application

LinkLens is a full-stack web application that allows users to save, organize, and summarize web links with AI assistance.  
It integrates **React.js (frontend)**, **Express.js (backend)**, **Firebase Firestore (database + authentication)**, and **Hugging Face NLP models** for intelligent link categorization and summarization.

---

## 🚀 Features
- 🔗 Save and manage personal links.
- 🤖 AI-powered link metadata extraction (title, description, favicon).
- 📰 Auto-summarization & categorization using **Hugging Face News Model X**.
- 🛡️ User authentication with **Firebase Auth** (Email/Password + Google Sign-In).
- ⚡ Prevents duplicate link storage.
- 🌐 Full-stack architecture with **React (frontend)** and **Express.js (backend)**.

---

## 🏗️ Architecture
1. **Frontend (React.js)**  
   - Handles UI, authentication, and API requests.  
   - Users can add/manage links after logging in.

2. **Backend (Express.js)**  
   - Provides REST APIs (`/api/links/add`, `/api/links/check`, etc.).  
   - Verifies Firebase tokens for security.  
   - Calls Hugging Face APIs for summaries and categorization.

3. **Database (Firestore)**  
   - Stores user links with metadata, category, and summary.  
   - User-based separation using `userId`.

4. **AI Integration (Hugging Face)**  
   - Summarizes article descriptions.  
   - Categorizes links into **Technology, Education, Health, News, Entertainment, Business, Research, Other**.

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


## ⚡ Setup & Installation (One-Time)

# 1️⃣ Clone the Repository
git clone https://github.com/<your-username>/linklens.git
cd linklens

# 2️⃣ Install Dependencies
# Frontend
cd frontend
npm install
cd ..

# Backend
cd backend
npm install
cd ..

# 3️⃣ Setup Environment Variables
# Create .env file in backend/
cat > backend/.env <<EOL
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
EOL

# Create .env file in frontend/
cat > frontend/.env <<EOL
REACT_APP_API_URL=http://localhost:5000
EOL
▶️ Run Locally

# Start Backend
cd backend
npm start
# Runs on http://localhost:5000

# Start Frontend
cd ../frontend
npm start
# Runs on http://localhost:3000
Now open 👉 http://localhost:3000 in your browser.

🌍 Deployment
Frontend: Firebase Hosting / Render (Static Site)
Backend: Render (Web Service) / Firebase Functions
Update REACT_APP_API_URL in frontend .env to match your deployed backend URL.

📌 Future Improvements
Add folder-based link organization.
Enable sharing links across users.
Advanced NLP keyword extraction.

👩‍💻 Author
Shubhangi Kashid




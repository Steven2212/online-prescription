💊 Online Prescription Platform (MERN + Docker)

A full-stack web application where patients can consult doctors online and receive digital prescriptions in PDF format.

🚀 Features

👨‍⚕️ Doctor
Signup & Login
View consultations
Create prescription
Edit prescription
Generate PDF
Send prescription via Email

🧑‍🤝‍🧑 Patient

Signup & Login
View doctors
Book consultation
Make payment (QR-based dummy)
View prescriptions
Download prescription PDF

🏗️ Tech Stack

Frontend

React (Vite)
Tailwind CSS
Axios
React Router
React Hot Toast

Backend

Node.js
Express.js
MongoDB (Mongoose)
Other Services
Supabase (PDF Storage)
Nodemailer (Email)
Puppeteer (PDF generation)

DevOps

Docker
Railway (Backend Deployment)
Vercel (Frontend Deployment)

📁 Project Structure
Online-Prescription/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   └── api/
│   └── index.html
│
├── docker-compose.yml
└── README.md

🌐 Routes / Pages

🔓 Public Routes
Route	Description
/	Home
/login	Login page
/doctor/signup	Doctor registration
/patient/signup	Patient registration
/doctors	View all doctors

👨‍⚕️ Doctor Routes
Route	Description
/dashboard	Doctor dashboard
/doctor/prescription/:consultationId	Create prescription
/doctor/prescription/view/:consultationId	View/Edit prescription

🧑‍🤝‍🧑 Patient Routes
Route	Description
/consult/:doctorId	Book consultation
/consultations	View all consultations
/doctor/prescription/view/:consultationId	View prescription

🔗 Backend API Routes
🔐 Auth
POST /api/auth/login
POST /api/auth/doctor/signup
POST /api/auth/patient/signup
👨‍⚕️ Doctor
GET /api/doctors
GET /api/doctors/:id
📅 Consultation
POST /api/consultations
GET /api/consultations
GET /api/consultations/:id
💊 Prescription
POST /api/prescriptions → Create
GET /api/prescriptions/:consultationId → Get
PUT /api/prescriptions/update → Update
POST /api/prescriptions/send-email → Send email

🐳 Docker Setup
1️⃣ Build & Run
docker-compose up --build
2️⃣ Access
Frontend → http://localhost:5173
Backend → http://localhost:5000

⚙️ Environment Variables

Backend .env

PORT=5000
MONGO_URI=your_mongo_connection
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
SUPABASE_URL=your_url
SUPABASE_KEY=your_key

Frontend .env
VITE_API_URL=http://localhost:5000

🚀 Deployment
Backend (Railway)
Deploy backend folder
Add environment variables
Frontend (Vercel)
Deploy frontend folder

Set:

VITE_API_URL=https://your-backend-url

🧠 Key Highlights

Role-based authentication (Doctor / Patient)
Secure APIs with middleware
PDF generation using Puppeteer
Cloud storage via Supabase
Email integration using Nodemailer
Fully Dockerized application

👨‍💻 Author

Steven

⭐ If you like this project

Give it a ⭐ on GitHub!
# 📖 Journal Management System

A **production-ready REST API** for managing academic journals, built with **Node.js, Express, Sequelize, and SQLite**.  
Includes authentication, role-based access, file uploads, and peer-review workflow.

---

##  Features

-  JWT Authentication (Register / Login)
-  Role-Based Access (Author, Reviewer, Editor, Admin)
-  Manuscript Submission & Status Tracking
-  File Upload with Version Control & Checksums
-  Peer Review Assignment & Submission
-  SQLite Database (Zero Configuration)
-  Secure Password Hashing (bcrypt)

---

##  Tech Stack

| Layer          | Technology |
|---------------|-----------|
| Runtime       | Node.js 18+ |
| Framework     | Express.js |
| ORM           | Sequelize |
| Database      | SQLite |
| Auth          | JWT |
| File Upload   | Multer |
| Security      | Helmet, CORS |

---

## 📂 Project Structure
```
journal-system/
│
├── server.js
├── package.json
├── .env
├── database.sqlite
│
├── config/
│ └── database.js
│
├── models/
│ ├── User.js
│ ├── Submission.js
│ ├── SubmissionFile.js
│ ├── Review.js
│ └── index.js
│
├── routes/
│ ├── auth.js
│ ├── submissions.js
│ └── reviews.js
│
├── middleware/
│ └── auth.js
│
├── uploads/
│ ├── temp/
│ └── files/
│
└── README.md
```
yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/journal-system.git
cd journal-system
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment
Create a .env file:

env
Copy code
PORT=3000
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
NODE_ENV=development
4️⃣ Start Server
bash
Copy code
npm run dev
Server runs at:

arduino
Copy code
http://localhost:3000
🧪 API Health Check
bash
Copy code
curl http://localhost:3000/api/health
Response:

json
Copy code
{
  "status": "ok",
  "database": "SQLite",
  "environment": "development"
}
🔑 Authentication Endpoints
Register
arduino
Copy code
POST /api/auth/register
Login
bash
Copy code
POST /api/auth/login
📄 Submissions API
POST /api/submissions – Create submission

GET /api/submissions/:id – View submission

POST /api/submissions/:id/files – Upload manuscript

GET /api/submissions/:id/files – List files

🧑‍⚖️ Reviews API
POST /api/reviews – Assign reviewer (Editor)

POST /api/reviews/:id/submit – Submit review

GET /api/reviews/:id – View review

💾 Database
SQLite database auto-created as:

pgsql
Copy code
database.sqlite
Tables:

users

submissions

submission_files

reviews


Build Command:

bash
Copy code
npm install
Start Command:

bash
Copy code
npm start
```
# Screenshots:

<img width="1284" height="832" alt="Screenshot 2026-01-08 210723" src="https://github.com/user-attachments/assets/ba0ba9ff-e748-45f8-9b9d-5908d3abcf7b" />

<img width="1092" height="758" alt="Screenshot 2026-01-08 211039" src="https://github.com/user-attachments/assets/729baa4b-838f-444f-8985-abbd0233ebb5" />

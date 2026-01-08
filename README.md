📖 Journal Management System

A RESTful backend application for managing journals, users, and authentication.
Built for learning, college projects, and backend portfolios.

🚀 Tech Stack

Node.js

Express.js

Sequelize ORM

SQLite (no DB installation required)

JWT Authentication

bcrypt (password hashing)

📁 Project Structure
journal-system/
├── server.js
├── config/
│   └── database.js
├── routes/
│   └── auth.js
├── models/
├── middleware/
├── database.sqlite
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/journal-system.git
cd journal-system

2️⃣ Install dependencies
npm install

3️⃣ Start the server
nodemon server.js


Server will run at:

http://localhost:3000

✅ Health Check
curl http://localhost:3000/api/health


Response:

{
  "status": "OK",
  "message": "Server is running"
}

🔐 Authentication APIs
Register User

POST /api/auth/register

{
  "email": "test@example.com",
  "password": "123456"
}

Login User

POST /api/auth/login

🗄️ Database

Uses SQLite

Database file: database.sqlite

Auto-created on server start

No MySQL / PostgreSQL installation needed

🎯 Features

User registration & login

JWT-based authentication

Secure password hashing

Modular route structure

Easy switch to MySQL/PostgreSQL later

🧪 Tools for Testing

curl

Postman

Thunder Client (VS Code)

📌 Future Enhancements

Role-based access (Admin, Editor, Reviewer)

Journal submissions

File uploads

Peer review workflow

📄 License

MIT License

👨‍🎓 Author

Kondam Pravalika Reddy

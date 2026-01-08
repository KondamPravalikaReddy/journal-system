const express = require("express");
const app = express();

// middleware
app.use(express.json());

// register
app.post("/api/auth/register", (req, res) => {
  res.status(201).json({
    message: "User registered successfully (test)"
  });
});

// health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  });
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});

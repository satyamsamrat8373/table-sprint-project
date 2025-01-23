const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const categoryRoutes  = require("./routes/category")
const categoryRoutessub  = require("./routes/sub_Category")
const categoryRoutespro = require("./routes/product")
const VerifyUser = require('./middleware/auth')

// Add cors middleware before other middleware
app.use(cors());

app.use(express.json());

// Create MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'system',
  database: 'Kodnestbank',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Routes
app.get("/", (req, res) => {
  res.send("Ok234");
});

app.use("/api",categoryRoutes)
app.use("/api",categoryRoutessub)
app.use("/api",categoryRoutespro)

// Register User
app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.send({ error: true, message: "Account Already Created!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    res.send({ error: false, message: "Account Created" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: true, message: "Internal Server Error" });
  }
});

// Login User
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.send({ error: true, message: "Incorrect Username & Password" });
    }

    const user = rows[0];

    // Compare passwords
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.send({ error: true, message: "Incorrect Username & Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "KODNEST");

    res.send({ error: false, message: "Success", access_token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: true, message: "Internal Server Error" });
  }
});

// Get User Data
app.get("/user", VerifyUser, async (req, res) => {
  const id = req.user;

  try {
    const [rows] = await pool.query("SELECT email FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).send({ error: true, message: "User Not Found" });
    }

    const user = rows[0];
    res.send({ data: { email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: true, message: "Internal Server Error" });
  }
});

// Middleware to Verify User


// Start the server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Application is Running on ${PORT}`);
});

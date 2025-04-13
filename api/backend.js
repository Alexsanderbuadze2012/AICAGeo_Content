const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 3000;
const SECRET_KEY = "your_secret_key"; // Use a secret key for JWT signing

let users = []; // In-memory users for simplicity (consider using a database in production)

// Serve static files
app.use(express.static(path.join(__dirname, "../public"))); 
app.use(cookieParser()); // Use cookie-parser for cookie handling

// Middleware to parse JSON data
app.use(bodyParser.json());

// Handle API Routes
app.post("/api/signup", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    if (users.some(u => u.username === username)) {
        return res.status(400).json({ message: "Account already exists" });
    }

    users.push({ username, password });
    res.status(201).json({ message: "User signed up successfully" });
});

// Login API with JWT
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Create a JWT token
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Set token in cookie
        return res.status(200).json({ message: `Welcome back, ${username}` });
    }

    res.status(401).json({ message: "Invalid username or password" });
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token = req.cookies.authToken || req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });
        req.user = user;
        next();
    });
}

// Example of a protected route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.status(200).json({ message: "You are logged in!", user: req.user });
});

// Handle all other routes by sending index.html
app.get(["/home", "/login", "/signup", "/"], (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

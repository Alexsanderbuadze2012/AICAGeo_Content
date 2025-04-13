const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
let users = [];

// Serve static files
app.use(express.static(path.join(__dirname, "../public"))); 

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

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) return res.status(200).json({ message: `Welcome back, ${username}` });

    res.status(401).json({ message: "Invalid username or password" });
});

app.post("/api/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

// Handle all other routes by sending index.html
app.get(["/home", "/login", "/signup", "/"], (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

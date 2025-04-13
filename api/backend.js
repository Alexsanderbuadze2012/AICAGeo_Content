const express = require("express");
const bodyParser = require("body-parser");
const path = require('path'); 
const app = express();

const PORT = process.env.PORT || 3000;

let users = [];

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../public")));

app.post("/api/signup", (req, res) =>{
    const { username, password } = req.body;

    if (!username || !password){
        return res.status(400).json({ message: "Please provide a username and password" });
    }

    const userExists = users.some(u => u.username === username);
    if (userExists){
        return res.status(400).json({ message: "This account already exists" });
    }

    users.push({ username, password });
    res.status(201).json({ message: "User signed up successfully" });
});

app.post("/api/login", (req, res) =>{
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.status(200).json({ message: `Welcome back, ${username}` });
    }

    res.status(401).json({ message: "Please enter valid username and password!" });
});

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post("/api/logout", (req, res) =>{
    res.status(200).json({ message: "Logged out successfully!" });
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

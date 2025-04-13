const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Mock database (Replace with real database in production)
const users = [
  { username: 'testuser', password: '$2a$10$wWq7I8lYNllj3Pja9wcdpe9MfP0zIkSjqb2lxl.HOYhFBeQpIHj/e', // Password: 'password'
    posts: [] 
  }
];

// JWT Secret
const JWT_SECRET = 'your_jwt_secret';

// Route: Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password!" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid username or password!" });
    }

    // Create JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.json({ message: `Welcome back, ${username}!`, token });
});

// Route: Protected (Check if user is logged in)
app.get('/api/protected', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // User is authenticated
        const user = users.find(u => u.username === decoded.username);
        res.json({ message: 'You are logged in!', user });
    });
});

// Route: Logout (Clear cookie)
app.post('/api/logout', (req, res) => {
    res.clearCookie('authToken');  // Clear the token from the cookie
    res.json({ message: 'You have been logged out' });
});

// Route: Create Post
app.post('/api/createPost', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // User is authenticated
        const user = users.find(u => u.username === decoded.username);
        const { content } = req.body;

        // Add post to user's posts
        user.posts.push(content);

        res.json({ message: 'Post created successfully', post: content });
    });
});

// Serve static files (for your front-end HTML, JS, CSS)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

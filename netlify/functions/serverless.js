const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const router = express.Router();

app.use(bodyParser.json());

// Serve static files from the appropriate directories
app.use('/Html', express.static(path.join(__dirname, '../../source/Html')));
app.use('/script', express.static(path.join(__dirname, '../../source/script')));
app.use('/CSS', express.static(path.join(__dirname, '../../source/CSS')));
app.use('/img', express.static(path.join(__dirname, '../../source/img')));

const db = new sqlite3.Database('./devsurf.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, pin TEXT NOT NULL)', (err) => {
            if (err) {
                console.error("Failed to create table", err);
            } else {
                console.log("Table is ready");
            }
        });
    }
});

router.post('/register', (req, res) => {
    const { name, pin } = req.body;
    if (!name || !pin) {
        console.error('Missing name or pin in the request');
        return res.status(400).json({ error: 'Missing name or pin' });
    }

    const sql = 'INSERT INTO users (name, pin) VALUES (?, ?)';
    db.run(sql, [name, pin], function (err) {
        if (err) {
            console.error("Error when inserting user:", err.message);
            res.status(500).json({ error: 'Database operation failed' });
            return;
        }
        console.log(`User registered with ID: ${this.lastID}`);
        res.json({ message: 'User Registered', id: this.lastID });
    });
});

router.post('/login', (req, res) => {
    const { pin } = req.body;
    const sql = 'SELECT * FROM users WHERE pin = ?';
    db.get(sql, [pin], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            const firstName = row.name.split(' ')[0]; // Get the first name
            res.json({ message: 'User Found', redirect: `home.html?username=${firstName}`, username: firstName });
        } else {
            res.status(404).json({ message: 'User Not Found' });
        }
    });
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    const username = req.query.username || req.body.username;
    if (!username) {
        return res.redirect('/');
    }
    next();
}

// Use the authentication middleware for protected routes
router.get('/home.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../source/Html/home.html'));
});

router.get('/project.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../source/Html/project.html'));
});

app.use('/.netlify/functions/serverless', router);

module.exports = app;
module.exports.handler = serverless(app);

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ranny@123',
    database: 'code_snippets'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/snippets', (req, res) => {
    const { username, language, stdin, source_code } = req.body;
    const sql = 'INSERT INTO snippets (username, language, stdin, source_code) VALUES (?, ?, ?, ?)';
    connection.query(sql, [username, language, stdin, source_code], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Snippet created successfully' });
        }
    });
});

app.get('/getsnippets', (req, res) => {
    const sql = 'SELECT * FROM snippets';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Language ID mapping
const languageMap = {
    "Python": 71,
    "JavaScript": 63,
    "Java": 62,
    "C++": 54
};

// Route to execute code snippet using Judge0 API
app.post('/execute', async (req, res) => {
    try {
        const { code, language, stdin } = req.body;

        const languageId = languageMap[language];

        // // Encode the source code and stdin to Base64
        // const sourceCodeBase64 = Buffer.from(code).toString('base64');
        // const stdinBase64 = Buffer.from(stdin).toString('base64');

        // Request payload for Judge0 API
        const payload = {
            source_code: code,
            language_id: languageId,
            stdin: stdin,
            expected_output: ''
        };

        // Send request to Judge0 API
        const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true', payload, {
            headers: {
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'x-rapidapi-key': 'd0608d87f7mshf59128bdcac3914p1d3bb1jsnea69f15657f5',
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });

        // Get submission token from response
        const token = response.data.token;

        // Poll Judge0 API to get submission result
        const submissionUrl = `https://judge0-ce.p.rapidapi.com/submissions/${token}`;
        const resultResponse = await axios.get(submissionUrl, {
            headers: {
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'x-rapidapi-key': 'd0608d87f7mshf59128bdcac3914p1d3bb1jsnea69f15657f5',
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });

        // Extract output from result response
        const output = resultResponse.data.stdout;

        res.status(200).json({ output });
    } catch (error) {
        console.error('Error executing code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

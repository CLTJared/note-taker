//Base file to start application/program
const express = require('express');
const path = require('path');
const port = process.env.port || 3001;
const api = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Direct /api request to the routes/index.js file for handling
app.use('/api', api);

//Set to serve static pages from /public folder
app.use(express.static('public'));

//Catch going to /notes and direct to the notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//Catch all in case user goes to a page that doesn't exist.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//App listening on port provided.
app.listen(port, () => {
    console.log(`Note Taking app is listening on ${port}.`);
})
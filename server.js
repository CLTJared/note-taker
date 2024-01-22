//Base file to start application/program
const express = require('express');
const path = require('path');
const port = process.env.port || 3001;
const routes = require('./routes/index.js');

const app = express();



//Set to serve static pages from /public/ folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`Starter routing. Updated as we go.`)
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//Catch all in case user goes to a page that doesn't exist.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/404.html'))
})

app.listen(port, () => {
    console.log(`Note Taking app is listening on ${port}.`);
})
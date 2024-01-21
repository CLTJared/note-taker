//Base file to start application/program
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

//Set to serve static pages from /public/ folder
express.static(path.join(__dirname, 'public'));

app.get('/', (req, res) => {
    res.send(`Starter routing. Updated as we go.`)
})

app.listen(port, () => {
    console.log(`Note Taking app is listening on ${port}.`);
})
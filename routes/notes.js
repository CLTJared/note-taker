const notes = require('express').Router();
const fs = require('fs');

notes.get('/', (req, res) => {
    //Read the database file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) { console.error(err); return; }
        res.json(JSON.parse(data));
    })
});

notes.post('/', (req,res) => {
    const { title, text } = req.body;
    if(!title || !text) { return res.status(400).send(`No data provided in ${req.method}.`); }

    console.log(`${req.method} was received.`);
    console.group(`${title} & ${text}`)
    console.groupEnd();
    
    res.send(`${req.method} was received.`)
});

notes.delete('/:note_id', (req, res) => {
    if(!req.params.note_id) { res.status(400).send('No ID provided to delete.'); }
        res.send(`${req.method} was received on id: ${req.params.note_id}`);
});


module.exports = notes;
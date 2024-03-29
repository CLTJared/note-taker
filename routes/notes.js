const notes = require('express').Router();
const { v4: uuid } = require('uuid');
const fs = require('fs');

notes.get('/', (req, res) => {
    //Read the database file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) { console.error(err); return; }
        res.json(JSON.parse(data));
    })
});

notes.delete('/:id', (req, res) => {
    if(!req.params.id) { res.status(400).send('No ID provided to delete.'); }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) { console.error(err); return; }
        const currData = JSON.parse(data);

        for(let i=0; i<currData.length; i++){
            if(currData[i].id == req.params.id) {
                spliceData = currData.splice(i, 1);
    
                fs.writeFile("./db/db.json", JSON.stringify(currData), (err) => {
                    err ? console.error(err) : console.log(`Note ${req.params.id} has been deleted from JSON file.`)
                })
            } else {

            }
        }
    
    res.json(currData);
    });
});

notes.post('/', (req,res) => {
    const { title, text } = req.body;
    if(!title || !text) { return res.status(400).send(`No data provided in ${req.method}.`); }

    console.log(`${req.method} was received.`);
    const newNote = {
        //Unique ID assigned with uuid() function
        id: uuid(),
        title: title,
        text: text
    }
    
    const response = {
        status: 'success',
        body: newNote,
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) { console.error(err); return; }
        const currData = JSON.parse(data);
        currData.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(currData, null, 4), (err) => {
            err ? console.error(err) : console.log(`New Note ${newNote.id} has been written to JSON file.`)
        })
    })

    res.json(response);

});

module.exports = notes;
//Import database
const dbDriver = require('better-sqlite3');
//CONNECT TO DB
const db = dbDriver('bands.sqlite3');

// Import express
const express = require('express');
const { json } = require('express/lib/response');
//Create express app
const app = express();

//Express setup
//Serve a static frontend
app.use(express.static('frontend'));
//Tell express to use json
app.use(express.json());

//REST API routes
app.get('/bands', (req, res) => {
    //req = request
    //res = response

    const bands =db.prepare
        ('SELECT * FROM bands').all();

        //send back json
        res.json(bands);
});

//start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');

});

//get single band based on url / id
app.get('/bands/:id', (req, res) => {
    //get the url id
    const id = req.params.id;
let statement = db.prepare('SELECT * FROM bands WHERE id = :id');
let result = statement.all({
    id

});

//send back 
res.json(result[0] || {'error': 'No band matching id'});
});
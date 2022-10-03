const { response } = require('express');
const express = require('express');
const dataStore = require('nedb');

const app = express();
app.listen(3000, () => console.log('Listening at Port 3000.'));
app.use(express.static('public'));
app.use(express.json({ limit: "1mb"}));

// creating in-memory database
const database = new dataStore('nedb.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log("I got a request!");
    const data = request.body;

    // create current time-stamp
    const timestamp = Date.now();
    data.timestamp = timestamp;

    // insert data to db
    database.insert(data);
    console.log(data);
    // response with json to client
    response.json(data);
});

app.get('/api', (request, response) => {
    // find all documents in collection, query against database
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.send(data);
    });
});
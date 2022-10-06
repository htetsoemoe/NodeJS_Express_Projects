const { response, request } = require('express');
const express = require('express');
const dataStore = require('nedb');
const fetch = require('node-fetch');

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


    // Using Open Weather API
    const openWeatherAPI = fetch
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

// Using Route Parameters in Express
app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);

    const latlon = request.params.latlon.split(",");
    console.log(latlon);

    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);

    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${id}`;
    const fetch_response = await fetch(api_url);// using node-fetch
    const json = await fetch_response.json();
    response.json(json);
})

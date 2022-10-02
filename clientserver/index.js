const { response } = require('express');
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening at Port 3000.'));
app.use(express.static('public'));
app.use(express.json({ limit: "1mb"}));

app.post('/api', (request, response) => {
    console.log("I got a request!");
    console.log(request.body);

    const data = request.body;

    // response with json body to client
    response.json({
        status: "success",
        latitude: data.lat,
        longitude: data.lon,
    });
})
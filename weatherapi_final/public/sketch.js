if ("geolocation" in navigator) {
    console.log("geolocation available");

    navigator.geolocation.getCurrentPosition(async (position) => {
        let lat, lon, weather, air, temp;
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;

            //const api_url = `/weather`;
            const api_url = `/weather/${lat},${lon}`;
            const response = await fetch(api_url);// get request using route parameters in Express
            const json = await response.json();

            console.log(json);

            weather = json.weather.weather;
            air = json.air_quality.results[0].measurements[0];

            document.getElementById('weather').textContent = weather[0].main;
            document.getElementById('temp').textContent = json.weather.main.temp;
            temp = json.weather.main.temp;console.log(temp);

            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            document.getElementById('aq_date').textContent = air.lastUpdated;
        } catch (error) {
            console.error(error);
            air = {value: -1}; // If there is no data for particular city
            document.getElementById('aq_value').textContent = 'NO READING';
        }

        const data = {lat, lon, weather, temp, air};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const db_response = await fetch('api', options);
        const db_json = await db_response.json();
        console.log(db_json);

    });
} else {
    console.log("geolocation not available");
}

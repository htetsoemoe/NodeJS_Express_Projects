function setup() {
    let lat, lon;

    // p5.js
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(200, 200);

    const btn = document.getElementById('submitBtn');
    btn.addEventListener('click', async (event) => {
        const mood = document.getElementById('mood').value;

        // capture image using Base64 format
        video.loadPixels();
        const image64 = video.canvas.toDataURL();

        const data = { lat, lon, mood, image64 };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch("/api", options);
        const json = await response.json();
        console.log(json);
    });

    if ("geolocation" in navigator) {
        console.log("geolocation available");
        navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            document.getElementById("lat").textContent = lat;
            document.getElementById("lon").textContent = lon;

            //const api_url = `/weather`;
            const api_url = `/weather/${lat},${lon}`;            
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
        });
    } else {
        console.log("geolocation not available");
    }
}

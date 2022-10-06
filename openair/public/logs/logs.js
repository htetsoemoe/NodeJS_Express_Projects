async function getData() {
    const response = await fetch('/api'); // get request to server
    const data = await response.json();

    for(const item of data) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const lineBreak = document.createElement('br');
        // create image tag for selfie
        const image = document.createElement('img');

        mood.textContent = `Name : ${item.mood}`;
        geo.textContent = `Latitude : ${item.lat}°, Longitude : ${item.lon}°`;
        date.textContent = `Date : ${new Date(item.timestamp).toLocaleString()}`;
        image.src = item.image64;


        root.append(mood, date, geo, lineBreak, image);
        document.body.append(root);
    }
    console.log(data);    
}
getData();
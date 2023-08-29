const axios = require('axios');

const fetchWeather = async (latitude, longitude, callback) => {
    const weatherURL = `http://api.weatherstack.com/current?access_key=1dd3692d111c9306dffcf48d2b88c2bb&query=${latitude},${longitude}`;

    try {
        const { data } = await axios.get(weatherURL);

        if (data.error) {
            callback('Unable to find location.');
        } else {
            callback(undefined, `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degres out.`);
        }
        
    } catch (error) {
        callback('Unable to connect to weather service.')   
    }
}





const fetchGeocoding = async (location, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibmlrZXQxMiIsImEiOiJjbGxvc2VqNXMwMGp5M2dvODZxbHMwYzN2In0.gmwLQFlJ0Tx2EdGuqvZYng&limit=1`
    
    try {
        const { data } = await axios.get(geocodeURL)
        
        if(data.features.length === 0){
            callback('Unable to find location. Try another search.!');
        } else {
            callback(undefined, {
                latitude : data.features[0].center[1],
                longitude : data.features[0].center[0],
                location : data.features[0].place_name
            });
        }
        
    } catch (error) {
        console.log(error.message);
        callback('Unable to connect to geocode service.');
    }
}


module.exports = { fetchGeocoding, fetchWeather }
const fetch = require('node-fetch');
let config = require('./config');

getCurrentWeatherHongKong = async function () {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=HongKong&appid=${config.openWeatherApiKey}`
    try {
        const response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports.getCurrentWeatherHongKong = getCurrentWeatherHongKong;

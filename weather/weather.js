const request = require('request');


const getWeather = (latitude, longitude, callback) => {
  request({
    url: ` https://api.darksky.net/forecast/01d17faa7a7001601317aec9340695f2/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(`The current temperature is ${body.currently.temperature} and it feels like ${body.currently.apparentTemperature}`);
    } else {
      callback('Unable to fetch weather');
    }
  })
}

module.exports.getWeather = getWeather;

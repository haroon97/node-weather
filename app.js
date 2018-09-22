const yargs = require('yargs');
const geocode = require('./encode/encode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(weatherResults);
        }
      });
    }
  });
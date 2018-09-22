const yargs = require('yargs');
const axios = require('axios');

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

  const encodedAddress = encodeURIComponent(argv.address);
  const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=UHVW4iK5OM0GlsJ3uaq7lCjZ9h4QXA7b&location=${encodedAddress}`;

  axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.info === undefined) {
      throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].locations[0].latLng.lat;
    var log = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/01d17faa7a7001601317aec9340695f2/${lat},${log}`
    return axios.get(weatherUrl)
    .then((response) => {
      console.log(`The current temperature is ${response.data.currently.temperature} and it feels like ${response.data.currently.apparentTemperature}`)
    })
  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to the Map Quest API');
    } else {
      console.log(e.message);
    }
  })
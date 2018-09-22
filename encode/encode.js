const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=UHVW4iK5OM0GlsJ3uaq7lCjZ9h4QXA7b&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Map Quest servers');
    } else if (body === undefined) {
      callback('Unable to find that address');
    } else {
      callback(undefined, {
        longitude: body.results[0].locations[0].latLng.lng,
        latitude: body.results[0].locations[0].latLng.lat
      });
    }
  })
}

module.exports = {
  geocodeAddress: geocodeAddress
}
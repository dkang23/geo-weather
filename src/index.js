let GOOGLE_API_KEY = require('./google.js'); //replace me
let DARKSKY_API_KEY = require('./darksky.js'); //replace me

let axios = require('axios');
const getWeather = (address) => {
  return addressToGeo(address)
    .then((data) => {
      return axios.get(
        `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${data.lat},${data.lng}`
      );
    })
    .then((data) => {
      console.log(data.data);
      return data;
    })
    .catch((err) => console.error(err));
};

const addressToGeo = (address) => {
  const _address = replaceSpacesWithPluses(address);
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${_address}&key=${GOOGLE_API_KEY}`
    )
    .then((data) => {
      return data.data.results[0].geometry.location;
    })
    .catch((err) => console.log(err));
};

const replaceSpacesWithPluses = (address) => {
  const spaceless = address.split(' ');
  let pluses = '';
  let i = 0;
  for (; i < spaceless.length - 1; i++) {
    pluses = pluses + spaceless[i] + '+';
  }
  pluses += spaceless[i];
  return pluses;
};
getWeather('803 elizabeth st, ridgefield, nj 07657, usa');
getWeather('1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA');
//1600+Amphitheatre+Pkwy,+Mountain+View,+CA+94043,+USA
module.exports = { replaceSpacesWithPluses, addressToGeo, getWeather };

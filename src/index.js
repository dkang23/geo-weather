// import GOOGLE_API_KEY from './google.js';
let axios = require('axios');
let GOOGLE_API_KEY = require('./google.js');
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

addressToGeo('1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA');
//1600+Amphitheatre+Pkwy,+Mountain+View,+CA+94043,+USA
module.exports = { replaceSpacesWithPluses, addressToGeo };

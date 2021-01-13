let chai = require('chai');
let expect = chai.expect;
let {
  addressToGeo,
  getWeather,
  replaceSpacesWithPluses,
} = require('../src/index.js');

const formattedAddress = '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA';
const addressWithPluses = replaceSpacesWithPluses(formattedAddress);

describe('Test replaceSpacesWithPlus helper function', () => {
  it('should replace all spaces with plus signs given a string and return a new string', () => {
    expect(addressWithPluses).to.equal(
      '1600+Amphitheatre+Pkwy,+Mountain+View,+CA+94043,+USA'
    );
  });
});

describe('Test addressToGeo functionailty', () => {
  it('should return lat and lng of given address', () => {
    addressToGeo(formattedAddress)
      .then((data) => {
        expect(JSON.stringify(data)).to.equal(
          JSON.stringify({ lat: 37.4215301, lng: -122.0892895 })
        );
      })
      .catch((err) => console.error(err));
  });
});

describe('Test getWeather returned status code', () => {
  it('should return lat and lng of given address', () => {
    getWeather(formattedAddress)
      .then((data) => {
        expect(data.status).to.equal(200);
      })
      .catch((err) => console.error(err));
  });
});

describe('Test getWeather returned latitude', () => {
  it('should return lat and lng of given address', () => {
    getWeather(formattedAddress)
      .then((data) => {
        expect(data.data.latitude).to.equal(37.4215301);
      })
      .catch((err) => console.error(err));
  });
});

describe('Test getWeather returned longitude', () => {
  it('should return lat and lng of given address', () => {
    getWeather(formattedAddress)
      .then((data) => {
        expect(data.data.longitude).to.equal(-122.0892895);
      })
      .catch((err) => console.error(err));
  });
});

describe('Test getWeather currently data', () => {
  it('should return lat and lng of given address', () => {
    getWeather(formattedAddress)
      .then((data) => {
        expect(data.data.currently).to.not.equal(undefined);
      })
      .catch((err) => console.error(err));
  });
});

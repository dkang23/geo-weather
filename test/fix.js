let chai = require('chai');
let expect = chai.expect;
let addr = require('../src/index.js');

const formattedAddress = '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA';
const addressWithPluses = addr.replaceSpacesWithPluses(formattedAddress);

describe('Test replaceSpacesWithPlus helper function', () => {
  it('should replace all spaces with plus signs given a string and return a new string', () => {
    expect(addressWithPluses).to.equal(
      '1600+Amphitheatre+Pkwy,+Mountain+View,+CA+94043,+USA'
    );
  });
});

describe('Test addressToGeo function', () => {
  it('should return lat and lng of given address', () => {
    addr
      .addressToGeo(formattedAddress)
      .then((data) => {
        expect(JSON.stringify(data)).to.equal(
          JSON.stringify({ lat: 37.4215301, lng: -122.0892895 })
        );
      })
      .catch((err) => console.error(err));
  });
});

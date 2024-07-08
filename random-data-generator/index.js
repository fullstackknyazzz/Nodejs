// index.js
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana'];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomAddress() {
  const streets = ['Main St', 'High St', 'Park Ave', 'Broadway'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const number = getRandomInt(1, 1000);
  return `${number} ${street}, ${city}`;
}

module.exports = {
  getRandomInt,
  getRandomName,
  getRandomAddress,
};
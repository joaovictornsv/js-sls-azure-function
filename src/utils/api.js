const axios = require('axios');

module.exports.api = axios.create({
  baseURL: 'https://api.github.com/users',
});
'use strict';
const axios = require('axios');
const { api } = require('../utils/api');


module.exports.handler = async function (context, req) {
  const { name } = req.params;
  
  context.log(`Get ${name} data`)
  const { data } = await api.get(`/${name}`);

  context.res = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  };
  
};
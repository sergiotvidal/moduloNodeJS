'use strict';

const atob = require('atob');


function profileController(req, res) {
  const splitToken = req.token.split('.');
  const decodedData = atob(splitToken[1]).split(',');
  const cleanUuid = decodedData[0].replace(/["{]/g, '').replace(':', ': ');

  return res.status(202).send(`Access granted! This is your ${cleanUuid}`);
}

module.exports = profileController;

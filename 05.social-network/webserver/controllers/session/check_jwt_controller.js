'use strict';

const jwt = require('jsonwebtoken');

function tokenChecker(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader === 'undefined') {
    res.status(403).send('Authorization denied');
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;

  jwt.verify(req.token, process.env.JWT_PASSWORD, (err) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }

    return next();
  });
}


module.exports = tokenChecker;

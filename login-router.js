/* eslint-disable max-len */

'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const atob = require('atob');
const mysqlPool = require('./05.social-network/databases/mysql-pool');

const router = express.Router();

/**
 * - Para el login habría que recoger los datos que vienen del front
 * - Comprobar que el user es quien dice que es (autenticar)
 * - Comprobar que los datos que nos mandan (email y password?) existen en la base de datos, si no existen, mandar error
 * - Si existen en base de datos, comprobar qué tipo de usuario es(autentificar) y enviar de vuelta un mensaje de ok ¿y un JWT?
 * - Si todo ok, ¿vincular a otro end?
 */

async function validateSchema(payload) {
  const schema = {
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 }),
  };

  return Joi.validate(payload, schema);
}

async function loginUser(req, res) {
  const loginData = req.body;

  const { email, password } = req.body;

  // CHECK DE LOS DATOS

  try {
    await validateSchema(loginData);
  } catch (e) {
    return res.status(400).send(e);
  }

  // Ahora habría que hacer una consulta a la base de datos creada, y comprobar que el mail obtenido en la req.body sea igual que el mail obtenido de la consulta

  // busca una conexión con la base de datos

  const connection = await mysqlPool.getConnection();

  const sqlQuery = 'SELECT * FROM users WHERE email = ?';

  try {
    const [resultado] = await connection.query(sqlQuery, email);

    if (resultado[0].verified_at === null) {
      return res.status(401).send('You have to activate your account');
    }

    connection.release();

    // PASSWORD CHECKER

    const passCheck = await bcrypt.compare(
      password,
      resultado[0].password
    );

    if (passCheck === false) {
      return res.status(401).send('Wrong password');
    }

    // JSON WEB TOKEN

    const tokenData = {
      uuid: resultado[0].uuid,
    };

    const token = jwt.sign(tokenData, process.env.JWT_PASSWORD, {
      expiresIn: 60 * 60 * 24,
    });

    res.json({ token });

    return res.status(200).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    return res.status(400).send(e.message);
  }
}

// Crear un middleware tokenChecker que compuebe que el token ha sido enviado en un header por el cliente que hace una request

function tokenChecker(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader === 'undefined') {
    res.status(403).send('Authorization denied');
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
}

// Crear el endpoint al que se te redirige después de hacer el login

function profileController(req, res) {
  jwt.verify(req.token, process.env.JWT_PASSWORD, (err) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }

    const splitToken = req.token.split('.');
    const decodedData = atob(splitToken[1]).split(',');
    const cleanUuid = decodedData[0].replace(/["{]/g, '').replace(':', ': ');

    return res.status(202).send(`Access granted! This is your ${cleanUuid}`);
  });
}

router.post('/login', loginUser);
router.get('/profile', tokenChecker, profileController);

module.exports = router;

'use strict';

/* eslint-disable max-len */

const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const sendgridMail = require('@sendgrid/mail');
const mysqlPool = require('../../databases/mysql-pool');

sendgridMail.setApiKey(process.env.SENGRID_API_KEY);

const router = express.Router();

async function validateSchema(payload) {
  const schema = {
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 }),
  };

  return Joi.validate(payload, schema);
}

async function addVerificationCode(uuid) {
  const verificationCode = uuidV4();
  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  const sqlQuery = 'INSERT INTO users_activation SET ?';
  const connection = await mysqlPool.getConnection();

  await connection.query(sqlQuery, {
    user_uuid: uuid,
    verification_code: verificationCode,
    created_at: createdAt,
  });

  connection.release();

  return verificationCode;
}

async function sendEmailRegistration(userEmail, verificationCode) {
  const linkActivacion = `http://localhost:3000/api/account/activate?verification_code=${verificationCode}`;
  const msg = {
    to: userEmail,
    from: {
      email: 'socialnetwork@yopmail.com',
      name: 'Social Network',
    },
    subject: 'Welcome to blablablablabla',
    text: 'Blablablablabla',
    html: `To confirm the account <a href="${linkActivacion}">activate it here</a>`,
  };

  const data = await sendgridMail.send(msg);

  return data;
}

async function createAccount(req, res) {
  const accountData = req.body;
  try {
    await validateSchema(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  // Tenemos que insertar el usuario en la bdd, para ello:
  // Generamos un uuid v4
  // Miramos la fecha actual created_at
  // Calculamos hash de la pass que nos pasan para almacenarla de   forma segura (instalar paquetes uuid y bcrypt)
  //

  const now = new Date();
  const securePassword = await bcrypt.hash(accountData.password, 10);
  const uuid = uuidV4();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');

  const connection = await mysqlPool.getConnection();

  const sqlInsertion = 'INSERT INTO users SET ?';

  try {
    const resultado = await connection.query(sqlInsertion, {
      uuid,
      email: accountData.email,
      password: securePassword,
      created_at: createdAt,
    });
    connection.release();
    console.log(resultado);

    const verificationCode = await addVerificationCode(uuid);

    await sendEmailRegistration(accountData.email, verificationCode);

    return res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

async function activateAccount(req, res) {
  const { verification_code: verificationCode } = req.query;
  const connection = await mysqlPool.getConnection();

  const sqlQuery = 'SELECT * FROM users_activation WHERE verification_code = ?';

  try {
    const [resultado] = await connection.query(sqlQuery, verificationCode);

    const now = new Date();
    const verificationDate = now.toISOString().substring(0, 19).replace('T', ' ');

    const sqlUpdate = `UPDATE users_activation SET verified_at = ? WHERE verification_code = '${verificationCode}'`;
    await connection.query(sqlUpdate, [verificationDate]);

    const sqlUpdate2 = `UPDATE users SET verified_at = ? WHERE uuid = '${resultado[0].user_uuid}'`;
    await connection.query(sqlUpdate2, [verificationDate]);
    connection.release();

    return res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    return res.status(500).send(e.message);
  }
}

router.post('/account', createAccount);
router.get('/account/activate', activateAccount);
module.exports = router;

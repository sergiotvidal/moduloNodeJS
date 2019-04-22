'use strict';

const express = require('express');

const router = express.Router();

/**
 * - Para el login habría que recoger los datos que vienen del front
 * - Comprobar que el user es quien dice que es (autenticar)
 * - Comprobar que los datos que nos mandan (email y password?) existen en la base de datos, si no existen, mandar error
 * - Si existen en base de datos, comprobar qué tipo de usuario es(autentificar) y enviar de vuelta un mensaje de ok ¿y un JWT?
 * - Si todo ok, ¿vincular a otro end?
 */

function loginUser(req, res, next) {
  
}

router.post('/login', loginUser);

module.exports = router;

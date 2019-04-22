'use strict';

const express = require('express');

const router = express.Router();

const cervezas = [];

router.post('/cervezas', (req, res, next) => {
  cervezas.push(req.body);

  res.send(cervezas);
});

router.get('/cervezas', (req, res, next) => {
  res.send(cervezas)
});

router.get('/cervezas/:nombre', (req, res, next) => {
  const { nombre } = req.params;

  const cervezasFound = cervezas.filter((cerveza) => {
    if (cerveza.nombre === nombre) {
      return true
    }
    return false
    });

  if (cervezasFound.length === 0) {
    res.status(404).send();
  } else {
    res.send(cervezasFound[0]);
  }
});

router.delete('/cervezas/:nombre', (req, res, next) => {
  const { nombre } = req.params;

  const cervezaFound = cervezas.find((cerveza) => {
    cerveza.borrado = true;
    return cerveza.nombre === nombre;
  });

  cervezas.filter((cerveza, i) => {
    if (cerveza.nombre === nombre) {
        cervezas.splice(i, 1);
    }
})

  if (cervezaFound) {
    res.send()
  } else {
    res.status(404).send()
  }

});

module.exports = router;
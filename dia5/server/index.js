'use strict';

const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/calculadora/suma', (req, res) => {
    console.log('Headers recibidos', req.headers);
    console.log('el header X-header-inventado tiene el valor:', req.headers['x-header-inventado']);

    console.log('query params recibidos', req.query);

    const {
        n1,
        n2,
    } = req.query;

    const num1 = parseInt(n1, 10);
    const num2 = parseInt(n2, 10);

    const resultado = num1 + num2;

    const respuesta = {
        resultado: resultado, // al ser igual el nombre del atributo que el del valor, se puede borrar uno de los elementos --> resultado, 

    }

    res.send(respuesta);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

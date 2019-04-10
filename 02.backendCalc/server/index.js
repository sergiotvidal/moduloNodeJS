'use strict';

//tuvimos que instalar el bodyparser (npm install body-parser ...) porque express por defecto no transforma los datos que vienen en el body
const bodyParser = require('body-parser')
const express = require('express');
const sumar = require('./calculadora/sumar.js')
const restar = require('./calculadora/restar.js')
const multiplicar = require('./calculadora/multiplicar.js')
const dividir = require('./calculadora/dividir.js')

const app = express();
const port = 3000;

// app.use(function (req, res, next) {
//     const n = Date.now();
//     req.now = n; // crea un atributo en el objeto req, accesible en todo el documento
//     res.set('x-initial-time', n); // crea un header con el nombre x-initial... y el valor n 
//     next();
// });

app.use(function (req, res, next) {
    const n = Date.now();
    req.now = n; // crea un atributo en el objeto req, accesible en todo el documento
    res.set('x-initial-time', n); // crea un header con el nombre x-initial... y el valor n 

    // creo un método para req, para que antes de obtener las responses en los endpoints se llame a esta función, que calculará el tiempo que se ha pasado en el backend
    req.diffCalc = function diffCalc() {
        const y = Date.now();
        const diff = y - req.now;
        res.set('x-diff-time', diff);
    }
    next();
});

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/calculadora/suma', (req, res) => {
    // console.log('Headers recibidos', req.headers);
    // // console.log('el header X-header-inventado tiene el valor:', req.headers['x-header-inventado']);
// 
    // console.log('query params recibidos', req.query);

    const {
        n1,
        n2,
    } = req.query;

    const num1 = parseInt(n1, 10);
    const num2 = parseInt(n2, 10);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('n1 and n2 must be numbers');
      };

    const resultado = sumar(num1, num2);

    const respuesta = {
        resultado: resultado, // al ser igual el nombre del atributo que el del valor, se puede borrar uno de los elementos --> resultado, 

    }

    req.diffCalc();
    res.send(respuesta);
});

// get no soporta el envío de datos en el body, post, put, patch e incluso delete sí.

app.post('/calculadora/resta', (req, res) => {
    const {
        n1,
        n2
    } = req.body;

    const resultado = restar(n1, n2);

    const respuesta = {
        resultado
    };

    req.diffCalc();
    res.send(respuesta);
});

app.get('/calculadora/multiplica', (req, res) => {
    
    const {
        n1,
        n2,
    } = req.query;

    const num1 = parseInt(n1, 10);
    const num2 = parseInt(n2, 10);

    const resultado = multiplicar(num1, num2);

    const respuesta = {
        resultado: resultado,

    }
    
    req.diffCalc();
    res.send(respuesta);
});


app.post('/calculadora/dividir', (req, res) => {
    const {
        n1,
        n2
    } = req.body;

    if (n2 === 0) {
        return res.status(400).send('n2 must be different from 0');
    }

    const resultado = dividir(n1, n2);

    const respuesta = {
        resultado
    };
    
    req.diffCalc();
    res.send(respuesta);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

'use strict';

const express = require('express');
const mongoose = require('./config/conexion.js');
const Persona = require('./models/persona.js')

const app = express(); // const router = express.Router() ???? --> PODEMOS CREAR CARPETA ROUTERS PARA DEFINIR LAS RUTAS ASOCIADAS AL PROYECTO EN UN ARCHIVO APARTE
const port = 3050;


app.listen(port, () => console.log(`Example app listening on port ${port}!`));



Persona.create({
    firstName: "Sergio",
    lastName: "Timiraos",
    age: 32,
}).then((result) => {
    console.log(result);
}).catch(console.error);
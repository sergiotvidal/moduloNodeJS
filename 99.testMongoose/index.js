'use strict';

const express = require('express');
const mongoose = require('./config/conexion.js');
const Persona = require('./models/persona.js')

const app = express(); // const router = express.Router() ????
const port = 3050;

/////////////////////////////////// DEFINING A MODEL
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
        author: ObjectId,
        title: 'lo que sea',
        body: 'cosas del body',
        date: Date.now().toISOString()
    });
////////////////////////////////////////////////////

Comment.pre()


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let personaSchema = new Schema({
    id: { type: String },
    firstname: { type: String },
    lastName: { type: String },
    age: { type: Number, min: 0 }
}, { versionKey: false }); //el versionkey es para evitar que mongoose cree un atributo automáticamente que tenga como valor --v

let Persona = mongoose.model('Personas', personaSchema);

module.exports = Persona;
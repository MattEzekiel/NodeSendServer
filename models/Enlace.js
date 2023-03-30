const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enlacesSchema = new Schema({
    url: {
        type: String,
        require: true,
    },
    nombre: {
        type: String,
        require: true,
    },
    nombre_original: {
        type: String,
        require: true,
    },
    descargas: {
        type: Number,
        default: 1,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Enlaces', enlacesSchema);
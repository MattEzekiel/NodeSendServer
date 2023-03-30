const Usuario = require('../models/Usuario');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
require('dotenv').config({ path: 'variables.env'})

exports.autenticarUsuario = async (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        res.status(401).json({msg: "El usuario no existe"});
        return next();
    }

    if (bcrypt.compareSync(password, usuario["password"])) {
        const token = jwt.sign({
            id: usuario['_id'],
            nombre: usuario['nombre'],
            email: usuario['email'],
        }, process.env.SECRET, {
            expiresIn: '8h'
        });
        res.status(200).json({token});
    } else {
        res.status(401).json({msg: "Contraseña incorrecta"});
        return next();
    }
}

exports.usuarioAutenticado = (req, res) => {
    res.status(200).json({usuario: req.usuario});
}
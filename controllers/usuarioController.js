const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoUsuario = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
        return res.status(400).json({msg: "El usuario ya está registrado"});
    }

    usuario = await new Usuario(req.body);
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    try {
        await usuario.save();
        res.status(200).json({ msg: 'Usuario Creado' });
    } catch(e) {
        console.error(e);
        res.status(500).json({msg: 'Hubo un error al intentar crear el usuario'});
    }
}
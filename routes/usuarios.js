const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser válido').isEmail(),
    check('password', 'La contraseña debe contener al menos 8 caracteres').isLength({min: 8}),
], usuarioController.nuevoUsuario);

module.exports = router;
const shortId = require('shortid');
const multer = require('multer');
const fs = require('fs');
const Enlaces = require("../models/Enlace");
require('dotenv').config({ path: 'variables.env' });

exports.subirArchivo = async (req, res, next) => {
    const configMulter = {
        limits: {fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024},
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads');
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, shortId.generate() + extension);
            },
        })
    }
    const upload = multer(configMulter).single('archivo');

    upload(req, res, async (error) => {
        console.log(req.file);

        if (!error) {
            res.status(200).json({archivo: req.file.filename})
        } else {
            console.error(error);
            res.status(403).json({msg: 'Error'})
            return next();
        }
    })
}

exports.descargar = async (req, res, next) => {
    const enlace = await Enlaces.findOne({ nombre: req.params.archivo });
    console.log(enlace)

    const folder = __dirname.split('controller');
    const archivo = folder[0] + '/uploads/' + req.params.archivo;
    res.download(archivo);

    const { descargas, nombre } = enlace;

    if (descargas === 1) {
        req.archivo = nombre;
        await Enlaces.findOneAndRemove(enlace._id);
        next();
    } else {
        enlace.descargas--;
        await enlace.save();
    }
}

exports.eliminarArchivo = async (req, res) => {
    try {
        const folder = __dirname.split('controller');
        fs.unlinkSync(`${folder[0]}uploads/${req.archivo}`);
        console.log('Archivo eliminado');
    } catch(e) {
        console.error(e);
    }
}
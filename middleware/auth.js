const jwt = require("jsonwebtoken");
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            req.usuario = jwt.verify(token, process.env.SECRET);
        } catch (e) {
            console.log('JWT no válido')
            console.error(e);
        }
    }

    return next();
}
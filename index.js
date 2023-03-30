const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const conectarDB = require('./config/db');
const cors = require('cors');

conectarDB();

const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(opcionesCors));

app.use(express.json());

// Carpeta pública
app.use(express.static('uploads'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor en puerto ${port}`);
});
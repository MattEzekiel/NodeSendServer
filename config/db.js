const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        });
        console.log('DB conectada');
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = conectarDB;
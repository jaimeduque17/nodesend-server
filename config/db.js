const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        });
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        process.exit(1); // stop the server
    }
}

module.exports = connectionDB;
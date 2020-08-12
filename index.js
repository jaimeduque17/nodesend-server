const express = require('express');
const cors = require('cors');
const connectionDB = require('./config/db');

// create server
const app = express();

// DB connection
connectionDB();

// enable cors
const optionsCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(optionsCors));

// app port
const port = process.env.PORT || 4000;

// enable to read the values of the body
app.use(express.json());

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

// run app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on port ${port}`)
});
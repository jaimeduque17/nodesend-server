const express = require('express');
const connectionDB = require('./config/db');

// create server
const app = express();

// DB connection
connectionDB();

// app port
const port = process.env.PORT || 4000;

// run app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on port ${port}`)
});
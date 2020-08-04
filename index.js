const express = require('express');
const connectionDB = require('./config/db');

// create server
const app = express();

// DB connection
connectionDB();

// app port
const port = process.env.PORT || 4000;

// enable to read the values of the body
app.use(express.json());

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));

// run app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on port ${port}`)
});
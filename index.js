const express = require('express');

// create server
const app = express();

// app port
const port = process.env.PORT || 4000;

// run app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on port ${port}`)
});
// debug identity
const di = '[server.js] ';
// environment
require('dotenv').config();
// dependencies
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
    console.log(di + `Listening at https://localhost:${serverPort}`);
})

// debug identity
const di = '[server.js] ';

// dependencies
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(() => {
  console.log(di + `Listening at https://localhost:${process.env.SERVER_PORT}`);
})

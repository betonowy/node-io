// debug identity
const di = '[server.js] ';

// dependencies
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(di + `Listening at http://localhost:${process.env.port}`);
  console.info(di + 'this is info');
  console.error(di + 'this is error');
  console.debug(di + 'this is debug');
})

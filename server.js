// debug identity
const di = '[server.js] ';
// environment
require('dotenv').config();
const serverPort = process.env.SERVER_PORT;
// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const router = express.Router();
const userApiRouter = require('./src/routes/api-user')(router); // routes for our api functionality

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Mongo Database connection and settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// test request
app.get('/', (req, res) => {
    res.send('Konpeko, konpeko, konpeko! Hololive san-kisei no Usada Pekora-peko! domo, domo!');
});

// api requests
app.use('/api/user', userApiRouter);

// connect to database
mongoose.connect('mongodb://localhost:27017/io', function (err) {
    if (err) {
        console.log(di + "Not connected to MongoDB: " + err);
    } else {
        console.log(di + "Connected to mongodb://localhost:27017/io");
    }
});

// https keys
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(serverPort, () => {
    console.log(di + `Listening at https://localhost:${serverPort}`);
});

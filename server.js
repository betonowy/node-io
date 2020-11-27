// debug identity
const di = '[server.js] ';
// environment
require('dotenv').config();
const serverPort = process.env.SERVER_PORT;
// dependencies
const express = require('express');
const app = express();
let mongoose = require('mongoose'); // database
let bodyParser = require('body-parser'); // json body parsing
let router = express.Router(); // routing
//let apiRoutes = require('./static/routes/api-user')(router); // routes for our api functionality


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Mongo Database connection and settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


// connect to database
mongoose.connect('mongodb://localhost:27017/io', function (err) {
    if (err) {
        console.log(di + "Not connected to MongoDB: " + err);
    } else {
        console.log(di + "Connected to MongoDB");
    }
});


app.listen(serverPort, () => {
    console.log(di + `Listening at https://localhost:${serverPort}`);
});

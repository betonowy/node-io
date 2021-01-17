const di = "[src/api/user-map-list.js] ";
const messages = require('./response-messages');
const mapSolutionSchema = require('../models/map-solution');
const mapClearSchema = require('../models/map-clear');

module.exports = function (req, res) {
    let vars = {};
    let cond = true;

    if (!(req.body.mapName === '')) {
        vars.mapName = req.body.mapName;
        cond = false;
    }

    if (!(req.body.author === '')) {
        cond = false;
        vars.author = req.body.author;
    }

    if (!(req.body.UUID === '')) {
        cond = false;
        vars.UUID = req.body.UUID;
    }

    if (!(req.body.date === '')) {
        cond = false;
        vars.date = req.body.date;
    }

    console.log(di + "criteria: " + vars.mapName + ", " + vars.author + ", " + vars.UUID + ", " + vars.date + ", bypass: " + cond);

    let schema;
    if (req.body.isSolution) {
        schema = mapSolutionSchema;
    } else {
        schema = mapClearSchema;
    }

    let query; // because this bitch doesn't cooperate otherwise with empty vars
    if (cond) {
        query = schema.find({});
    } else {
        query = schema.find(vars);
    }

    query.then(function (doc) {
        console.log(di + "found documents: " + doc.length);
        res.json({
            status: true,
            msg: messages.generalSuccess,
            entries: doc
        })
    }, function () {
        console.log(di + "some kind of error");
        res.json({
            status: false,
            msg: messages.errorDatabaseError
        })
    })
}
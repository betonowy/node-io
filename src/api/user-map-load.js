const messages = require('./response-messages');
const di = "[src/api/user-map-load.js] ";
const mapSolutionSchema = require('../models/map-solution');
const mapClearSchema = require('../models/map-clear');

module.exports = function (req, res) {
    if (req.body.isSolution) {
        console.log(di + "requested map solution")
        mapSolutionSchema.findOne({UUID: req.body.UUID}).then(function (doc) {
            console.log(di + "map solution ok")
            res.json({
                status: true,
                msg: messages.generalSuccess,
                mapGameData: doc
            })
        }, function () {
            console.log(di + "some kind of error")
            res.json({
                status: false,
                msg: messages.errorDatabaseError
            })
        });
    } else {
        console.log(di + "requested clear map")
        mapClearSchema.findOne({UUID: req.body.UUID}).then(function (doc) {
            console.log(di + "clear map ok")
            res.json({
                status: true,
                msg: messages.generalSuccess,
                mapGameData: doc
            })
        }, function () {
            console.log(di + "some kind of error")
            res.json({
                status: false,
                msg: messages.errorDatabaseError
            })
        });
    }
}

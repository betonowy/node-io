const messages = require('./response-messages');
const di = "[src/api/user-map-save.js] ";
const mapSolutionSchema = require('../models/map-solution');
const mapClearSchema = require('../models/map-clear');

module.exports = function (req, res) {
    if (req.body.mapGameData == null || req.body.accToken == null) {
        console.log(di + "insufficient data");
        res.json({
            status: false,
            msg: messages.errorInsufficient
        })
        return;
    }

    let mapQuery, mapSaved;

    if (req.body.isSolution) {
        console.log(di + "uploading solution")
        mapQuery = mapSolutionSchema;
        mapSaved = new mapSolutionSchema();
    } else {
        if (req.userPrivilege) {
            console.log(di + "uploading clear")
            mapQuery = mapClearSchema;
            mapSaved = new mapClearSchema();
        } else {
            console.log(di + "user is not privileged to upload clear map, privilege: " + req.userPrivilege)
            res.json({
                status: false,
                msg: messages.errorUser
            })
            return;
        }
    }

    try {
        mapSaved.mapName = req.body.mapGameData.mapName;
        mapSaved.author = req.body.mapGameData.author;
        mapSaved.date = req.body.mapGameData.date;
        mapSaved.UUID = req.body.mapGameData.UUID;
        mapSaved.allNeededData = req.body.mapGameData.allNeededData;

        mapQuery.findOne({'UUID': mapSaved.UUID}).then(
            function (doc) {
                if (doc == null) {
                    console.log(di + "new map uploaded");
                    mapSaved.save(function (err) {
                        if (err) {
                            console.log(di + "save NOT ok")
                            res.json({
                                status: false,
                                msg: messages.errorDatabaseError
                            })
                        } else {
                            console.log(di + "save ok")
                            res.json({
                                status: true,
                                msg: messages.generalSuccess
                            })
                        }
                    });
                } else {
                    console.log(di + "found duplicate solution to the one uploaded")
                    if (doc.author === mapSaved.author) {
                        console.log(di + "same author, it's ok to overwrite");
                        mapQuery.updateOne({UUID: doc.UUID}, {
                            allNeededData: mapSaved.allNeededData,
                            date: mapSaved.date,
                            mapName: mapSaved.mapName
                        }).then(
                            function () {
                                console.log(di + "save ok")
                                res.json({
                                    status: true,
                                    msg: messages.generalSuccess
                                })
                            }, function () {
                                console.log(di + "save NOT ok")
                                res.json({
                                    status: false,
                                    msg: messages.errorDatabaseError
                                })
                            }
                        );

                    } else {
                        console.log(di + "different author, naughty... will not allow");
                        res.json({
                            status: false,
                            msg: messages.errorUser
                        })
                    }
                }
            }, function () {
                console.log(di + "new map uploaded, but database was refused");
                mapSaved.save(function (err) {
                    if (err) {
                        console.log(di + "save NOT ok")
                        res.json({
                            status: false,
                            msg: messages.errorDatabaseError
                        })
                    } else {
                        console.log(di + "save ok")
                        res.json({
                            status: true,
                            msg: messages.generalSuccess
                        })
                    }
                });
            });
    } catch (e) {
        res.json({
            status: true,
            msg: messages.generalError
        })
    }
}
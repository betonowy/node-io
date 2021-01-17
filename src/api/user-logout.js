const messages = require('./response-messages');
const di = "[src/api/user-logout.js] "
const jwt = require('jsonwebtoken');
const tokenSchema = require('../models/issued-token');

module.exports = function (req, res) {
    if (req.body.refToken == null || req.body.refToken === '') {
        console.log(di + "insufficient data");
        res.json({
            status: false,
            msg: messages.errorInsufficient
        })
    } else {
        const decodedToken = jwt.verify(req.body.refToken, process.env.REFRESH_KEY_SECRET);
        const logoutSubject = decodedToken.name;

        tokenSchema.deleteMany({'issuedFor': logoutSubject}, null, function(err) {
            if (err) {
                console.log(di + "database error")
                res.json({
                    status: false,
                    msg: messages.errorDatabaseError
                })
            } else {
                console.log(di + "logout ok")
                res.json({
                    status: true,
                    msg: messages.generalSuccess
                })
            }
        });
    }
}
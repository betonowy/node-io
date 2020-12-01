const messages = require('./response-messages');
const jwt = require('jsonwebtoken');
const tokenSchema = require('../models/issued-token');

module.exports = function (req, res) {
    if (req.body.refToken == null || req.body.refToken === '') {

    } else {
        const decodedToken = jwt.verify(req.body.refToken, process.env.REFRESH_KEY_SECRET);
        const logoutSubject = decodedToken.name;

        tokenSchema.deleteMany({'issuedFor': logoutSubject}, null, function(err) {
            if (err) {
                res.json({
                    status: false,
                    msg: messages.errorDatabaseError
                })
            } else {
                res.json({
                    status: true,
                    msg: messages.generalSuccess
                })
            }
        });
    }
}
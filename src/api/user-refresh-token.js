const messages = require('./response-messages');
const tokenSchema = require('../models/issued-token');
const jwt = require('jsonwebtoken');

module.exports = function (req, res) {
    tokenSchema.findOne({'data': req.body.refToken}, null, null, function (err, doc) {
        if (err) {
            res.json({
                status: false,
                msg: messages.errorUser
            })
        } else {
            jwt.verify(doc.data, process.env.REFRESH_KEY_SECRET, null, function (err, user) {
                if (err) {
                    res.json({
                        status: false,
                        msg: messages.errorBadToken
                    })
                } else {
                    const newAccessToken = jwt.sign(user, process.env.ACCESS_KEY_SECRET, {expiresIn: process.env.ACCESS_TOKEN_TIME});
                    res.json({
                        status: true,
                        msg: messages.generalSuccess,
                        accToken: newAccessToken,
                        refToken: doc.data
                    })
                }
            })
        }
    })
}
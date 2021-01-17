const messages = require('./response-messages');
const di = "[src/api/user-refresh-token.js] ";
const tokenSchema = require('../models/issued-token');
const jwt = require('jsonwebtoken');

module.exports = function (req, res) {
    tokenSchema.findOne({'data': req.body.refToken}, null, null, function (err, doc) {
        if (err) {
            console.log(di + "could not find token");
            res.json({
                status: false,
                msg: messages.errorUser
            })
        } else {
            jwt.verify(doc.data, process.env.REFRESH_KEY_SECRET, null, function (err, user) {
                if (err) {
                    console.log(di + "bad token");
                    res.json({
                        status: false,
                        msg: messages.errorBadToken
                    })
                } else {
                    const newAccessToken = jwt.sign(user, process.env.ACCESS_KEY_SECRET, {expiresIn: process.env.ACCESS_TOKEN_TIME});
                    console.log(di + "token refreshed - " + user.name);
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
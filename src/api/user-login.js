const userSchema = require('../models/user')
const di = '[src/api/user-login.js] ';
const messages = require('./response-messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSchema = require('../models/issued-token');

module.exports = function (req, res) {
    if (req.body.username == null || req.body.username === '' ||
        req.body.password == null || req.body.password === '') {
        res.json({
            status: false,
            msg: messages.errorInsufficient
        })
    } else {
        userSchema.findOne({'username': req.body.username}, function (err, user) {
            if (err) {
                return res.json({
                    status: false,
                    msg: messages.errorDatabaseError
                })
            } else if (user !== null) {
                bcrypt.compare(req.body.password, user.password, function (err, same) {
                    if (same === true) {
                        const serial = {
                            name: user.username,
                            privilege: user.admin
                        }
                        const newAccessToken = jwt.sign(serial, process.env.ACCESS_KEY_SECRET,
                            {expiresIn: process.env.ACCESS_TOKEN_TIME});
                        const newRefreshToken = jwt.sign(serial, process.env.REFRESH_KEY_SECRET);
                        let refToken = new tokenSchema();
                        refToken.type = "refresh";
                        refToken.data = newRefreshToken;
                        refToken.issuedFor = user.username;
                        refToken.save(function (err) {
                            if (err) {
                                return res.json({
                                    status: false,
                                    msg: messages.generalError
                                })
                            } else {
                                return res.json({
                                    status: true,
                                    msg: messages.generalSuccess,
                                    accToken: newAccessToken,
                                    refToken: newRefreshToken
                                })
                            }
                        })
                    } else {
                        return res.json({
                            status: false,
                            msg: messages.errorPass
                        })
                    }
                })
            } else {
                return res.json({
                    status: false,
                    msg: messages.errorUser
                })
            }
        })
    }

}
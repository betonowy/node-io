const userSchema = require('../models/user')
const di = '[src/api/user-login.js] ';
const messages = require('./response-messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSchema = require('../models/issued-token');

module.exports = function (req, res) {
    if (req.body.username == null || req.body.username === '' ||
        req.body.password == null || req.body.password === '') {
        console.log(di + "insufficient login data");
        res.json({
            status: false,
            msg: messages.errorInsufficient
        })
    } else {
        userSchema.findOne({'username': req.body.username}, function (err, user) {
            if (err) {
                console.log(di + "database error");
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
                        const newAccessToken = jwt.sign(serial, process.env.ACCESS_KEY_SECRET/*,
                            {expiresIn: process.env.ACCESS_TOKEN_TIME}*/);
                        const newRefreshToken = jwt.sign(serial, process.env.REFRESH_KEY_SECRET);
                        let refToken = new tokenSchema();
                        refToken.type = "refresh";
                        refToken.data = newRefreshToken;
                        refToken.issuedFor = user.username;
                        refToken.save(function (err) {
                            if (err) {
                                console.log(di + "token save error");
                                return res.json({
                                    status: false,
                                    msg: messages.generalError
                                })
                            } else {
                                console.log(di + "login ok, tokens generated");
                                return res.json({
                                    status: true,
                                    msg: messages.generalSuccess,
                                    accToken: newAccessToken,
                                    refToken: newRefreshToken
                                })
                            }
                        })
                    } else {
                        console.log(di + "password error");
                        return res.json({
                            status: false,
                            msg: messages.errorPass
                        })
                    }
                })
            } else {
                console.log(di + "username error");
                return res.json({
                    status: false,
                    msg: messages.errorUser
                })
            }
        })
    }

}
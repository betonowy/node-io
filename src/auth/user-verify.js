const jwt = require('jsonwebtoken');
const di = "[src/auth/user-verify.js] ";
const messages = require('../api/response-messages')

module.exports = function (req, res, next) {
    if (req.body.accToken == null) {
        console.log(di + "no token");
        return res.json({
            status: false,
            msg: messages.errorNoToken
        })
    }

    jwt.verify(req.body.accToken, process.env.ACCESS_KEY_SECRET, null, function (err, user) {
        if (err) {
            console.log(di + "bad token");
            return res.json({
                status: false,
                msg: messages.errorBadToken,
                given: req.body.accToken
            })
        } else {
            console.log(di + "user authenticated: " + user.name + " privilege: " + user.privilege);
            req.userIdentity = user.name;
            req.userPrivilege = user.privilege;
            next();
        }
    })
}
const jwt = require('jsonwebtoken');
const messages = require('../api/response-messages')

module.exports = function (req, res, next) {
    if (req.body.accToken == null) return res.json({
        status: false,
        msg: messages.errorNoToken
    })

    jwt.verify(req.body.accToken, process.env.ACCESS_KEY_SECRET, null, function (err, user) {
        if (err) {
            return res.json({
                status: false,
                msg: err,
                given: req.body.accToken
            })
        } else {
            req.userIdentity = user.name;
            req.userPrivilege = user.privilege;
            next();
        }
    })
}
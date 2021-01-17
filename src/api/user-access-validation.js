const messages = require('./response-messages');
const di = '[src/api/user-access-validation] ';

module.exports = function (req, res) {
    console.log(di + "ok, user: " + req.userIdentity + ", admin: " + req.userPrivilege);
    res.json({
        status: true,
        msg: messages.generalSuccess,
        username: req.userIdentity,
        privilege: req.userPrivilege
    })
}
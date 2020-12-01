const messages = require('./response-messages');
const tokenSchema = require('../models/issued-token');

module.exports = function (req, res) {
    res.json({
        status: true,
        msg: messages.generalSuccess,
        username: req.userIdentity,
        privilege: req.userPrivilege
    })
}
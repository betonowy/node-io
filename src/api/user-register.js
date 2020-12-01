const userSchema = require('../models/user')
const di = '[src/api/user-register.js] ';
const messages = require('./response-messages');

module.exports = function (req, res) {
    let dbUser = new userSchema();
    dbUser.username = req.body.username;
    dbUser.password = req.body.password;
    dbUser.email = req.body.email;
    dbUser.admin = req.body.admin;

    if (dbUser.username == null || dbUser.username === '' ||
        dbUser.password == null || dbUser.password === '' ||
        dbUser.email == null || dbUser.email === '' ||
        dbUser.admin == null || dbUser.admin === '') {
        res.json({
            status: false,
            msg: messages.errorInsufficient
        })
        console.log(di + 'Insufficient register data')
    } else {
        dbUser.save(function (err) {
            if (err) {
                res.json({
                    status: false,
                    msg: messages.errorDatabaseError
                })
                console.log(di + 'Account ' + dbUser.username + ' might already exist')
            } else {
                res.json({
                    status: true,
                    msg: messages.generalSuccess
                })
                if (dbUser.admin === true) {
                    console.log(di + 'Admin created: ' + dbUser.username);
                } else {
                    console.log(di + 'User created: ' + dbUser.username);
                }
            }
        })
    }
}
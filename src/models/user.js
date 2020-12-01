const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const bcryptSaltRounds = 10;

let userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    admin: {type: Boolean, required: true}
});

// user password encryption on save
userSchema.pre('save', function (next) {
    let usr = this;
    bcrypt.hash(usr.password, bcryptSaltRounds, function (err, hash) {
        if (err) return next(err);
        usr.password = hash;
        next();
    });
});

module.exports = mongoose.model('user', userSchema);
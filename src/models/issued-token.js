const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let issuedTokenSchema = new Schema({
    type: {type: String, required: true},
    data: {type: String, required: true, unique: true},
    issuedFor: {type: String, required: true}
})

module.exports = mongoose.model('issuedToken', issuedTokenSchema);
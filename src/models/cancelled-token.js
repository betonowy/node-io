const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cancelledTokenSchema = new Schema({
    type: {type: String, required: true},
    data: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('cancelledToken', cancelledTokenSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mapClear = new Schema({
    mapName: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: String, required: true},
    UUID: {type: String, required: true, unique: true},
    allNeededData: {}
})

module.exports = mongoose.model('mapClear', mapClear);
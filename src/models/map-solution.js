const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mapSolution = new Schema({
    mapName: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: String, required: true},
    UUID: {type: String, required: true, unique: true},
    allNeededData: {}
})

module.exports = mongoose.model('mapSolution', mapSolution);
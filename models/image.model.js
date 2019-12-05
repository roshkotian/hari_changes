const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Image Schema for storing images in the mongodb database */

var imageSchema = new Schema({
    userName: {type: String, require: true},
    userId: {type: String, require: false},
    imageName: {type: String, require: false, default: "none"},
    image: {type: Buffer, require:true} },
    {
        timestamps: true,
    });
module.exports = mongoose.model('Image', imageSchema);
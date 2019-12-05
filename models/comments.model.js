const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentsSchema = new Schema({
    postid: {
        type: String
    },
    body: {
        type: String
    },
    userId: {
        type: String
    },
    userimage: {
        type: String
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Comments', commentsSchema);
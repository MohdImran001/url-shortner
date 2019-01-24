const mongoose = require('mongoose');
const Schema = mongoose.Schema

var urlSchema = new Schema({
    originalUrl : {
        type: String,
        required : [true, 'No Original Url']
    },
    shortUrl: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('urlObject', urlSchema)

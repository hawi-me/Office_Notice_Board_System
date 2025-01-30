const { text } = require('express');
const mongoose = require('mongoose');
const noticeSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'please enter a notice']
    },
    
},
{
    timestamps: true
})
module.exports = mongoose.model('Notice', noticeSchema);
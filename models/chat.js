"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user_names: [{
        type: String,
        required: true
    }],
    users: [{
        type: String,
        required: true
    }],
    messages: [{
        type: String
    }]
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;


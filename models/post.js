const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    unit: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    post_owner: {
        type: String,
        required: true
    },

    post_owner_name: {
        type: String,
        required: true
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;


"use strict";
const Post = require('../models/post');
const webToken = require('jsonwebtoken');
const User = require('../models/user');

// creating data and saving to mongodb
module.exports.create_data = (req, res) => {
    const token = req.cookies.webToken;
    webToken.verify(token, 'sellery is awesome', async(err, decodedToken) => {
        const user = await User.findById(decodedToken.id);
        const location = user.location;
        const post_owner = user._id;
        const post_owner_name = user.name;
        const post = new Post({
            title: req.body.title,
            price: req.body.price,
            unit: req.body.unit,
            description: req.body.description,
            post_owner,
            post_owner_name,
            location
        })
        post.save().then((result) => { res.redirect('/posts'); });
    });
};

// reading data from mongodb and display it in main page
module.exports.read_data = (req, res) => {
    Post.find()
    .sort({ updatedAt: -1})
    .then((result) => { res.render('index', { posts: result });  });
};

// reading user's posts from mongodb and display it on profile page
module.exports.read_my_cards = (req, res) => {
    const token = req.cookies.webToken;
    webToken.verify(token, 'sellery is awesome', async(err, decodedToken) => {
        const user = await User.findById(decodedToken.id);
        Post.find({ post_owner: user._id })
        .sort({ updatedAt: -1})
        .then((result) => { res.render('profile', { posts: result });  });
    });
};

// updating data to mongodb
module.exports.update_data = (req, res) => {
    const id = req.params.id;
    const title = req.query['title'].toString();
    const quantity = req.query['quantity'];
    const price = req.query['price'];
    const description = req.query['description'];

    Post.findByIdAndUpdate(id, {
        "title": title,
        "unit": quantity,
        "price": price,
        "description": description,
    }).then((result) => { res.send(result) });
};

// deleting data from mongodb
module.exports.delete_data = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndDelete(id)
    .then((result) => { res.json({ redirect: '/posts'}); });
}
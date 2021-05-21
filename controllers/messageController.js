"use strict";
const Chat = require('../models/chat');
const User = require('../models/user');
const Post = require('../models/post');
const webToken = require('jsonwebtoken');

module.exports.create_chat = (req, res) => {
    const token = req.cookies.webToken;
    const currentUrl = req.headers.referer;
    const currentPostId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    webToken.verify(token, 'sellery is awesome', async(err, decodedToken) => {
        const user = await User.findById(decodedToken.id);
        const post = await Post.findById(currentPostId);
        const chatRoom = await Chat.findOne(
            { "$or": [{ "users" : [user._id, post.post_owner]}, { "users": [post.post_owner, user._id]} ] }
        );

        if (chatRoom) {
            const id = chatRoom._id;
            console.log(`chat room already exists redirecting to /message/${id}`);
            res.redirect(`/message/${id}`);
        } else {
            const chat = new Chat({
                users: [user._id, post.post_owner],
                user_names: [user.name, post.post_owner_name]
            })
            chat.save().then(() => { res.redirect(`/message/${chat._id}`); });
        }
    });
}

module.exports.read_chat = (req, res) => {
    const token = req.cookies.webToken;
    webToken.verify(token, 'sellery is awesome', async(err, decodedToken) => {
        Chat.find({ users: {"$in": [decodedToken.id]} })
        .sort({ updatedAt: -1})
        .then((result) => { res.render('message', { chats: result });  });
    })
}

module.exports.chat_room = (req, res) => {
    const id = req.params.id;
    Chat.findById(id)
    .then((result) => { res.render('chatRoom', { chat: result }); });
}
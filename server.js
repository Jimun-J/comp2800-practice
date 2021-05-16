"use strict";
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const Post = require('./models/post');
const auth = require('./controllers/authController');

// setting up mongoDB
const mongoDB = 'mongodb+srv://testerUser:test1234@sellery.huzoo.mongodb.net/sellery?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then((result) => app.listen(8000, () => console.log("app available on http://localhost:8000/")));

// setting up EJS
app.set('views', path.join(__dirname, './private/views'));
app.set('view engine', 'ejs');

// setting up statics
app.use('/css', express.static('private/css'));
app.use('/js', express.static('private/js'));
app.use('/images', express.static('private/images'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*', auth.getCurrentUser);

// routing to main page
app.get('/', auth.requireLogin, (req, res) => {
    res.redirect('/posts');
});

// routing to post page
app.get('/post/create', auth.requireLogin, (req, res) => {
    res.render('post');
});

// routing to update page
app.get('/posts/:id', auth.requireLogin, (req, res) => {
    const id = req.params.id;
    Post.findById(id)
    .then((result) => { res.render('update', { post: result });  });
});

// routing to about us page
app.get('/about', auth.requireLogin, (req, res) => {
    res.render('about');
})

// routing to Profile
app.get('/profile', auth.requireLogin, (req, res) => {
    res.render('profile');
})

app.use(routes);








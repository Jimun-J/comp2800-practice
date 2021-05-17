"use strict";
const User = require('../models/user');
const webToken = require('jsonwebtoken');

const oneDayInSeconds = 60 * 60 * 24;

// routing to sign up page
module.exports.render_signup_page = (req, res) => {
    res.render('signup');
};

// routing to log in page
module.exports.render_login_page = (req, res) => {
    res.render('login');
};

// create an account with name, location, email, password
module.exports.signup_post = async (req, res) => {
    const { name, latitude, longitude, email, password } = req.body;

    if (latitude != '' && longitude != '') {
        try {
            const user = await User.create({ 
                name,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }, 
                email, 
                password 
            });
            const token = webToken.sign({ id: user._id }, 'sellery is awesome', {
                expiresIn: oneDayInSeconds
            });
            res.cookie('webToken', token, { httpOnly: true, maxAge: oneDayInSeconds * 1000 });
            res.status(200).json({ user: user._id });
        } catch (err) {
            let error = "password must be longer than 4 characters long";
            if (err.code === 11000) {
                error = "email is already registered";
            }
            res.status(400).json({ error });
        }
    } else {
        let error = "Invalid Address: try to choose an address from the drop down menu";
        res.status(400).json({ error });
    }
    
};

// log in request handler
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = webToken.sign({ id: user._id }, 'sellery is awesome', {
            expiresIn: oneDayInSeconds
        });
        res.cookie('webToken', token, { httpOnly: true, maxAge: oneDayInSeconds * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        let error = err.message;
        res.status(400).json({ error });
    }
};

// log out request handler
module.exports.logout = (req, res) => {
    res.cookie('webToken', '', { maxAge: 1 });
    res.redirect('/');
}

// middleware function that protects our routes
module.exports.requireLogin = (req, res, next) => {
    const token = req.cookies.webToken;

    if (token) {
        webToken.verify(token, 'sellery is awesome', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

// a function to render a welcome message on view for current user.
module.exports.getCurrentUser = (req, res, next) => {
    const token = req.cookies.webToken;

    if (token) {
        webToken.verify(token, 'sellery is awesome', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}


const { Router } = require('express');
const crud = require('../controllers/crudController');
const auth = require('../controllers/authController');
const msg = require('../controllers/messageController');
const upload = require('../controllers/uploadController');

const router = Router();

// create, read, update, and delete routes
router.post('/posts', auth.requireLogin, crud.create_data);
router.get('/posts', auth.requireLogin, crud.read_data);
router.get('/posts/:id/update', crud.update_data);
router.delete('/posts/:id', crud.delete_data);
router.get('/profile', crud.read_my_cards);
router.get('/posts/details/:id', auth.requireLogin, crud.details);

// signup
router.get('/signup', auth.render_signup_page);
router.post('/signup', auth.signup_post);

// login
router.get('/login', auth.render_login_page);
router.post('/login', auth.login_post);

// logout
router.get('/logout', auth.logout);

// message
router.get('/message', msg.read_chat);
router.post('/message', msg.create_chat);
router.get('/message/:id', msg.chat_room);

// upload image
router.post('/uploadImage', upload.store.array('images'), upload.uploads);
module.exports = router;
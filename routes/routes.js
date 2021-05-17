const { Router } = require('express');
const crud = require('../controllers/crudController');
const auth = require('../controllers/authController');

const router = Router();

// create, read, update, and delete routes
router.post('/posts', auth.requireLogin, crud.create_data);
router.get('/posts', auth.requireLogin, crud.read_data);
router.get('/posts/:id/update', crud.update_data);
router.delete('/posts/:id', crud.delete_data);
router.get('/profile', crud.read_my_cards);

// signup
router.get('/signup', auth.render_signup_page);
router.post('/signup', auth.signup_post);

// login
router.get('/login', auth.render_login_page);
router.post('/login', auth.login_post);

// logout
router.get('/logout', auth.logout);

module.exports = router;
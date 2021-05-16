const Post = require('../models/post');

// creating data and saving to mongodb
module.exports.create_data = (req, res) => {
    const post = new Post(req.body);
    post.save().then((result) => { res.redirect('/posts'); });
};

// reading data from mongodb and display it in main page
module.exports.read_data = (req, res) => {
    Post.find()
    .sort({ updatedAt: -1})
    .then((result) => { res.render('index', { posts: result });  });
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
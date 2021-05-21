const multer = require('multer');
const User = require('../models/user');
const webToken = require('jsonwebtoken');
const fs = require('fs');

var storage = multer.diskStorage({
    filename: function(req, file, cb) {
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + ext);
    }
})

module.exports.store = multer({
    storage: storage
})

module.exports.uploads = (req, res, next) => {
    const files = req.files;
    const token = req.cookies.webToken;

    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64');
    })

    imgArray.map((src, index) => {
        const filename = files[index].originalname;
        const contentType = files[index].mimetype;
        const imageBase64 = src
        
        webToken.verify(token, 'sellery is awesome', async(err, decodedToken) => {
            User.findByIdAndUpdate(decodedToken.id, {
                "profile_pic" : {
                    filename,
                    contentType,
                    imageBase64
                }
            }).then((result) => { res.redirect('/profile') });
        })
    });
}
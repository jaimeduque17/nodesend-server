const shortid = require('shortid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Links = require('../models/Link');

exports.newLink = async (req, res, next) => {

    // check if there are errors// check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // create a link object
    const { original_name } = req.body;

    const link = new Links();
    link.url = shortid.generate();
    link.name = shortid.generate();
    link.original_name = original_name;

    // if the user is authenticated
    if (req.user) {
        const { password, downloads } = req.body;

        // assign the downloads number to the link
        if (downloads) {
            link.downloads = downloads;
        }

        // assign a password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash(password, salt);
        }

        // assign the author
        link.author = req.user.id;
    }
    // save in the DB
    try {
        await link.save();
        return res.json({ msg: `${link.url}` });
        next();
    } catch (error) {
        console.log(error);
    }
}
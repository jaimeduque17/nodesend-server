const shortid = require('shortid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Links = require('../models/Link');

exports.newLink = async (req, res, next) => {

    // check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // create a link object
    const { original_name, name } = req.body;

    const link = new Links();
    link.url = shortid.generate();
    link.name = name;
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

// get the link
exports.getLink = async (req, res, next) => {
    // console.log(req.params.url);
    const { url } = req.params;

    // check if the link already exist
    const link = await Links.findOne({ url });
    if (!link) {
        res.status(404).json({ msg: "That link doesn't exist" });
        return next();
    }
    
    // if the link already exist
    res.json({ file: link.name });

    // if the downloads are equal to 1 -> delete the input and the file
    const { downloads, name } = link;

    if (downloads === 1) {

        // delete the file
        req.file = name;

        // delete the DB input
        await Links.findOneAndRemove(req.params.url);

        next();

    } else {
        // if the downloads are > to 1 -> substract 1
        link.downloads--;
        await link.save();
    }

}
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config({ path: '.env' });

exports.authenticateUser = async (req, res, next) => {

    // check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check if the user is registred
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
        res.status(401).json({ msg: `The user doesn't exist` });
        return next();
    }

    // check the password and authenticate the user
    if (bcrypt.compareSync(password, user.password)) {
        // create JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
        }, process.env.SECRET, {
            expiresIn: '8h'
        });

        res.json({ token });

    } else {
        res.status(401).json({ msg: `Wrong password` });
        return next();
    }

}

exports.authenticatedUser = (req, res, next) => {
    res.json({ user: req.user });
}
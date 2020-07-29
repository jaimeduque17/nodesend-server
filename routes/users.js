const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.post('/',
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email invalid').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength(6)
],
userController.newUser
);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.get('/',
    auth,
    authController.authenticatedUser);

router.post('/',
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', `The password can't be empty`).not().isEmpty()
    ], authController.authenticateUser);

module.exports = router;
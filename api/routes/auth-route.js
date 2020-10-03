const controller = require('./../controllers/auth-controller');
const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middleware/auth-middleware');

router.post('/signin', controller.signIn).post('/signup', controller.signUp);

module.exports = router;

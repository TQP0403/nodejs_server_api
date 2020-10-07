const controller = require('./../controllers/auth-controller');
const router = require('express').Router();

router.post('/signin', controller.signIn).post('/signup', controller.signUp);

module.exports = router;

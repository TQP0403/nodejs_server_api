const controller = require('./../controllers/user-controller');
const router = require('express').Router();

router.get('/', controller.get).put('/', controller.update);

module.exports = router;

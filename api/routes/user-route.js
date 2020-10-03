const controller = require('./../controllers/user-controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.get).put('/', controller.update);

module.exports = router;

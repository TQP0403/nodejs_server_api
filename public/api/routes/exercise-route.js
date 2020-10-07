const controller = require('./../controllers/exercise-controller');
const router = require('express').Router();

router.get('/:id?', controller.get).post('/', controller.create);

module.exports = router;

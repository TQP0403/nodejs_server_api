const controller = require('./../controllers/product-controller');
const express = require('express');
const router = express.Router();

router
  .get('/', controller.getAll)
  .post('/', controller.create)
  .get('/:id', controller.getById)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);

module.exports = router;

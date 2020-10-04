const controller = require('./../controllers/practice-controller');
const router = require('express').Router();

router
  // .get('/d/:id?', controller.getDeleted)
  // .get('/f/:id?', controller.getForce)
  .get('/:id?', controller.get)
  .post('/', controller.create)
  .put('/id', controller.update);
// .patch('/:id?', controller.restore)
// .delete('/:id?', controller.delete)
// .delete('/f/:id?', controller.forceDelete)

module.exports = router;

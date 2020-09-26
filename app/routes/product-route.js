let controller = require("./../controllers/product-controller");
module.exports = (app) => {
  app.route("/products").get(controller.getAll).post(controller.create);
  app
    .route("/products/:id")
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete);
};

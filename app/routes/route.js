let productRoute = require("./app/routes/product-route");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("Hello World"));

  productRoute(app);
};

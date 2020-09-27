const productRoute = require("./product-route");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("Hello World"));

  app.use("/products", productRoute);
};

let productRoute = require("./app/routes/product-route");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("Hello World"));

  app.post("/", (req, res) => {
    if (req.body) {
      res.send(req.body.data);
    } else {
      res.send("Hello World! Post");
    }
  });

  productRoute(app);
};

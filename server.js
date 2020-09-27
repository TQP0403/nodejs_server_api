const hostName = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const routes = require("./app/routes/route");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const express = require("express");
const app = express();

app.use(morgan("combined"));

app.use(methodOverride("X-HTTP-Method-Override"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

routes(app); // route

// app.use((req, res) =>
//   res.status(404).send({ url: req.originalUrl + " not found" })
// );

app.listen(port, hostName, () =>
  console.log("Server listening on port " + port)
);

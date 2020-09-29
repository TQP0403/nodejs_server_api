const productRoute = require('./product-route');
const errorHandler = require('./../share/util').errorHandler;

function setRoute(app) {
  app.get('/', (req, res) => res.send('Hello World'));

  app.use('/api/products', productRoute);

  app.use(errorHandler);
}

module.exports = { setRoute };

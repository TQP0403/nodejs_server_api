const errorHandler = require('./../share/util').errorHandler;
const productRoute = require('./product-route');
const userRoute = require('./user-route');

function setRoute(app) {
  app.get('/', (req, res) => res.send('Hello World'));

  app.use('/api/users', userRoute);

  app.use('/api/products', productRoute);

  app.use(errorHandler);
}

module.exports = { setRoute };

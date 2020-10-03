const errorHandler = require('./../share/util').errorHandler;
const authMiddleware = require('./../middleware/auth-middleware');
const authRoute = require('./auth-route');
const userRoute = require('./user-route');
const exerciseRoute = require('./exercise-route');
const productRoute = require('./product-route');

function setRoute(app) {
  app.get('/', (req, res) => res.send('Hello World'));

  app.use('/', authRoute);

  app.use('/api/users', authMiddleware, userRoute);

  app.use('/api/exercises', exerciseRoute);
  // app.use('/api/exercises', authMiddleware, exerciseRoute);

  app.use('/api/products', productRoute);

  app.use(errorHandler);
}

module.exports = { setRoute };

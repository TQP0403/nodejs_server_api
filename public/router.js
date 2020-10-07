const errorHandler = require('./share/util').errorHandler;
const authMiddleware = require('./api/middleware/auth-middleware');
const authRoute = require('./api/routes/auth-route');
const userRoute = require('./api/routes/user-route');
const exerciseRoute = require('./api/routes/exercise-route');
const practiceRoute = require('./api/routes/practice-route');
const productRoute = require('./api/routes/product-route');

function setRoute(app) {
  app.get('/', (req, res) => res.send('Hello World!!!'));   // for test

  app.use('/', authRoute);

  app.get('/socket-io-chat', (req, res) => {
    res.render('index');
  });

  app.use('/api/users', authMiddleware, userRoute);

  // app.use('/api/practices', authMiddleware, practiceRoute);
  app.use('/api/practices', practiceRoute);

  app.use('/api/exercises', exerciseRoute);

  app.use('/api/products', productRoute);

  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });
}

module.exports = { setRoute };

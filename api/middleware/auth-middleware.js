const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) next(new Error('Not authenticated'));

  let token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      err.message = 'timeout';
      next(err);
    }
    req.email = decoded.email;
    req.id = decoded.id;
  });
  console.log('token: ' + token);
  next();
};

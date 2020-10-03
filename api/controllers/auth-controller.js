const User = require('./../models/user');
const jwt = require('jsonwebtoken');

class AuthController {
  signUp(req, res, next) {
    new User(req.body.data)
      .save()
      .then((user) =>
        jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          },
          (err, token) => {
            if (err) next(err);
            console.log('token: ' + token);
            res.json({
              status: 'success',
              message: 'Authenticated',
              token: token,
            });
          }
        )
      )
      .catch(next);
  }

  signIn(req, res, next) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          if (req.body.password === user.password) {
            jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_KEY,
              {
                expiresIn: '1h',
              },
              (err, token) => {
                if (err) next(err);
                console.log('token: ' + token);
                res.json({
                  status: 'success',
                  message: 'Authenticated',
                  token: token,
                });
              }
            );
          } else next(new Error('Password is incorrect'));
        } else next(new Error('Email is not exist'));
      })
      .catch(next);
  }
}

module.exports = new AuthController();

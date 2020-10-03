const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function getToken(user, res, next) {
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
}

class AuthController {
  signUp(req, res, next) {
    let data = req.body;
    bcrypt
      .hash(data.password, saltRounds)
      .then((hash) => {
        data.password = hash;
        return new User(data).save();
      })
      .then((user) => getToken(user, res, next))
      .catch(next);
  }

  signIn(req, res, next) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) throw new Error('Email is not exist');
        if (!bcrypt.compareSync(req.body.password, user.password))
          throw new Error('Password is incorrect');
        getToken(user, res, next);
      })
      .catch(next);
  }
}

module.exports = new AuthController();

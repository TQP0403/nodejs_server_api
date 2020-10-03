const User = require('./../models/user');
const util = require('./../share/util');

class UserController {
  get(req, res, next) {
    User.findOne()
      .byId(req.id)
      .then((user) => util.jsonResponse(res, 200, user))
      .catch(next);
  }

  update(req, res, next) {
    User.updateOne(req.body)
      .byId(req.id)
      .then(() => {
        return User.findOne().byId(req.id).exec();
      })
      .then((user) => util.jsonResponse(res, 201, user))
      .catch(next);
  }
}

module.exports = new UserController();

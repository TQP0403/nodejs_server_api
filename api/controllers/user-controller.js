// const db = require('./../services/mysql-db');
const User = require('./../models/user');
const util = require('./../share/util');

class UserController {
  get(req, res, next) {
    var query = User.find();
    if (req.params.id) query = User.findOne().byId(req.params.id);
    query.then((users) => util.jsonResponse(res, 200, users)).catch(next);
  }

  getDeleted(req, res, next) {
    var query = User.findDeleted();
    if (req.params.id) query = User.findOneDeleted().byId(req.params.id);
    query.then((users) => util.jsonResponse(res, 200, users)).catch(next);
  }

  getForce(req, res, next) {
    var query = User.findWithDeleted();
    if (req.params.id) query = User.findOneWithDeleted().byId(req.params.id);
    query.then((users) => util.jsonResponse(res, 200, users)).catch(next);
  }

  create(req, res, next) {
    new User(req.body.data)
      .save()
      .then((user) => util.jsonResponse(res, 201, user))
      .catch(next);
  }

  update(req, res, next) {
    User.updateOne(req.body.data)
      .byId(req.params.id)
      .then(() => {
        return User.findOne().byId(req.params.id).exec();
      })
      .then((user) => util.jsonResponse(res, 201, user))
      .catch(next);
  }

  delete(req, res, next) {
    var query = User.delete();
    if (req.params.id) query = User.delete().byId(req.params.id);
    query.then(() => util.jsonResponse(res, 201)).catch(next);
  }

  restore(req, res, next) {
    var query = User.restore();
    if (req.params.id) query = User.restore().byId(req.params.id);
    query
      .then((user) => {
        var query = User.find();
        if (req.params.id) query = User.findOne().byId(req.params.id);
        return query.exec();
      })
      .then((user) => util.jsonResponse(res, 201, user))
      .catch(next);
  }

  forceDelete(req, res, next) {
    var query = User.deleteMany();
    if (req.params.id) query = User.deleteOne().byId(req.params.id);
    query.then(() => util.jsonResponse(res, 201)).catch(next);
  }
}

module.exports = new UserController();

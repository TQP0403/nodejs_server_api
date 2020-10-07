const Practice = require('./../models/practice');
const util = require('./../../share/util');

class PracticeController {
  // getDeleted(req, res, next) {
  //   var query = Practice.findDeleted();
  //   if (req.params.id) query = Practice.findOneDeleted().byId(req.params.id);
  //   query
  //     .then((practices) => util.jsonResponse(res, 200, practices))
  //     .catch(next);
  // }

  // getForce(req, res, next) {
  //   var query = Practice.findWithDeleted();
  //   if (req.params.id)
  //     query = Practice.findOneWithDeleted().byId(req.params.id);
  //   query
  //     .then((practices) => util.jsonResponse(res, 200, practices))
  //     .catch(next);
  // }

  get(req, res, next) {
    var query = Practice.find();
    if (req.userId) query.byUserId(req.userId);
    if (req.query.eid) query.byExerciseId(req.query.eid);
    if (req.params.id) query = Practice.findOne().byId(req.params.id);
    query
      .then((practices) => util.jsonResponse(res, 200, practices))
      .catch(next);
  }

  create(req, res, next) {
    new Practice(req.body)
      .save()
      .then((practice) => util.jsonResponse(res, 201, practice))
      .catch(next);
  }

  update(req, res, next) {
    Practice.updateOne(req.body)
      .byId(req.params.id)
      .then(() => {
        return Practice.findOne().byId(req.params.id).exec();
      })
      .then((practice) => util.jsonResponse(res, 201, practice))
      .catch(next);
  }

  // delete(req, res, next) {
  //   var query = Practice.delete();
  //   if (req.params.id) query = Practice.delete().byId(req.params.id);
  //   query.then(() => util.jsonResponse(res, 201)).catch(next);
  // }

  // restore(req, res, next) {
  //   var query = Practice.restore();
  //   if (req.params.id) query = Practice.restore().byId(req.params.id);
  //   query
  //     .then((practice) => {
  //       var query = Practice.find();
  //       if (req.params.id) query = Practice.findOne().byId(req.params.id);
  //       return query.exec();
  //     })
  //     .then((practice) => util.jsonResponse(res, 201, practice))
  //     .catch(next);
  // }

  // forceDelete(req, res, next) {
  //   var query = Practice.deleteMany();
  //   if (req.params.id) query = Practice.deleteOne().byId(req.params.id);
  //   query.then(() => util.jsonResponse(res, 201)).catch(next);
  // }
}

module.exports = new PracticeController();

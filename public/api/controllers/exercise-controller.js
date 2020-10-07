const Exercise = require('./../models/exercise');
const util = require('./../../share/util');

class ExerciseController {
  get(req, res, next) {
    var query = Exercise.find();
    if (req.params.id) query = Exercise.findOne().byId(req.params.id);
    query
      .then((exercises) => util.jsonResponse(res, 200, exercises))
      .catch(next);
  }

  create(req, res, next) {
    new Exercise(req.body)
      .save()
      .then((exercise) => util.jsonResponse(res, 201, exercise))
      .catch(next);
  }

  // update(req, res, next) {
  //   exercise
  //     .updateOne(req.body.data)
  //     .byId(req.params.id)
  //     .then(() => {
  //       return exercise.findOne().byId(req.params.id).exec();
  //     })
  //     .then((exercise) => util.jsonResponse(res, 201, exercise))
  //     .catch(next);
  // }
}

module.exports = new ExerciseController();

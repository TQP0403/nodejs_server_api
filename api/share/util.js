module.exports = {
  jsonResponse(res, statusCode, result) {
    let resData = {};
    if (statusCode === 200 || 201) resData.status = 'success';
    if (result && result.length != 0) resData.data = result;
    res.status(statusCode).contentType('json').json(resData);
  },

  errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  },
};

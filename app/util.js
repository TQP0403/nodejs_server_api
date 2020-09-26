module.exports = {
  jsonResponse(res, status, result) {
    let resData = {};

    if (status == 200) resData.result = "Success";
    if (status == 403) resData.result = "Failure by data";
    if (status == 417) resData.result = "Failure by database";

    if (result) resData.Data = result;

    res.status(status).contentType("json").json(resData);
  },
};

let db = require("./../services/mysql-db");
let util = require("./../share/util");

module.exports = {
  getAll: (req, res) => {
    let sql = "Select * from products";
    db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
        util.jsonResponse(res, 403);
      } else {
        util.jsonResponse(res, 200, rows);
      }
    });
  },

  getById: (req, res) => {
    let sql = "Select * from products where id = ?";
    db.query(sql, [req.params.id], (err, rows) => {
      if (err) {
        console.error(err);
        util.jsonResponse(res, 403);
      } else {
        util.jsonResponse(res, 200, rows);
      }
    });
  },

  create: (req, res) => {
    let data = req.body.data;
    if (!data.name || !data.color || !data.price) {
      util.jsonResponse(res, 403);
    } else {
      let sql = "Insert into products (name, color, price) values (?, ?, ?)";
      db.query(sql, [data.name, data.color, data.price], (err, rows) => {
        if (err) {
          console.error(err);
          util.jsonResponse(res, 417);
        } else if (rows.affectedRows == 0) {
          util.jsonResponse(res, 403);
        } else {
          util.jsonResponse(res, 200);
        }
        // res.json(rows);
      });
    }
  },

  update: (req, res) => {
    let data = req.body.data;
    if (!data.name || !data.color || !data.price) {
      util.jsonResponse(res, 403);
    } else {
      let sql =
        "Update products set name = ?, color = ?, price = ? where id = ?";
      db.query(
        sql,
        [data.name, data.color, data.price, req.params.id],
        (err, rows) => {
          if (err) {
            console.error(err);
            util.jsonResponse(res, 417);
          } else if (rows.affectedRows == 0) {
            util.jsonResponse(res, 403);
          } else {
            util.jsonResponse(res, 200);
          }
          //   res.json(rows);
        }
      );
    }
  },

  delete: (req, res) => {
    let sql = "Delete from products where id = ?";
    db.query(sql, [req.params.id], (err, rows) => {
      if (err) {
        console.error(err);
        util.jsonResponse(res, 417);
      } else if (rows.affectedRows == 0) {
        util.jsonResponse(res, 403);
      } else {
        util.jsonResponse(res, 200);
      }
      //   res.json(rows);
    });
  },
};

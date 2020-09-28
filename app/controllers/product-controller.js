const db = require('./../services/mysql-db');
const Product = require('./../models/product');
const util = require('./../share/util');

class ProductController {
  // mysql
  // getAll(req, res) {
  //   let sql = 'Select * from products';
  //   db.query(sql, (err, rows) => {
  //     if (err) {
  //       console.error(err);
  //       util.jsonResponse(res, 403);
  //     } else {
  //       util.jsonResponse(res, 200, rows);
  //     }
  //   });
  // }

  // getById(req, res) {
  //   let sql = 'Select * from products where id = ?';
  //   db.query(sql, [req.params.id], (err, rows) => {
  //     if (err) {
  //       console.error(err);
  //       util.jsonResponse(res, 403);
  //     } else {
  //       util.jsonResponse(res, 200, rows[0]);
  //     }
  //   });
  // }

  //   create(req, res) {
  //   let data = req.body.data;
  //   if (!data.name || !data.color || !data.price) {
  //     util.jsonResponse(res, 403);
  //   } else {
  //     let sql = 'Insert into products (name, color, price) values (?, ?, ?)';
  //     db.query(sql, [data.name, data.color, data.price], (err, rows) => {
  //       if (err) {
  //         console.error(err);
  //         util.jsonResponse(res, 417);
  //       } else if (rows.affectedRows == 0) {
  //         util.jsonResponse(res, 403);
  //       } else {
  //         util.jsonResponse(res, 200);
  //       }
  //       // res.json(rows);
  //     });
  //   }
  // }

  // update(req, res) {
  //   let data = req.body.data;
  //   if (!data.name || !data.color || !data.price) {
  //     util.jsonResponse(res, 403);
  //   } else {
  //     let sql =
  //       'Update products set name = ?, color = ?, price = ? where id = ?';
  //     db.query(
  //       sql,
  //       [data.name, data.color, data.price, req.params.id],
  //       (err, rows) => {
  //         if (err) {
  //           console.error(err);
  //           util.jsonResponse(res, 417);
  //         } else if (rows.affectedRows == 0) {
  //           util.jsonResponse(res, 403);
  //         } else {
  //           util.jsonResponse(res, 200);
  //         }
  //         //   res.json(rows);
  //       }
  //     );
  //   }
  // }

  // delete(req, res) {
  //   let sql = 'Delete from products where id = ?';
  //   db.query(sql, [req.params.id], (err, rows) => {
  //     if (err) {
  //       console.error(err);
  //       util.jsonResponse(res, 417);
  //     } else if (rows.affectedRows == 0) {
  //       util.jsonResponse(res, 403);
  //     } else {
  //       util.jsonResponse(res, 200);
  //     }
  //     //   res.json(rows);
  //   });
  // }

  // mongodb
  getAll(req, res) {
    Product.find()
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json(err));
  }

  getById(req, res) {
    Product.findOne({ id: Number(req.params.id) })
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json(err));
  }

  create(req, res) {
    let data = req.body.data;
    if (!data.name || !data.color || !data.price) {
      util.jsonResponse(res, 403);
    } else {
      var product = new Product({
        name: data.name,
        color: data.color,
        price: data.price,
      });
      product
        .save()
        .then(() => util.jsonResponse(res, 200))
        .catch((err) => util.jsonResponse(res, 417));
    }
  }

  update(req, res) {
    let data = req.body.data;
    if (!data.name || !data.color || !data.price) {
      util.jsonResponse(res, 403);
    } else {
      Product.updateOne({ id: Number(req.params.id) }, data)
        .then(() => util.jsonResponse(res, 200))
        .catch((err) => util.jsonResponse(res, 417));
    }
  }

  delete(req, res) {
    Product.deleteOne({ id: Number(req.params.id) })
      .then(() => util.jsonResponse(res, 200))
      .catch((err) => util.jsonResponse(res, 417));
  }
}

module.exports = new ProductController();

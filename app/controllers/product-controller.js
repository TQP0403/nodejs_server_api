// const db = require('./../services/mysql-db');
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

  get(req, res) {
    var query = Product.find();

    if (req.params.id) query = Product.findOne().byId(req.params.id);

    query
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json(err));
  }

  getDeleted(req, res) {
    var query = Product.findDeleted();

    if (req.params.id) query = Product.findOneDeleted().byId(req.params.id);

    query
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json(err));
  }

  getForce(req, res) {
    var query = Product.findWithDeleted();

    if (req.params.id) query = Product.findOneWithDeleted().byId(req.params.id);

    query
      .exec()
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
      Product.updateOne(data)
        .byId(req.params.id)
        .then(() => util.jsonResponse(res, 200))
        .catch((err) => util.jsonResponse(res, 417));
    }
  }

  delete(req, res) {
    var query = Product.delete();

    if (req.params.id) query = Product.delete().byId(req.params.id);

    query
      .then(() => util.jsonResponse(res, 200))
      .catch((err) => util.jsonResponse(res, 417));
  }

  restore(req, res) {
    var query = Product.restore();

    if (req.params.id) query = Product.restore().byId(req.params.id);

    query
      .then(() => util.jsonResponse(res, 200))
      .catch((err) => util.jsonResponse(res, 417));
  }

  forceDelete(req, res) {
    var query = Product.deleteMany();

    if (req.params.id) query = Product.deleteOne().byId(req.params.id);

    query
      .then(() => util.jsonResponse(res, 200))
      .catch((err) => util.jsonResponse(res, 417));
  }
}

module.exports = new ProductController();

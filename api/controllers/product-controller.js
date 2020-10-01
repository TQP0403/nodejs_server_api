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
  get(req, res, next) {
    var query = Product.find();
    if (req.params.id) query = Product.findOne().byId(req.params.id);
    query.then((products) => util.jsonResponse(res, 200, products)).catch(next);
  }

  getDeleted(req, res, next) {
    var query = Product.findDeleted();
    if (req.params.id) query = Product.findOneDeleted().byId(req.params.id);
    query.then((products) => util.jsonResponse(res, 200, products)).catch(next);
  }

  getForce(req, res, next) {
    var query = Product.findWithDeleted();
    if (req.params.id) query = Product.findOneWithDeleted().byId(req.params.id);
    query.then((products) => util.jsonResponse(res, 200, products)).catch(next);
  }

  create(req, res, next) {
    new Product(req.body.data)
      .save()
      .then((product) => util.jsonResponse(res, 201, product))
      .catch(next);
  }

  update(req, res, next) {
    Product.updateOne(req.body.data)
      .byId(req.params.id)
      .then(() => {
        return Product.findOne().byId(req.params.id).exec();
      })
      .then((product) => util.jsonResponse(res, 201, product))
      .catch(next);
  }

  delete(req, res, next) {
    var query = Product.delete();
    if (req.params.id) query = Product.delete().byId(req.params.id);
    query.then(() => util.jsonResponse(res, 201)).catch(next);
  }

  restore(req, res, next) {
    var query = Product.restore();
    if (req.params.id) query = Product.restore().byId(req.params.id);
    query
      .then((product) => {
        var query = Product.find();
        if (req.params.id) query = Product.findOne().byId(req.params.id);
        return query.exec();
      })
      .then((product) => util.jsonResponse(res, 201, product))
      .catch(next);
  }

  forceDelete(req, res, next) {
    var query = Product.deleteMany();
    if (req.params.id) query = Product.deleteOne().byId(req.params.id);
    query.then(() => util.jsonResponse(res, 201)).catch(next);
  }
}

module.exports = new ProductController();

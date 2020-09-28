let mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'nodejs_api',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Database Connected!');
});

module.exports = connection;

const mysql = require('mysql2');

const connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'morg',
	database: 'monitor_arduino'
}).promise();

module.exports = connection;
const mysql = require('mysql2');
var connMysql = () =>{
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'morg',
		database: 'monitor_arduino'

	});
}
module.exports = function (){

	return connMysql;
};
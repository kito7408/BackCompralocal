var Sequelize = require('sequelize');

// Base de datos compralocal local
// var connection = new Sequelize('compralocal', 'root', 'root', {
// 	dialect: 'mysql',
// 	operatorsAliases: false,
// });

// Base de datos alpaca local
var connection = new Sequelize('alpaca', 'root', 'root', {
	dialect: 'mysql',
	operatorsAliases: false,
});

// Base de datos compralocal en AWS RDS
// var connection = new Sequelize('compralocal', 'cldevadmin', 'compralocal-devtestdb-admin-pass', {
// 	host: 'compralocal-devtestdb.ctfvthcrodcc.us-east-2.rds.amazonaws.com',
// 	dialect: 'mysql',
// 	operatorsAliases: false,
// });

// Base de datos alpaca en AWS RDS
// var connection = new Sequelize('alpaca', 'aldevadmin', 'alpaca-db-devtest-1289', {
// 	host: 'alpaca-devtestdb.ctfvthcrodcc.us-east-2.rds.amazonaws.com',
// 	dialect: 'mysql',
// 	operatorsAliases: false,
// });

connection.sync();

module.exports = connection;
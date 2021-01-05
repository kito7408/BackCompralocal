var Sequelize = require('sequelize');

// Base de datos local
// var connection = new Sequelize('compralocal', 'root', 'root', {
// 	dialect: 'mysql',
// 	operatorsAliases: false,
// });

// Base de datos en AWS RDS
var connection = new Sequelize('compralocal', 'cldevadmin', 'compralocal-devtestdb-admin-pass', {
	host: 'compralocal-devtestdb.ctfvthcrodcc.us-east-2.rds.amazonaws.com',
	dialect: 'mysql',
	operatorsAliases: false,
});

connection.sync();

module.exports = connection;
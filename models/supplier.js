//PROVEDOR
var Sequelize = require('sequelize');
var connection = require('../connection');

const Supplier = connection.define('supplier', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Supplier;
//PROVEDOR
var Sequelize = require('sequelize');
var connection = require('../connection');

const Supplier = connection.define('supplier', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	bank: {
		type: Sequelize.STRING,
		allowNull: false
	},
	account_number: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Supplier;
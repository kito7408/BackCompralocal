var Sequelize = require('sequelize');
var connection = require('../connection');

const ProductModel = connection.define('productModel', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = ProductModel;
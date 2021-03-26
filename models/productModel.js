var Sequelize = require('sequelize');
var connection = require('../connection');

const ProductModel = connection.define('productModel', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	prodImgNum: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = ProductModel;
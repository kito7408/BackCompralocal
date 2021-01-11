var Sequelize = require('sequelize');
var connection = require('../connection');
var Category = require('./category');
var SubCategory = require('./subCategory');
var Supplier = require('./supplier');

const Product = connection.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	image: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	numSellOnWeek: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	isTrent: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	isOffer: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	priceOffer: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	unit: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Product.belongsTo(Category, {
	foreignKey: {
		allowNull: false
	},
	as: 'category'
});

Product.belongsTo(SubCategory, {
	foreignKey: {
		allowNull: false
	},
	as: 'subcategory'
});

Product.belongsTo(Supplier, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = Product;
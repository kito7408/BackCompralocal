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
	image1: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	image2: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	image3: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	image4: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	image5: {
		type: Sequelize.TEXT,
		allowNull: true
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
		allowNull: true
	},
	priceOffer: {
		type: Sequelize.DOUBLE,
		allowNull: true
	},
	unit: {
		type: Sequelize.STRING,
		allowNull: false
	},
	available: {
		type: Sequelize.BOOLEAN,
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
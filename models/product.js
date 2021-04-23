var Sequelize = require('sequelize');
var connection = require('../connection');
var Category = require('./category');
// var SubCategory = require('./subCategory');
var Supplier = require('./supplier');
var ProductModel = require('./productModel');
var DeliveryZone = require('./deliveryZone');

const Product = connection.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true
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
	numSellOnWeek: {		//de momento no se resetea cada semana
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	isTrent: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	isOffer: {
		type: Sequelize.BOOLEAN,
		allowNull: true,
		defaultValue: false
	},
	priceOffer: {
		type: Sequelize.DOUBLE,
		allowNull: true,
		defaultValue: 0
	},
	unit: {
		type: Sequelize.STRING,
		allowNull: false
	},
	toProv:{
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	available: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
    daysToSend: {
		type: Sequelize.STRING,
		allowNull: false
	},
    numDaysToSend: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
});

Product.belongsTo(Category, {
	foreignKey: {
		allowNull: false
	},
	as: 'category'
});

Product.belongsTo(Supplier, {
	foreignKey: {
		allowNull: false
	}
});

Product.hasMany(ProductModel);
Product.hasMany(DeliveryZone);

module.exports = Product;
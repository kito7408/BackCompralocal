var Sequelize = require('sequelize');
var connection = require('../connection');
var User = require('./user');
var Product = require('./product');
var ProdMod = require('./productModel');

const Cart = connection.define('cart', {
	quantity: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	totalPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	isBuyed: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	comment: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

Cart.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

Cart.belongsTo(Product, {
	foreignKey: {
		allowNull: false
	}
});

Cart.belongsTo(ProdMod, {
	foreignKey: {
		allowNull: true
	}
});

module.exports = Cart;
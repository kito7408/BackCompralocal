var Sequelize = require('sequelize');
var connection = require('../connection');
var User = require('./user');
var Product = require('./product');

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

module.exports = Cart;
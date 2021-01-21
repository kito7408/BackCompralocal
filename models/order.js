var Sequelize = require('sequelize');
var connection = require('../connection');
const Cart = require('./cart');
const OrderState = require('./orderState');
const User = require('./user');

const Order = connection.define('order', {
	num: {
		type: Sequelize.STRING,
		allowNull: false
	},
	totalPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false
	}
});

Order.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

// Order.belongsTo(OrderState, {
// 	foreignKey: {
// 		allowNull: false
// 	}
// });

Order.hasMany(Cart);

module.exports = Order;
var Sequelize = require('sequelize');
var connection = require('../connection');
const Cart = require('./cart');
const User = require('./user');
const HelpProyect = require('./helpProyect');
const Direction = require('./direction');

const Order = connection.define('order', {
	num: {
		type: Sequelize.STRING,
		allowNull: false
	},
	deliveryMethod: {
		type: Sequelize.STRING,
		allowNull: false
	},
	paymentMethod: {
		type: Sequelize.STRING,
		allowNull: false
	},
	paymentState: {
		type: Sequelize.STRING,
		allowNull: false
	},
	productsPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	deliveryPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	totalPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	cupon: {
		type: Sequelize.STRING,
		allowNull: true
	},
	coment: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

Order.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

Order.belongsTo(HelpProyect, {
	foreignKey: {
		allowNull: false
	}
});

Order.belongsTo(Direction, {
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
var Sequelize = require('sequelize');
var connection = require('../connection');

const OrderState = connection.define('orderState', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = OrderState;
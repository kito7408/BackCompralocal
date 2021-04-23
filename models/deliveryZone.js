var Sequelize = require('sequelize');
var connection = require('../connection');

const DeliveryZone = connection.define('deliveryZone', {
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	districts: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

module.exports = DeliveryZone;
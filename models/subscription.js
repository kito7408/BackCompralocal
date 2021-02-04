var Sequelize = require('sequelize');
var connection = require('../connection');

const Subscription = connection.define('subscription', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	phone: {
		type: Sequelize.STRING,
		allowNull: false
	},
});

module.exports = Subscription;
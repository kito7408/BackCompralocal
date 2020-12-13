var Sequelize = require('sequelize');
var connection = require('../connection');

const UserType = connection.define('userType', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = UserType;
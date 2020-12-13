var Sequelize = require('sequelize');
var connection = require('../connection');
var UserType = require('./userType');

const User = connection.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
});

User.belongsTo(UserType, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = User;
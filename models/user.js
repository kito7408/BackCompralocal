var Sequelize = require('sequelize');
var connection = require('../connection');
var UserType = require('./userType');
var Direction = require('./direction');

const User = connection.define('user', {
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
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	docType: {
		type: Sequelize.STRING,
		allowNull: false
	},
	docNum: {
		type: Sequelize.STRING,
		allowNull: false
	},
	docType: {
		type: Sequelize.STRING,
		allowNull: false
	},
	phoneFijo: {
		type: Sequelize.STRING,
		allowNull: true
	},
	phoneMovil: {
		type: Sequelize.STRING,
		allowNull: false
	},
});

User.belongsTo(UserType, {
	foreignKey: {
		allowNull: false
	}
});

User.hasMany(Direction);

module.exports = User;
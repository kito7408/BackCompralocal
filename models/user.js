var Sequelize = require('sequelize');
var connection = require('../connection');
var UserType = require('./userType');

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
	direccion: {
		type: Sequelize.STRING,
		allowNull: false
	},
	provincia: {
		type: Sequelize.STRING,
		allowNull: false
	},
	distrito: {
		type: Sequelize.STRING,
		allowNull: false
	},
	ciudad: {
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

module.exports = User;
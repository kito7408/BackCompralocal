var Sequelize = require('sequelize');
var connection = require('../connection');

const Direction = connection.define('direction', {
	departamento: {
		type: Sequelize.STRING,
		allowNull: false
	},
	provincia: {
		type: Sequelize.STRING,
		allowNull: false
	},
	distrito: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	ciudad: {
		type: Sequelize.STRING,
		allowNull: false
	},
	direccion: {
		type: Sequelize.STRING,
		allowNull: false
	},
	referencia: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Direction;
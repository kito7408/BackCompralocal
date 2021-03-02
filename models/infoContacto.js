var Sequelize = require('sequelize');
var connection = require('../connection');

const InfoContacto = connection.define('infoContacto', {
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
	consulta: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = InfoContacto;
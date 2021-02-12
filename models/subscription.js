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
	clientType: {
		type: Sequelize.STRING,
		allowNull: false
	},
	marca: {
		type: Sequelize.STRING,
		allowNull: true
	},
	ruc: {
		type: Sequelize.STRING,
		allowNull: true
	},
	categoria: {					//lo manejo así y no con relacion a la tabla categorias, porque habrá la opcion de elegir otras categorias fuera de las de la lista
		type: Sequelize.STRING,
		allowNull: false
	},
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
		allowNull: false
	}
});

module.exports = Subscription;
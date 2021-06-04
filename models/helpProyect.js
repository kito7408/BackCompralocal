var Sequelize = require('sequelize');
var connection = require('../connection');

const HelpProyect = connection.define('helpproyect', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	num: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	money: {
		type: Sequelize.DOUBLE,
		allowNull: false
	}
});

module.exports = HelpProyect;
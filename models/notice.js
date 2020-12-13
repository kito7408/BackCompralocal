var Sequelize = require('sequelize');
var connection = require('../connection');
var User = require('./user');

const Notice = connection.define('notice', {
	title: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	image: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

Notice.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = Notice;
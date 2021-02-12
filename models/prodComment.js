var Sequelize = require('sequelize');
var connection = require('../connection');
var User = require('./user');
var Product = require('./product')

const ProdComment = connection.define('prodcomment', {
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	stars: {
		type: Sequelize.DOUBLE,
		allowNull: false
	}
});

ProdComment.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

ProdComment.belongsTo(Product, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = ProdComment;
var Sequelize = require('sequelize');
var connection = require('../connection');
var User = require('./user');

const PageReview = connection.define('pagereview', {
	stars: {
		type: Sequelize.DOUBLE,
		allowNull: false
	}
});

PageReview.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = PageReview;
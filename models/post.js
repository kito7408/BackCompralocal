var Sequelize = require('sequelize');
var connection = require('../connection');
var User = require('./user');

const Post = connection.define('post', {
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
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Post.belongsTo(User, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = Post;
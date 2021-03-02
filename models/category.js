var Sequelize = require('sequelize');
var connection = require('../connection');
// var SubCategory = require('./subCategory');

const Category = connection.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

// Category.hasMany(SubCategory);

module.exports = Category;
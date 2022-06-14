var Sequelize = require('sequelize');
var connection = require('../connection');
var Category = require('./category');

const SubCategory = connection.define('subcategory', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

// SubCategory.belongsTo(Category, {
// 	foreignKey: {
// 		allowNull: false
// 	}
// });

module.exports = SubCategory;
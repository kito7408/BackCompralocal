const Sequelize = require('sequelize');
const connection = require('../connection');
const UserType = require('./userType');
const Direction = require('./direction');
const bcrypt = require('bcrypt');

const User = connection.define('user', {
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
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	docType: {
		type: Sequelize.STRING,
		allowNull: false
	},
	docNum: {
		type: Sequelize.STRING,
		allowNull: false
	},
	docType: {
		type: Sequelize.STRING,
		allowNull: false
	},
	phoneFijo: {
		type: Sequelize.STRING,
		allowNull: true
	},
	phoneMovil: {
		type: Sequelize.STRING,
		allowNull: false
	},
});

User.belongsTo(UserType, {
	foreignKey: {
		allowNull: false
	}
});

// User.beforeCreate(async (user, options) => {
// 	console.log("create");
// 	const hashedPassword = await bcrypt.hash(user.password, 10);
// 	user.password = hashedPassword;
// });

// User.beforeUpdate(async (user, options) => {
// 	console.log("update");
// 	const hashedPassword = await bcrypt.hash(user.password, 10);
// 	user.password = hashedPassword;
// });

User.beforeSave(async (user, options) => {
	const hashedPassword = await bcrypt.hash(user.password, 10);
	user.password = hashedPassword;
});

User.hasMany(Direction);

module.exports = User;
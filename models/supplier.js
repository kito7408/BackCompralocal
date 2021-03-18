//PROVEDOR
var Sequelize = require('sequelize');
var connection = require('../connection');

const Supplier = connection.define('supplier', {
	name: {							//nombre comercial
		type: Sequelize.STRING,
		allowNull: false
	},
	business_name: {				//razon social
		type: Sequelize.STRING,
		allowNull: true
	},
	ruc: {
		type: Sequelize.STRING,
		allowNull: true
	},
	image: {						//logo de la empresa
		type: Sequelize.TEXT,
		allowNull: true
	},
	description: {					//cuentanos tu historia
		type: Sequelize.TEXT,
		allowNull: true
	},
	bank: {
		type: Sequelize.STRING,
		allowNull: true
	},
	account_number: {
		type: Sequelize.STRING,
		allowNull: true
	},
	cci_account_number: {
		type: Sequelize.STRING,
		allowNull: true
	},
	email: {					//correo de contacto
		type: Sequelize.STRING,
		allowNull: false
	},
	contact_person: {			//representante legal
		type: Sequelize.STRING,
		allowNull: false
	},
	dni_contact: {				//dni de contacto
		type: Sequelize.STRING,
		allowNull: true
	},
	phone_contact: {			//telefono de contacto
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
	},
	direccion: {
		type: Sequelize.STRING,
		allowNull: false
	},
	available: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

module.exports = Supplier;
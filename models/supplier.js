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
		allowNull: false
	},
	ruc: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {						//logo de la empresa
		type: Sequelize.TEXT,
		allowNull: false
	},
	description: {					//cuentanos tu historia
		type: Sequelize.TEXT,
		allowNull: true
	},
	bank: {
		type: Sequelize.STRING,
		allowNull: false
	},
	account_number: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {					//correo dek contacto
		type: Sequelize.STRING,
		allowNull: false
	},
	contact_person: {			//representante legal
		type: Sequelize.STRING,
		allowNull: false
	},
	dni_contact: {				//dni de contacto
		type: Sequelize.STRING,
		allowNull: false
	},
	phone_contact: {			//telefono de contacto
		type: Sequelize.STRING,
		allowNull: false
	},
	fiscal_address: {			//direccion fiscal
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Supplier;
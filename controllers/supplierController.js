const Supplier = require('../models/supplier');

let supplierModel = {};

supplierModel.getAll = (callback) => {
    Supplier.findAll().then(result => {
        callback(null, result);
    });
};


supplierModel.insert = (data, callback) => {
    Supplier.create({
        name: data.name,
        business_name: data.business_name,
        ruc: data.ruc,
        image: data.image,
        description: data.description,
        bank: data.bank,
        account_number: data.account_number,
        email: data.email,
        contact_person: data.contact_person,
        dni_contact: data.dni_contact,
        phone_contact: data.phone_contact,
        fiscal_address: data.fiscal_address
    }).then(result => {
        callback(null, result.get());
    });
};

supplierModel.update = (data, callback) => {
    Supplier.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.business_name = data.business_name;
        obj.ruc = data.ruc;
        obj.image = data.image;
        obj.description = data.description;
        obj.bank = data.bank;
        obj.account_number = data.account_number;
        obj.email = data.email;
        obj.contact_person = data.contact_person;
        obj.dni_contact = data.dni_contact;
        obj.phone_contact = data.phone_contact;
        obj.fiscal_address = data.fiscal_address;
        obj.save().then(result => callback(null, result.get()));
    });
};

supplierModel.delete = (id, callback) => {
    Supplier.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

supplierModel.findById = (id, callback) => {
    Supplier.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = supplierModel;
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
        image: data.image,
        bank: data.bank,
        account_number: data.account_number,
        email: data.email,
        contact_person: data.contact_person
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
        obj.image = data.image;
        obj.bank = data.bank;
        obj.account_number = data.account_number;
        obj.email = data.email;
        obj.contact_person = data.contact_person;
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
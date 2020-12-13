const Supplier = require('../models/supplier');

let supplierModel = {};

supplierModel.getAll = (callback) => {
    Supplier.findAll().then(result => {
        callback(null, result);
    });
};


supplierModel.insert = (data, callback) => {
    Supplier.create({
        name: data.name
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
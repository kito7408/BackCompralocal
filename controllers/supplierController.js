const Supplier = require('../models/supplier');

let supplierModel = {};

supplierModel.getAll = (callback) => {
    Supplier.findAll().then(result => {
        callback(null, result);
    });
};


supplierModel.insert = (data, callback) => {
    
    if (data.business_name == 'undefined' || data.business_name == undefined) {
        data.business_name = null;
    }
    if (data.ruc == 'undefined' || data.ruc == undefined) {
        data.ruc = null;
    }
    if (data.description == 'undefined' || data.description == undefined) {
        data.description = null;
    }
    if (data.bank == 'undefined' || data.bank == undefined) {
        data.bank = null;
    }
    if (data.account_number == 'undefined' || data.account_number == undefined) {
        data.account_number = null;
    }
    if (data.dni_contact == 'undefined' || data.dni_contact == undefined) {
        data.dni_contact = null;
    }
    
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
        departamento: data.departamento,
        provincia: data.provincia,
        distrito: data.distrito,
        direccion: data.direccion
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
        obj.departamento = data.departamento;
        obj.provincia = data.provincia;
        obj.distrito = data.distrito;
        obj.direccion = data.direccion;
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

supplierModel.findByName = (name, callback) => {
    Supplier.findOne({
        where: {
            name: name
        }
    }).then(result => {
        callback(null, result);
    });
}

supplierModel.findByCoded = (data, callback) => {
    Supplier.findOne({
        where: {
            name: data.name,
            email: data.email,
            contact_person: data.contact_person,
            id: data.id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = supplierModel;
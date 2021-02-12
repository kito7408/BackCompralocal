const Subscription = require('../models/subscription');

let subscriptionModel = {};

subscriptionModel.getAll = (callback) => {
    Subscription.findAll().then(result => {
        callback(null, result);
    });
};

subscriptionModel.insert = (data, callback) => {
    Subscription.create({
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        clientType: data.clientType,
        marca: data.marca,
        ruc: data.ruc,
        categoria: data.categoria,
        provincia: data.provincia,
        distrito: data.distrito
    }).then(result => {
        callback(null, result.get());
    });
};

subscriptionModel.update = (data, callback) => {
    Subscription.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.last_name = data.last_name;
        obj.email = data.email;
        obj.phone = data.phone;
        obj.clientType = data.clientType;
        obj.marca = data.marca;
        obj.ruc = data.ruc;
        obj.categoria = data.categoria;
        obj.provincia = data.provincia;
        obj.distrito = data.distrito;
        obj.save().then(result => callback(null, result.get()));
    });
};

subscriptionModel.delete = (id, callback) => {
    Subscription.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

subscriptionModel.findById = (id, callback) => {
    Subscription.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = subscriptionModel;
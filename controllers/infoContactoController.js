const InfoContacto = require('../models/infoContacto');

let infoContactoModel = {};

infoContactoModel.getAll = (callback) => {
    InfoContacto.findAll().then(result => {
        callback(null, result);
    });
};

infoContactoModel.insert = (data, callback) => {
    InfoContacto.create({
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        consulta: data.consulta
    }).then(result => {
        callback(null, result.get());
    });
};

infoContactoModel.update = (data, callback) => {
    InfoContacto.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.last_name = data.last_name;
        obj.email = data.email;
        obj.phone = data.phone;
        obj.consulta = data.consulta;
        obj.save().then(result => callback(null, result.get()));
    });
};

infoContactoModel.delete = (id, callback) => {
    InfoContacto.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

infoContactoModel.findById = (id, callback) => {
    InfoContacto.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = infoContactoModel;
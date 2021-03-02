// const User = require('../models/user');
const Direction = require('../models/direction');

let directionModel = {};

directionModel.getAll = (callback) => {
    Direction.findAll().then(result => {
        callback(null, result);
    });
};


directionModel.insert = (data, callback) => {
    Direction.create({
        departamento: data.departamento,
        provincia: data.provincia,
        distrito: data.distrito,
        ciudad: data.ciudad,
        direccion: data.direccion,
        referencia: data.referencia,
        userId: data.userId
    }).then(result => {
        callback(null, result.get());
    });
};

directionModel.update = (data, callback) => {
    Direction.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.departamento = data.departamento;
        obj.provincia = data.provincia;
        obj.distrito = data.distrito
        obj.ciudad = data.ciudad;
        obj.direccion = data.direccion;
        obj.referencia = data.referencia;
        obj.userId = data.userId;
        obj.save().then(result => callback(null, result.get()));
    });
};

directionModel.delete = (id, callback) => {
    Direction.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

directionModel.findById = (id, callback) => {
    Direction.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

directionModel.findByUser = (user_id, callback) => {
    Direction.findAll({
        where: {
            userId: user_id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = directionModel;
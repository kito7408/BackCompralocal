const UserType = require('../models/userType');

let typeModel = {};

typeModel.getAll = (callback) => {
    UserType.findAll().then(result => {
        callback(null, result);
    });
};


typeModel.insert = (data, callback) => {
    UserType.create({
        name: data.name
    }).then(result => {
        callback(null, result.get());
    });
};

typeModel.update = (data, callback) => {
    UserType.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.save().then(result => callback(null, result.get()));
    });
};

typeModel.delete = (id, callback) => {
    UserType.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

typeModel.findById = (id, callback) => {
    UserType.findOne({
        where: {
            id: data.id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = typeModel;
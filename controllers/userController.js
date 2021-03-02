const Direction = require('../models/direction');
const User = require('../models/user');
const UserType = require('../models/userType');

let userModel = {};

userModel.getAll = (callback) => {
    User.findAll({
        include: [UserType, Direction]
    }).then(users => {
        callback(null, users);
    });
};


userModel.insert = (data, callback) => {
    User.create({
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        docType: data.docType,
        docNum: data.docNum,
        direccion: data.direccion,
        provincia: data.provincia,
        distrito: data.distrito,
        ciudad: data.ciudad,
        phoneFijo: data.phoneFijo,
        phoneMovil: data.phoneMovil,
        userTypeId: data.userTypeId
    }).then(result => {
        callback(null, result.get());
    });
};

userModel.update = (data, callback) => {
    User.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.last_name = data.last_name;
        obj.email = data.email;
        obj.password = data.password;
        obj.docType = data.docType;
        obj.docNum = data.docNum;
        obj.direccion = data.direccion;
        obj.provincia = data.provincia;
        obj.distrito = data.distrito
        obj.ciudad = data.ciudad;
        obj.phoneFijo = data.phoneFijo;
        obj.phoneMovil = data.phoneMovil;
        obj.userTypeId = data.userTypeId;
        obj.save().then(result => callback(null, result.get()));
    });
};

userModel.delete = (id, callback) => {
    User.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

userModel.findById = (id, callback) => {
    User.findOne({
        where: {
            id: id
        },
        include: [UserType, Direction]
    }).then(result => {
        callback(null, result);
    });
}

userModel.findByEmail = (email, callback) => {
    User.findOne({
        where: {
            email: email
        },
        include: [UserType, Direction]
    }).then(result => {
        callback(null, result);
    });
}

userModel.login = (userData, callback) => {
    User.findOne({
        where:{
            email: userData.email,
            password: userData.password
        },
        include: [UserType, Direction]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = userModel;
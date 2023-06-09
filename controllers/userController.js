const Direction = require('../models/direction');
const User = require('../models/user');
const UserType = require('../models/userType');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const MailController = require('./mailController');

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
        where: {
            email: userData.email
            // password: userData.password
        },
        include: [UserType, Direction]
    }).then(user => {
        if (user) {
            bcrypt.compare(userData.password, user.dataValues.password, function (err, match) {
                // result == true
                if (match) {
                    jwt.sign(user.dataValues, CONFIG.SECRET_TOKEN, function (error, token) {
                        if (error) {
                            callback(error);
                        } else {
                            callback(null, { user, token });
                        }
                    });
                } else {
                    console.log(err);
                    callback(err);
                }
            });
        } else {
            callback("no existe usuario con ese correo");
        }
    }, error => {
        callback(error);
    });
}


userModel.loginSocialMedia = (email, callback) => {
    User.findOne({
        where: {
            email: email
        },
        include: [UserType, Direction]
    }).then(user => {
        console.log(user);
        jwt.sign(user.dataValues, CONFIG.SECRET_TOKEN, function (error, token) {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                callback(null, { user, token });
            }
        });
    });
}

userModel.newPassStep1 = (email, callback) => {
    User.findOne({
        where: {
            email: email
        },
        include: [UserType, Direction]
    }).then(user => {

        var tokenURL = Buffer.from(user.dataValues.name + '-/' + email + '-/' + user.dataValues.docNum + '-/' + user.dataValues.password).toString('base64');

        dataSend = {
            template: "CLMailNewPassTemplate",
            sendMail: email,
            token: tokenURL,
            user: user.dataValues.name
        }

        MailController.sendTemplateEmail(dataSend).then(res => {
            callback(null, res);
        });
    });
}

userModel.newPassStep2 = (data, newPass, callback) => {
    User.findOne({
        where: {
            name: data.name,
            email: data.email,
            docNum: data.dni,
            password: data.pass
        },
        include: [UserType, Direction]
    }).then(user => {
        if (user) {
            user.password = newPass;
            user.save().then(result => callback(null, result.get()));
        } else {
            callback("el usuario no se ha encontrado");
        }
    });
}

module.exports = userModel;
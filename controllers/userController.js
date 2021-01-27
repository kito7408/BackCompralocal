const User = require('../models/user');
const UserType = require('../models/userType');

let userModel = {};

userModel.getAll = (callback) => {
    User.findAll({
        include: [UserType]
    }).then(users => {
        callback(null, users);
    });
};


userModel.insert = (data, callback) => {
    User.create({
        name: data.name,
        username: data.username,
        password: data.password,
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
        obj.username = data.username;
        obj.password = data.password;
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
        include: [UserType]
    }).then(result => {
        callback(null, result);
    });
}

userModel.findByUsername = (username, callback) => {
    console.log(username);
    User.findOne({
        where: {
            username: username
        },
        include: [UserType]
    }).then(result => {
        callback(null, result);
    });
}

userModel.login = (userData, callback) => {
    User.findOne({
        where:{
            username: userData.username,
            password: userData.password
        },
        include: [UserType]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = userModel;
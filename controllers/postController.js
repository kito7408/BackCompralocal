const User = require('../models/user');
const Post = require('../models/post')

let postModel = {};

postModel.getAll = (callback) => {
    Post.findAll({
        include: [User]
    }).then(data => {
        callback(null, data);
    });
};


postModel.insert = (data, callback) => {
    Post.create({
        title: data.title,
        content: data.content,
        image: data.image,
        userId: data.userId
    }).then(result => callback(null, result.get()));
};

postModel.update = (data, callback) => {
    Post.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.title = data.title;
        obj.content = data.content;
        obj.image = data.image;
        obj.userId = data.userId;
        obj.save().then(result => callback(null, result.get()));
    });
};

postModel.delete = (id, callback) => {
    Post.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

postModel.findById = (id, callback) => {
    Post.findOne({
        where: {
            id: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

postModel.findByUser = (id, callback) => {
    Post.findAll({
        where: {
            userId: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = postModel;
const User = require('../models/user');
const Notice = require('../models/notice')

let noticeModel = {};

noticeModel.getAll = (callback) => {
    Notice.findAll({
        include: [User]
    }).then(data => {
        callback(null, data);
    });
};


noticeModel.insert = (data, callback) => {
    Notice.create({
        title: data.title,
        content: data.content,
        image: data.image
    }).then(result => callback(null, result.get()));
};

noticeModel.update = (data, callback) => {
    Notice.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.title = data.title;
        obj.content = data.content;
        obj.image = data.image;
        obj.save().then(result => callback(null, result.get()));
    });
};

noticeModel.delete = (id, callback) => {
    Notice.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

noticeModel.findById = (id, callback) => {
    Notice.findOne({
        where: {
            id: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

noticeModel.findByUser = (id, callback) => {
    Notice.findAll({
        where: {
            userId: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = noticeModel;
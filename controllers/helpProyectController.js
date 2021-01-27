const HelpProyect = require('../models/helpProyect');

let helpModel = {};

helpModel.getAll = (callback) => {
    HelpProyect.findAll().then(result => {
        callback(null, result);
    });
};

helpModel.insert = (data, callback) => {
    HelpProyect.create({
        name: data.name
    }).then(result => {
        callback(null, result.get());
    });
};

helpModel.update = (data, callback) => {
    HelpProyect.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.save().then(result => callback(null, result.get()));
    });
};

helpModel.delete = (id, callback) => {
    HelpProyect.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

helpModel.findById = (id, callback) => {
    HelpProyect.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = helpModel;
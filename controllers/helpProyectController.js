const HelpProyect = require('../models/helpProyect');

let helpModel = {};

helpModel.getAll = (callback) => {
    HelpProyect.findAll().then(result => {
        callback(null, result);
    });
};

helpModel.insert = (data, callback) => {
    HelpProyect.create({
        name: data.name,
        num: data.num,
        money: data.money
    }).then(result => {
        callback(null, result.get());
    });
};

helpModel.update = (data, callback) => {
    console.log(data);
    HelpProyect.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.money += data.money;
        if (data.id == 1) { //reforestacion
            obj.num = Math.trunc(obj.money/10);
        } else {
            obj.num = data.num;
        }
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
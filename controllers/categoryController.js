const Category = require('../models/category');
// const SubCategory = require('../models/subCategory');

let categoryModel = {};

categoryModel.getAll = (callback) => {
    Category.findAll().then(result => {
        callback(null, result);
    });
};

categoryModel.insert = (data, callback) => {
    Category.create({
        name: data.name
    }).then(result => {
        callback(null, result.get());
    });
};

categoryModel.update = (data, callback) => {
    Category.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.save().then(result => callback(null, result.get()));
    });
};

categoryModel.delete = (id, callback) => {
    Category.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

categoryModel.findById = (id, callback) => {
    Category.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = categoryModel;
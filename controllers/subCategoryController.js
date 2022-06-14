const SubCategory = require('../models/subCategory');
// const Category = require('../models/category');

let subCategoryModel = {};

subCategoryModel.getAll = (callback) => {
    SubCategory.findAll().then(result => {
        callback(null, result);
    });
};

subCategoryModel.insert = (data, callback) => {
    SubCategory.create({
        name: data.name,
        categoryId: data.categoryId
    }).then(result => {
        callback(null, result.get());
    });
};

subCategoryModel.update = (data, callback) => {
    SubCategory.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.categoryId = data.categoryId;
        obj.save().then(result => callback(null, result.get()));
    });
};

subCategoryModel.delete = (id, callback) => {
    SubCategory.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

subCategoryModel.findById = (id, callback) => {
    SubCategory.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

subCategoryModel.findByCategoryId = (id, callback) => {
    SubCategory.findAll({
        where: {
            categoryId: id
        }
    }).then(result => {
        callback(null, result);
    });
}

module.exports = subCategoryModel;
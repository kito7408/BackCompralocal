const ProdMod = require('../models/productModel');

let prodModModel = {};

prodModModel.getAll = (callback) => {
    ProdMod.findAll().then(result => {
        callback(null, result);
    });
};


prodModModel.insert = (data, callback) => {
    ProdMod.create({
        name: data.name,
        image: data.image,
        prodImgNum: data.prodImgNum,
        productId: data.productId
    }).then(result => {
        callback(null, result.get());
    });
};

prodModModel.update = (data, callback) => {
    ProdMod.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.image = data.image;
        obj.prodImgNum = data.prodImgNum;
        obj.productId = data.productId;
        obj.save().then(result => callback(null, result.get()));
    });
};

prodModModel.delete = (id, callback) => {
    ProdMod.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

prodModModel.findById = (id, callback) => {
    ProdMod.findOne({
        where: {
            id: id
        }
    }).then(result => {
        callback(null, result);
    });
}

prodModModel.findByProduct = (product_id, callback) => {
    ProdMod.findAll({
        where: {
            productId: product_id
        }
    }).then(result => {
        callback(null, result);
    });
}

prodModModel.saveMany = async (dataArray, callback) => {
    ProdMod.bulkCreate(dataArray).then(result => {
        callback(null, result);
    });
}

module.exports = prodModModel;
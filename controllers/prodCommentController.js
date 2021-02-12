const ProdComment = require('../models/prodComment');
const Product = require('../models/product');
const User = require('../models/user');

let prodCommentModel = {};

prodCommentModel.getAll = (callback) => {
    ProdComment.findAll({
        include: [User]
    }).then(result => {
        callback(null, result);
    });
};

prodCommentModel.insert = (data, callback) => {
    ProdComment.create({
        content: data.content,
        stars: data.stars,
        userId: data.userId,
        productId: data.productId
    }).then(result => {
        callback(null, result.get());
    });
};

prodCommentModel.update = (data, callback) => {
    ProdComment.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.content = data.content;
        obj.stars = data.stars;
        obj.userId = data.userId;
        obj.productId = data.productId;
        obj.save().then(result => callback(null, result.get()));
    });
};

prodCommentModel.delete = (id, callback) => {
    ProdComment.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

prodCommentModel.findById = (id, callback) => {
    ProdComment.findOne({
        where: {
            id: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

prodCommentModel.findByUserId = (id, callback) => {
    ProdComment.findAll({
        where: {
            userId: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

prodCommentModel.findByProductId = (id, callback) => {
    ProdComment.findAll({
        where: {
            productId: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

prodCommentModel.findByUserAndProductId = (user_Id, prod_Id, callback) => {
    ProdComment.findAll({
        where: {
            userId: user_Id,
            productId: prod_Id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = prodCommentModel;
const PageReview = require('../models/pageReview');
const User = require('../models/user');

let pageReviewModel = {};

pageReviewModel.getAll = (callback) => {
    PageReview.findAll({
        include: [User]
    }).then(result => {
        callback(null, result);
    });
};

pageReviewModel.insert = (data, callback) => {
    PageReview.create({
        stars: data.stars,
        userId: data.userId
    }).then(result => {
        callback(null, result.get());
    });
};

pageReviewModel.update = (data, callback) => {
    PageReview.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.stars = data.stars;
        obj.userId = data.userId;
        obj.save().then(result => callback(null, result.get()));
    });
};

pageReviewModel.delete = (id, callback) => {
    PageReview.findOne({
        where: {
            id: id
        },
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

pageReviewModel.findById = (id, callback) => {
    PageReview.findOne({
        where: {
            id: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

pageReviewModel.findByUserId = (id, callback) => {
    PageReview.findOne({
        where: {
            userId: id
        },
        include: [User]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = pageReviewModel;
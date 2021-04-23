var Sequelize = require('sequelize');
var Op = Sequelize.Op;

const Product = require('../models/product');
const Category = require('../models/category');
const Supplier = require('../models/supplier');
const Cart = require('../models/cart');
const ProdMod = require('../models/productModel');
const DelZone = require('../models/deliveryZone');

let productModel = {};

productModel.getAll = (callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: Supplier,
            where: {
                available: true
            }
        }, ProdMod, DelZone],
        where: {
            available: true
        },
        order: Sequelize.literal('rand()')
    }).then(result => {
        callback(null, result);
    });
};

productModel.insert = (data, callback) => {
    if (data.toProv == 'undefined') {
        data.toProv = false;
    }
    if (data.isOffer == 'undefined') {
        data.isOffer = false;
    }
    if (data.priceOffer == 'undefined') {
        data.priceOffer = '0';
    }
    if (data.description == 'undefined') {
        data.description = null;
    }
    // console.log(data);
    Product.create({
        name: data.name,
        description: data.description,
        price: data.price,
        numSellOnWeek: data.numSellOnWeek,
        isTrent: data.isTrent,
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        isOffer: data.isOffer,
        priceOffer: data.priceOffer,
        unit: data.unit,
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
        image4: data.image4,
        image5: data.image5,
        toProv: data.toProv,
        available: true,
        daysToSend: data.daysToSend,
        numDaysToSend: data.numDaysToSend
    }).then(result => {
        callback(null, result.get());
    });
};

productModel.update = (data, callback) => {
    // Product.findOne({
    //     where: {
    //         id: data.id
    //     }
    // }).then(obj => {
    //     obj.name = data.name;
    //     obj.description = data.description;
    //     obj.price = data.price;
    //     obj.image = data.image;
    //     obj.numSellOnWeek = data.numSellOnWeek;
    //     obj.isTrent = data.isTrent;
    //     obj.categoryId = data.categoryId;
    //     obj.subCategoryId = data.subCategoryId;
    //     obj.supplierId = data.supplierId;
    //     obj.isOffer = data.isOffer;
    //     obj.priceOffer = data.priceOffer;
    //     obj.unit = data.unit;
    //     obj.save().then(result => callback(null, result.get()));
    // });

    Product.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.available = false;
        obj.save().then(res => {
            Product.create({
                name: data.name,
                description: data.description,
                price: data.price,
                image: data.image,
                numSellOnWeek: data.numSellOnWeek,
                isTrent: data.isTrent,
                categoryId: data.categoryId,
                supplierId: data.supplierId,
                isOffer: data.isOffer,
                priceOffer: data.priceOffer,
                unit: data.unit,
                toProv: data.toProv,
                available: true,
                daysToSend: data.daysToSend,
                numDaysToSend: data.numDaysToSend
            }).then(result => {
                callback(null, result.get());
            });
        });
    });
};

productModel.delete = (id, callback) => {
    Product.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.available = false;
        // obj.save().then(result => callback(null, result.get()));
        obj.save().then(result => {
            Cart.findAll({
                where: {
                    productId: id
                }
            }).then(async cartItems => {
                await cartItems.forEach(element => {
                    if (!element.isBuyed) {
                        element.isBuyed = true;
                        element.save();
                    }
                });
                callback(null, result.get());
            });
        });
        // obj.destroy().then(result => callback(null, result.get()));
    });
};

productModel.findById = (id, callback) => {
    Product.findOne({
        include: [{
            model: Category,
            as: 'category'
        }, 
        {
            model: Supplier,
            where: {
                available: true
            }
        }, ProdMod, DelZone],
        where: {
            id: id,
            available: true
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
};

productModel.findByCategory = (id, callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: Supplier,
            where: {
                available: true
            }
        }, ProdMod, DelZone],
        where: {
            categoryId: id,
            available: true
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

// productModel.findBySubCategory = (id, callback) => {
//     Product.findAll({
//         include: [{
//             model: Category,
//             as: 'category'
//         },
//         {
//             model: SubCategory,
//             as: 'subcategory'
//         },
//             Supplier],
//         where: {
//             subCategoryId: id,
//             available: true
//         },
//         order: [
//             ['id', 'DESC']
//         ]
//     }).then(result => {
//         callback(null, result);
//     });
// }

productModel.findBySupplier = (id, callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: Supplier,
            where: {
                available: true
            }
        }, ProdMod, DelZone],
        where: {
            supplierId: id,
            available: true
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

productModel.findBySearch = (searchText, callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: Supplier,
            where: {
                available: true
            }
        }, ProdMod, DelZone],
        where: {
            name: {
                [Op.like]: '%' + searchText + '%'
            },
            available: true
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

productModel.sortByBuys = (callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: Supplier,
            where: {
                available: true
            }
        }, ProdMod, DelZone],
        where: {
            available: true
        },
        order: [
            ['numSellOnWeek', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

productModel.updateSales = async (dataProds, callback) => {
    await dataProds.forEach(element => {
        Product.findOne({
            where: {
                id: element.prodId
            }
        }).then(obj => {
            obj.numSellOnWeek += element.cant;
            obj.save();
        });
    });
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
            Supplier],
        where: {
            available: true
        },
        order: Sequelize.literal('rand()')
    }).then(result => {
        callback(null, result);
    });
}

module.exports = productModel;
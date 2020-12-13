var Sequelize = require('sequelize');
var Op = Sequelize.Op;

const Product = require('../models/product');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const Supplier = require('../models/supplier');

let productModel = {};

productModel.getAll = (callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: SubCategory,
            as: 'subcategory'
        },
            Supplier],
        order: Sequelize.literal('rand()')
    }).then(result => {
        callback(null, result);
    });
};

productModel.insert = (data, callback) => {
    Product.create({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        numSellOnWeek: data.numSellOnWeek,
        isTrent: data.isTrent,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        supplierId: data.supplierId
    }).then(result => {
        callback(null, result.get());
    });
};

productModel.update = (data, callback) => {
    Product.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.name = data.name;
        obj.description = data.description;
        obj.price = data.price;
        obj.image = data.image;
        obj.numSellOnWeek = data.numSellOnWeek;
        obj.isTrent = data.isTrent;
        obj.categoryId = data.categoryId;
        obj.subCategoryId = data.subCategoryId;
        obj.supplierId = data.supplierId;
        obj.save().then(result => callback(null, result.get()));
    });
};

productModel.delete = (id, callback) => {
    Product.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

productModel.findById = (id, callback) => {
    Product.findOne({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: SubCategory,
            as: 'subcategory'
        },
            Supplier],
        where: {
            id: id
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
            model: SubCategory,
            as: 'subcategory'
        },
            Supplier],
        where: {
            categoryId: id
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

productModel.findBySubCategory = (id, callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: SubCategory,
            as: 'subcategory'
        },
            Supplier],
        where: {
            subCategoryId: id
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

productModel.findBySupplier = (id, callback) => {
    Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        },
        {
            model: SubCategory,
            as: 'subcategory'
        },
            Supplier],
        where: {
            supplierId: id
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
            model: SubCategory,
            as: 'subcategory'
        },
            Supplier],
        where: {
            name: {
                [Op.like]: '%' + searchText + '%'
            }
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

productModel.updateSales = async (dataProds, callback) => {
    await dataProds.forEach(element => {
        Product.findOne({
            include: [{
                model: Category,
                as: 'category'
            },
            {
                model: SubCategory,
                as: 'subcategory'
            },
                Supplier],
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
        {
            model: SubCategory,
            as: 'subcategory'
        },
            Supplier],
        where: {
            name: {
                [Op.like]: '%' + searchText + '%'
            }
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(result => {
        callback(null, result);
    });
}

module.exports = productModel;
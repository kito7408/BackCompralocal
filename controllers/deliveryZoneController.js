const DeliveryZone = require('../models/deliveryZone');

let delZoneModel = {};

delZoneModel.getAll = (callback) => {
    DeliveryZone.findAll().then(result => {

        result.districts = result.districts.split(',');

        callback(null, result);
    });
};


delZoneModel.insert = (data, callback) => {
    DeliveryZone.create(data).then(result => {
        callback(null, result.get());
    });
};

delZoneModel.update = (data, callback) => {
    DeliveryZone.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.price = data.price;
        obj.districts = data.districts;
        obj.productId = data.productId;
        obj.save().then(result => callback(null, result.get()));
    });
};

delZoneModel.updateFromProd = (dataArray, prodId, callback) => {
    DeliveryZone.findAll({
        where: {
            productId: prodId
        }
    }).then(async result => {
        await result.forEach(element => {
            element.destroy();
        });

        if (dataArray.length > 0) {
            DeliveryZone.bulkCreate(dataArray).then(res => {
                callback(null, res);
            });
        } else {
            callback(null, "ahora el producto no tiene modelos");
        }
    });
}

delZoneModel.delete = (id, callback) => {
    DeliveryZone.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

delZoneModel.findById = (id, callback) => {
    DeliveryZone.findOne({
        where: {
            id: id
        }
    }).then(result => {
        result.districts = result.districts.split(',');
        callback(null, result);
    });
}

delZoneModel.findByProduct = (product_id, callback) => {
    DeliveryZone.findAll({
        where: {
            productId: product_id
        }
    }).then(result => {
        result.districts = result.districts.split(',');
        callback(null, result);
    });
}

delZoneModel.saveMany = async (dataArray, callback) => {
    DeliveryZone.bulkCreate(dataArray).then(result => {
        callback(null, result);
    });
}

module.exports = delZoneModel;
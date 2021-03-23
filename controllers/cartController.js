const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const fetch = require('node-fetch');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

// const privatekey = 'sk_test_f781878eda2badcd';   //mia
const privatekey = 'sk_live_lVuRy3YvwDnjOz6m';
let cartModel = {};

cartModel.getAll = (callback) => {
    Cart.findAll({
        include: [Product, User],
        where: {
            isBuyed: false
        }
    }).then(data => {
        callback(null, data);
    });
};

cartModel.insert = (data, callback) => {
    Cart.findOne({
        where: {
            userId: data.userId,
            productId: data.productId,
            isBuyed: false
        }
    }).then(obj => {
        if (obj) {
            obj.quantity += data.quantity;
            obj.totalPrice += data.totalPrice;
            obj.save().then(result => callback(null, result.get()));
        } else {
            Cart.create({
                quantity: data.quantity,
                totalPrice: data.totalPrice,
                isBuyed: data.isBuyed,
                userId: data.userId,
                productId: data.productId,
                orderId: data.orderId
            }).then(result => {
                callback(null, result.get());
            });
        }
    });
};

cartModel.update = (data, callback) => {
    Cart.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.quantity = data.quantity;
        obj.totalPrice = data.totalPrice;
        obj.isBuyed = data.isBuyed;
        obj.userId = data.userId;
        obj.productId = data.productId;
        obj.orderId = data.orderId;
        obj.save().then(result => callback(null, result.get()));
    });
};

cartModel.delete = (id, callback) => {
    Cart.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

cartModel.findById = (id, callback) => {
    Cart.findOne({
        where: {
            id: id
        },
        include: [Product, User]
    }).then(result => {
        callback(null, result);
    });
}

cartModel.findByUser = (id, callback) => {
    Cart.findAll({
        where: {
            userId: id,
            isBuyed: false
        },
        include: [Product, User]
    }).then(result => {
        callback(null, result);
    });
}

cartModel.findWhereIsInAnyOrder = (callback) => {
    Cart.findAll({
        where: {
            orderId: {
                [Op.notLike]: null
            }
        },
        include: [Product, User]
    }).then(result => {
        callback(null, result);
    });
}

cartModel.findByOrder = (id, callback) => {
    Cart.findAll({
        where: {
            orderId: id
        },
        include: [Product, User]
    }).then(result => {
        callback(null, result);
    });
}

cartModel.saveMany = async (cartArray, callback) => {
    cartNoRepeat = [];

    var bar = new Promise((resolve, reject) => {
        cartArray.forEach((element, index, array) => {
            Cart.findOne({
                where: {
                    userId: element.userId,
                    productId: element.productId,
                    isBuyed: false
                }
            }).then(obj => {
                if (obj) {
                    obj.quantity += element.quantity;
                    obj.totalPrice += element.totalPrice;
                    obj.save();
                } else {
                    cartNoRepeat.push(element);
                }
                if (index === array.length -1) resolve();
            });
        });
    });
    
    bar.then(() => {
        if (cartNoRepeat.length > 0) {
            Cart.bulkCreate(cartNoRepeat).then(() => {
                Cart.findAll({
                    where: {
                        userId: cartArray[0].userId,
                        isBuyed: false
                    },
                    include: [Product, User]
                }).then(result => {
                    callback(null, result);
                });
            });
        } else {
            Cart.findAll({
                where: {
                    userId: cartArray[0].userId,
                    isBuyed: false
                },
                include: [Product, User]
            }).then(result => {
                callback(null, result);
            });
        }
    });
}

cartModel.buyCart = (user_id, order_id, callback) => {  //convierte todos los items en el carrito de un usuario (que esten con isBuyed = false) en isBuyed = true, tambien se le asigna una orden
    Cart.findAll({
        where: {
            userId: user_id,
            isBuyed: false
        }
    }).then(cartList => {
        cartList.forEach(item => {
            item.isBuyed = true;
            item.orderId = order_id;
            item.save();
        });

        callback(null, cartList);
    });
};

// Información adicional a la creacion del cargo
// {
//     "amount": 1000,
//     "antifraud_details": {
//       "address": "AV LIMA 123",
//       "address_city": "LIMA",
//       "country_code": "PE",
//       "first_name": "CULQI",
//       "last_name": "TEST",
//       "phone_number": 89562659
//     },
//     "capture": true,
//     "currency_code": "PEN",
//     "description": "VENTA PRUEBA"
//     "email": "TEST@CULQI",
//     "installments": 1,
//     "metadata": {"ORDER_ID": "123"},
//     "source_id": "tkn_test_vzMuTHoueOMlgUPj"
//   }

cartModel.culqi = async (data, callback) => {
    // console.log("data llegada", data);

    const response = await fetch('https://api.culqi.com/v2/charges', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + privatekey
        },
        body: JSON.stringify(data)
    });
    const myJson = await response.json();

    // console.log("json", myJson);
    callback(null, myJson);
};

cartModel.culqiCustomer = async (data, callback) => {
    // console.log("customer ",data);
    const response = await fetch('https://api.culqi.com/v2/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + privatekey
        },
        body: JSON.stringify(data)
    });
    const myJson = await response.json();

    // console.log("json", myJson);
    callback(null, myJson);
};

cartModel.culqiCard = async (data, callback) => {
    // console.log("card ",data);
    const response = await fetch('https://api.culqi.com/v2/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + privatekey
        },
        body: JSON.stringify(data)
    });
    const myJson = await response.json();

    // console.log("json", myJson);
    callback(null, myJson);
};

cartModel.culqiSubscription = async (data, callback) => {
    // console.log("sub ",data);
    const response = await fetch('https://api.culqi.com/v2/subscriptions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + privatekey
        },
        body: JSON.stringify(data)
    });
    const myJson = await response.json();

    // console.log("json", myJson);
    callback(null, myJson);
};

module.exports = cartModel;
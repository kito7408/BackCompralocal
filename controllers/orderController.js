const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
const Supplier = require('../models/supplier');
const HelpProyect = require('../models/helpProyect');
const Direction = require('../models/direction');
const MailController = require('./mailController');

let orderModel = {};

orderModel.getAll = (callback) => {
    Order.findAll({
        include: [{
            model: Cart,
            include: [{
                model: Product,
                include: [Supplier]
            }]
        }, User, HelpProyect, Direction],
        order: [
            ['id', 'DESC']
        ]
    }).then(data => {
        callback(null, data);
    });
};

orderModel.insert = (data, callback) => {
    // console.log("ord",data);
    Order.create({
        num: data.num,
        deliveryMethod: data.deliveryMethod,
        paymentMethod: data.paymentMethod,
        paymentState: data.paymentState,
        productsPrice: data.productsPrice,
        deliveryPrice: data.deliveryPrice,
        totalPrice: data.totalPrice,
        cupon: data.cupon,
        coment: data.coment,
        userId: data.userId,
        helpproyectId: data.helpProyectId,
        directionId: data.directionId
    }).then(result => {
        callback(null, result.get());
    });
};

orderModel.update = (data, callback) => {
    Order.findOne({
        where: {
            id: data.id
        }
    }).then(obj => {
        obj.num = data.num;
        obj.deliveryMethod = data.deliveryMethod;
        obj.paymentMethod = data.paymentMethod;
        obj.paymentState = data.paymentState;
        obj.productsPrice = data.productsPrice;
        obj.deliveryPrice = data.deliveryPrice;
        obj.totalPrice = data.totalPrice;
        obj.cupon = data.cupon;
        obj.coment = data.coment;
        obj.userId = data.userId;
        obj.helpproyectId = data.helpProyectId;
        obj.directionId = data.directionId;
        obj.save().then(result => callback(null, result.get()));
    });
};

orderModel.delete = (id, callback) => {
    Order.findOne({
        where: {
            id: id
        }
    }).then(obj => {
        obj.destroy().then(result => callback(null, result.get()));
    });
};

orderModel.findById = (id, callback) => {
    Order.findOne({
        where: {
            id: id
        },
        include: [{
            model: Cart,
            include: [{
                model: Product,
                include: [Supplier]
            }]
        }, User, HelpProyect, Direction]
    }).then(result => {
        callback(null, result);
    });
}

orderModel.findByUser = (id, callback) => {
    Order.findAll({
        where: {
            userId: id
        },
        include: [{
            model: Cart,
            include: [{
                model: Product,
                include: [Supplier]
            }]
        }, User, HelpProyect, Direction]
    }).then(result => {
        callback(null, result);
    });
}

orderModel.sendUserMail = async (data, callback) => {
    // console.log("dataUser", data);
    if (!data.cupon) {
        data.cupon = '';
    }
    if (!data.coment) {
        data.coment = '';
    }

    data.template = "CLMailUserTemplate";
    data.sendMail = data.user.email;
    if (data.paymentMethod == 'culqi') {
        data.pagado = true
    } else {
        data.pagado = false;
    }
    MailController.sendTemplateEmail(data).then(res => {
        callback(null, res);
    });
}

orderModel.sendAdminMail = async (data, callback) => {

    if (!data.cupon) {
        data.cupon = '';
    }
    if (!data.coment) {
        data.coment = '';
    }

    data.template = "CLMailAdminTemplate";
    data.sendMail = "compralocal@compralocal.pe";

    data.carts.forEach(element => {
        element.helpProyPrice = element.totalPrice * 0.01;
        element.helpProyPrice = Math.round((element.helpProyPrice) * 100) / 100;
        element.culqiPrice = element.totalPrice * 0.06;
        element.culqiPrice = Math.round((element.culqiPrice) * 100) / 100;
        element.supplierPrice = element.totalPrice - (element.helpProyPrice + element.culqiPrice);  //93%
        element.supplierPrice = Math.round((element.supplierPrice) * 100) / 100;
    });

    MailController.sendTemplateEmail(data).then(res => {
        callback(null, res);
    });
}

orderModel.sendPagoPendienteMail = async (data, callback) => {
    // console.log("dataUser", data);
    if (!data.cupon) {
        data.cupon = '';
    }
    if (!data.coment) {
        data.coment = '';
    }

    data.template = "CLMailPagoPendienteTemplate";
    data.sendMail = data.user.email;
    if (data.paymentMethod == 'transferencia') {
        data.paymentMethodString = 'transferencia bancaria';
        data.paymentAccount = 'BCP CTA. CTE. Soles: 193-25849940-48 / CCI: 00219300258499404818';
    } else {
        data.paymentMethodString = 'YAPE';
        data.paymentAccount = '973-853-443';
    }
    MailController.sendTemplateEmail(data).then(res => {
        callback(null, res);
    });
}

orderModel.sendThanksUserMail = async (data, callback) => {
    // console.log("dataUser", data);
    data.template = "CLMailThanksUserTemplate";
    data.sendMail = data.user.email;
    MailController.sendTemplateEmail(data).then(res => {
        callback(null, res);
    });
}

orderModel.sendNewSuppMail = async (data, callback) => {
    // console.log("dataUser", data);

    dataSend = {
        template: "CLMailNewSuppTemplate",
        sendMail: data.email,
        token: data.token,
        contact_person: data.contact_person
    }
    // console.log(dataSend);
    MailController.sendTemplateEmail(dataSend).then(res => {
        callback(null, res);
    });
}

// orderModel.findByOrderState = (id, callback) => {
//     Order.findAll({
//         where: {
//             orderStateId: id
//         },
//         include: [Cart, User]
//     }).then(result => {
//         callback(null, result);
//     });
// }

module.exports = orderModel;
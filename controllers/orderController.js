const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const Supplier = require('../models/supplier');
const HelpProyect = require('../models/helpProyect');

const SES_CONFIG = {
    accessKeyId: 'AKIA3WGAH3552HY4WGUD',
    secretAccessKey: '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',
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let orderModel = {};

let sendEmail = (recipientEmail, name) => {
    //sendEmail("Cristopher.lizandro.11@gmail.com", "test Compralocal");

    let params = {
        Source: 'admin@compralocal.pe',
        Destination: {
            ToAddresses: [
                recipientEmail
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: 'This is the body <br> of my email!',
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Hola, ${name}!`,
            }
        },
    };
    return AWS_SES.sendEmail(params).promise();
};

let sendTemplateEmail = (data) => {
    // console.log(sendTemplateEmail("Cristopher.lizandro.11@gmail.com"));
    let params = {
        Source: 'Admin Compralocal <admin@compralocal.pe>',
        Template: data.template,
        Destination: {
            ToAddresses: [
                data.sendMail
            ]
        },
        TemplateData: JSON.stringify(data)
    };
    return AWS_SES.sendTemplatedEmail(params).promise();
};


orderModel.getAll = (callback) => {
    Order.findAll({
        include: [{
            model: Cart,
            include: [{
                model: Product,
                include: [Supplier]
            }]
        }, User, HelpProyect],
        order: [
            ['id', 'DESC']
        ]
    }).then(data => {
        callback(null, data);
    });
};

orderModel.insert = (data, callback) => {
    console.log("ord",data);
    Order.create({
        num: data.num,
        totalPrice: data.totalPrice,
        userId: data.userId,
        helpproyectId: data.helpProyectId
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
        obj.totalPrice = data.totalPrice;
        obj.userId = data.userId;
        obj.helpproyectId = data.helpProyectId;
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
        }, User, HelpProyect]
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
        }, User, HelpProyect]
    }).then(result => {
        callback(null, result);
    });
}

orderModel.sendUserMail = async (data, callback) => {
    console.log("dataUser", data);
    data.template = "CLMailUserTemplate";
    data.sendMail = data.user.username;
    sendTemplateEmail(data).then(res => {
        callback(null, res);
    });
}

orderModel.sendAdminMail = async (data, callback) => {
    console.log("dataAdmin", data);
    data.template = "CLMailAdminTemplate";
    data.sendMail = "admin@compralocal.pe";

    data.carts.forEach(element => {
        element.supplierPrice = element.totalPrice * 0.93;
        element.supplierPrice = Math.round((element.supplierPrice + Number.EPSILON) * 100) / 100;
        element.helpProyPrice = element.totalPrice * 0.01;
        element.helpProyPrice = Math.round((element.helpProyPrice + Number.EPSILON) * 100) / 100;
        element.culqiPrice = element.totalPrice * 0.06;
        element.culqiPrice = Math.round((element.culqiPrice + Number.EPSILON) * 100) / 100;
    });

    sendTemplateEmail(data).then(res => {
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
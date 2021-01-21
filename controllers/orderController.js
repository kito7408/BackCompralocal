const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
var nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: 'AKIA3WGAH3552HY4WGUD',
    secretAccessKey: '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',
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let orderModel = {};

let sendEmail = (recipientEmail, name) => {
    console.log("entra email");
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
            Data: 'This is the body of my email!',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

orderModel.getAll = (callback) => {

    // console.log(sendEmail("ooto@simulator.amazonses.com", "test Compralocal"));

    // var transporter = nodemailer.createTransport({
    //     host: "http://compralocal-pe.awsapps.com/mail",
    //     post: 587,
    //     secure: false,
    //     auth: {
    //         user: "admin",
    //         pass: "c0mpr4l0c4l\-/12358"
    //     }
    // });

    // var mailOptions = {
    //     from: "CompraLocal",
    //     to: "Cristopher.lizandro.11@gmail.com",
    //     subject: "mail test nodejs",
    //     text: "llego mail test nodejs"
    // }

    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.log("error en mail");
    //     } else {
    //         console.log("mail enviado");
    //     }
    // });
    Order.findAll({
        include: [{
            model: Cart,
            include: [Product]
          }, User]
    }).then(data => {
        callback(null, data);
    });
};

orderModel.insert = (data, callback) => {


    Order.create({
        num: data.num,
        totalPrice: data.totalPrice,
        userId: data.userId
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
            include: [Product]
          }, User]
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
            include: [Product]
          }, User]
    }).then(result => {
        callback(null, result);
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
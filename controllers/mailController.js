const AWS = require('aws-sdk');
const CONFIG = require('../config/config');

const SES_CONFIG = {
    accessKeyId: CONFIG.AWS_SES_accessKeyId,
    secretAccessKey: CONFIG.AWS_SES_secretAccessKey,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let mailFunctions = {};

mailFunctions.sendEmail = (sendToEmail, subject, message) => {
    let params = {
        Source: 'admin@compralocal.pe',
        Destination: {
            ToAddresses: [
                sendToEmail
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `${message}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `${subject}`,
            }
        },
    };
    return AWS_SES.sendEmail(params).promise();
};

mailFunctions.sendTemplateEmail = (data) => {
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

module.exports = mailFunctions;
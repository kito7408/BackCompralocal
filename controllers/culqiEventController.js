const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: 'AKIA3WGAH3552HY4WGUD',
    secretAccessKey: '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',
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let culqiEventsFunctions = {};

let sendEmail = (sendToEmail, subject, message) => {
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

culqiEventsFunctions.detectEvent = (data, callback) => {

    var dataStr = JSON.stringify(data);
    var mailDest = 'compralocal@compralocal.pe';
    var subject = '';
    var message = `La información retornada por culqi es: 
    ${dataStr}
    `;
    var sendMail = false;

    switch (data.type) {
        case 'suscripciones.creadas':
            subject = 'CULQI: Suscripciones creadas';
            sendMail = true;
            break;

        case 'charge.creation.succeeded':
            subject = 'CULQI: Se ha creado un cargo con éxito';
            sendMail = true;
            break;

        case 'charge.creation.failed':
            subject = 'CULQI: Ha ocurrido un error al crear un cargo';
            sendMail = true;
            break;

        case 'customer.creation.succeeded':
            subject = 'CULQI:  Se ha creado un cliente con éxito';
            sendMail = true;
            break;

        case 'customer.creation.failed':
            subject = 'CULQI: Ha ocurrido un error al crear un cliente';
            sendMail = true;
            break;

        case 'customer.delete.succeeded':
            subject = 'CULQI: Se ha eliminado un cliente con éxito';
            sendMail = true;
            break;

        case 'customer.delete.failed':
            subject = 'CULQI: Ha ocurrido un error al eliminar un cliente';
            sendMail = true;
            break;

        case 'subscription.creation.succeeded':
            subject = 'CULQI: Se ha creado una suscripción con éxito';
            sendMail = true;
            break;

        case 'subscription.creation.failed':
            subject = 'CULQI: Ha ocurrido un error al crear una suscripción';
            sendMail = true;
            break;

        case 'subscription.cancel.succeeded':
            subject = 'CULQI: Se ha cancelado una suscripción correctamente';
            sendMail = true;
            break;

        case 'subscription.cancel.failed':
            subject = 'CULQI: Ha ocurrido un error al cancelar una suscripción';
            sendMail = true;
            break;

        case 'subscription.charge.succeeded':
            subject = 'CULQI: Se ha realizado el cargo de una suscripción correctamente';
            sendMail = true;
            break;

        case 'subscription.charge.failed':
            subject = 'CULQI: Ha ocurrido un error al crear el cargo de una suscripción';
            sendMail = true;
            break;

        case 'subscription.trial.end':
            subject = 'CULQI: Ha concluido los días de prueba de una suscripción';
            sendMail = true;
            break;

        default:
            break;
    }

    if (sendMail) {
        sendEmail(mailDest, subject, message).then(res => {
            callback();
        });
    } else {
        callback();
    }

};

module.exports = culqiEventsFunctions;
const CONFIG = require('../config/config');
const multer = require('multer');
const AWS = require('aws-sdk');

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
});

let s3Functions = {};

s3Functions.s3 = new AWS.S3({
    accessKeyId: CONFIG.AWS_S3_accessKeyId,
    secretAccessKey: CONFIG.AWS_S3_secretAccessKey
});

s3Functions.upload = multer({storage: storage});

module.exports = s3Functions;
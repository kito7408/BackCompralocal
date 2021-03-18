const Supplier = require('../controllers/supplierController');
const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIA3WGAH3554DJMT2ZM',
    secretAccessKey: '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'
});

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
});

const upload = multer({storage: storage});

module.exports = function (app) {

    app.get('/suppliers', (req, res) => {
        Supplier.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/suppliers/:id', (req, res) => {
        Supplier.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/suppliers/name/:name', (req, res) => {
        Supplier.findByName(req.params.name, (err, data) => {
            res.json(data);
        })
    });

    app.put('/suppliers/coded', (req, res) => {
        Supplier.findByCoded(req.body, (err, data) => {
            res.json(data);
        })
    });

    app.post('/suppliers', upload.single('image'), (req, res) => {
        var filename = '';

        if (req.file) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            filename = date + req.file.originalname;

            var params = {
                Bucket: 'compralocal-images/suppliers',
                Key: filename,
                Body: req.file.buffer
            }

            s3.upload(params, (error, data) => {
                if(error){
                    res.status(500).json({
                        success: false,
                        msg: 'Error',
                        err: error
                    })
                }
            });            
        } else {
            filename = null;
        }

        const suppData = {
            name: req.body.name,
            business_name: req.body.business_name,
            ruc: req.body.ruc,
            image: filename,
            description: req.body.description,
            bank: req.body.bank,
            account_number: req.body.account_number,
            cci_account_number: req.body.cci_account_number,
            email: req.body.email,
            contact_person: req.body.contact_person,
            dni_contact: req.body.dni_contact,
            phone_contact: req.body.phone_contact,
            departamento: req.body.departamento,
            provincia: req.body.provincia,
            distrito: req.body.distrito,
            direccion: req.body.direccion,
            available: req.body.available
        };

        Supplier.insert(suppData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Supplier Inserted',
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error',
                    err: err
                })
            }
        });
    });

    app.put('/suppliers/:id', (req, res) => {

        const suppData = {
            id: req.body.id,
            name: req.body.name,
            business_name: req.body.business_name,
            ruc: req.body.ruc,
            image: req.file.path,
            description: req.body.description,
            bank: req.body.bank,
            account_number: req.body.account_number,
            cci_account_number: req.body.cci_account_number,
            email: req.body.email,
            contact_person: req.body.contact_person,
            dni_contact: req.body.dni_contact,
            phone_contact: req.body.phone_contact,
            departamento: req.body.departamento,
            provincia: req.body.provincia,
            distrito: req.body.distrito,
            direccion: req.body.direccion,
            available: req.body.available
        };

        Supplier.update(suppData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Supplier Updated',
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    msg: 'error',
                    err: err
                })
            }
        })
    });

    app.delete('/suppliers/:id', (req, res) => {
        Supplier.delete(req.params.id, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    dataDeleted: data
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Error',
                    err: err
                })
            }
        })
    });
}
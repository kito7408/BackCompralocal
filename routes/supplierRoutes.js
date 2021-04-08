const Supplier = require('../controllers/supplierController');
const s3Controller = require('../controllers/s3Controller');

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

    app.post('/suppliers', s3Controller.upload.array('image'), async (req, res) => {
        var pathImgs = [];

        if (req.files) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            // filename = date + req.file.originalname;

            const prodImages = req.files;

            await prodImages.forEach(element => {

                const filename = date + element.originalname;
                pathImgs.push(filename);
                var params = {
                    Bucket: 'compralocal-images/suppliers',
                    Key: filename,
                    Body: element.buffer
                }

                s3Controller.s3.upload(params, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            msg: 'Error',
                            err: error
                        })
                    }
                });
            });
        } else {
            pathImgs.push(null);
            pathImgs.push(null);
        }

        if (req.body.available == 'true') {
            req.body.available = true;
        } else {
            req.body.available = false;
        }

        const suppData = {
            name: req.body.name,
            business_name: req.body.business_name,
            ruc: req.body.ruc,
            image: pathImgs[0],
            image_person: pathImgs[1],
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

    app.put('/suppliers/:id', s3Controller.upload.array('image'), async (req, res) => {
        var img1 = '';
        var img2 = '';

        if (req.files && (req.body.changeImg1 || req.body.changeImg2)) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            // filename = date + req.file.originalname;

            const prodImages = req.files;

            await prodImages.forEach(element => {

                const filename = date + element.originalname;

                if (req.body.changeImg1 == 'true' && img1 == '') {
                    img1 = filename;
                } else if (req.body.changeImg2 == 'true' && img2 == '') {
                    img2 = filename;
                }
                
                var params = {
                    Bucket: 'compralocal-images/suppliers',
                    Key: filename,
                    Body: element.buffer
                }

                s3Controller.s3.upload(params, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            msg: 'Error',
                            err: error
                        })
                    }
                });
            });
        }

        if (req.body.available == 'true') {
            req.body.available = true;
        } else {
            req.body.available = false;
        }

        const suppData = {
            id: req.body.id,
            name: req.body.name,
            business_name: req.body.business_name,
            ruc: req.body.ruc,
            image: img1,
            image_person: img2,
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
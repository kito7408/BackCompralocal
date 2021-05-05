const Product = require('../controllers/productController');
const s3Controller = require('../controllers/s3Controller');

module.exports = function (app) {

    app.get('/products', (req, res) => {
        Product.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/products/category/:id', (req, res) => {
        Product.findByCategory(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    // app.get('/products/subcategory/:id', (req, res) => {
    //     Product.findBySubCategory(req.params.id, (err, data) => {
    //         res.json(data);
    //     });
    // });

    app.get('/products/supplier/:id', (req, res) => {
        Product.findBySupplier(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.get('/products/search', (req, res) => {
        Product.findBySearch(req.query.name, (err, data) => {
            res.json(data);
        });
    });

    app.get('/products/mostbuyed', (req, res) => {
        Product.sortByBuys((err, data) => {
            res.json(data);
        });
    });

    app.get('/products/:id', (req, res) => {
        Product.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/products', s3Controller.upload.array('image'), async (req, res) => {
        // console.log(req.files);

        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');

        const prodImages = req.files;

        var pathImgs = [];

        await prodImages.forEach(element => {

            const filename = date + element.originalname;
            pathImgs.push(filename);
            var params = {
                Bucket: 'compralocal-images/products',
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

        //can be null
        if (req.body.priceOffer == 'undefined') {
            req.body.priceOffer = '0';
        }
        if (req.body.description == 'undefined') {
            req.body.description = null;
        }

        //boolean
        if (req.body.isTrent == 'true') {
            req.body.isTrent = true;
        } else {
            req.body.isTrent = false;
        }
        if (req.body.isOffer == 'true') {
            req.body.isOffer = true;
        } else {
            req.body.isOffer = false;
        }
        if (req.body.toProv == 'true') {
            req.body.toProv = true;
        } else {
            req.body.toProv = false;
        }

        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            numSellOnWeek: req.body.numSellOnWeek,
            isTrent: req.body.isTrent,
            categoryId: req.body.categoryId,
            supplierId: req.body.supplierId,
            isOffer: req.body.isOffer,
            priceOffer: req.body.priceOffer,
            unit: req.body.unit,
            image1: pathImgs[0],
            image2: pathImgs[1],
            image3: pathImgs[2],
            image4: pathImgs[3],
            image5: pathImgs[4],
            toProv: req.body.toProv,
            daysToSend: req.body.daysToSend,
            numDaysToSend: req.body.numDaysToSend,
            numDaysToSend2: req.body.numDaysToSend2
        };

        Product.insert(productData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Product Inserted',
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

    app.put('/products/sales', (req, res) => {

        var dataProds = req.body.data;

        Product.updateSales(dataProds, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Products Updated',
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

    app.put('/products/:id', s3Controller.upload.array('image'), async (req, res) => {

        // console.log(req.files);
        // console.log(req.body);

        var img1 = '';
        var img2 = '';
        var img3 = '';
        var img4 = '';
        var img5 = '';

        if (req.files &&
            (req.body.changeImg1 == 'true' ||
                req.body.changeImg2 == 'true' ||
                req.body.changeImg3 == 'true' ||
                req.body.changeImg4 == 'true' ||
                req.body.changeImg5 == 'true')) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');

            const prodImages = req.files;

            await prodImages.forEach(element => {

                const filename = date + element.originalname;

                if (req.body.changeImg1 == 'true' && img1 == '') {
                    img1 = filename;
                } else if (req.body.changeImg2 == 'true' && img2 == '') {
                    img2 = filename;
                } else if (req.body.changeImg3 == 'true' && img3 == '') {
                    img3 = filename;
                } else if (req.body.changeImg4 == 'true' && img4 == '') {
                    img4 = filename;
                } else if (req.body.changeImg5 == 'true' && img5 == '') {
                    img5 = filename;
                }

                var params = {
                    Bucket: 'compralocal-images/products',
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

        //can be null
        if (req.body.priceOffer == 'undefined') {
            req.body.priceOffer = '0';
        }
        if (req.body.description == 'undefined') {
            req.body.description = null;
        }

        //boolean
        if (req.body.isTrent == 'true') {
            req.body.isTrent = true;
        } else {
            req.body.isTrent = false;
        }
        if (req.body.isOffer == 'true') {
            req.body.isOffer = true;
        } else {
            req.body.isOffer = false;
        }
        if (req.body.toProv == 'true') {
            req.body.toProv = true;
        } else {
            req.body.toProv = false;
        }

        const productData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            numSellOnWeek: req.body.numSellOnWeek,
            isTrent: req.body.isTrent,
            categoryId: req.body.categoryId,
            supplierId: req.body.supplierId,
            isOffer: req.body.isOffer,
            priceOffer: req.body.priceOffer,
            unit: req.body.unit,
            image1: img1,
            image2: img2,
            image3: img3,
            image4: img4,
            image5: img5,
            toProv: req.body.toProv,
            daysToSend: req.body.daysToSend,
            numDaysToSend: req.body.numDaysToSend,
            numDaysToSend2: req.body.numDaysToSend2
        };

        Product.update(productData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Product Updated',
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

    app.delete('/products/:id', (req, res) => {
        Product.delete(req.params.id, (err, data) => {
            //no borra de verdad, solo cambia el campo de disponible a falso
            if (data) {
                res.json({
                    success: true,
                    msg: 'Product Deleted',
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
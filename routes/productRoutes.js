const Product = require('../controllers/productController');
const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIA3WGAH3554DJMT2ZM',
    secretAccessKey: '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'
});

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//         const now = new Date().toISOString();
//         const date = now.replace(/:/g, '-');
//         cb(null, date + file.originalname);
//     }
// });

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
});

const upload = multer({ storage: storage });

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

    app.get('/products/subcategory/:id', (req, res) => {
        Product.findBySubCategory(req.params.id, (err, data) => {
            res.json(data);
        });
    });

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

    app.post('/products', upload.array('image'), async (req, res) => {
        // console.log(req.files);

        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        // const filename = date + req.file.originalname;

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

            s3.upload(params, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        msg: 'Error',
                        err: error
                    })
                }
            });
        });

        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            numSellOnWeek: req.body.numSellOnWeek,
            isTrent: req.body.isTrent,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            supplierId: req.body.supplierId,
            isOffer: req.body.isOffer,
            priceOffer: req.body.priceOffer,
            unit: req.body.unit,
            image1: pathImgs[0],
            image2: pathImgs[1],
            image3: pathImgs[2],
            image4: pathImgs[3],
            image5: pathImgs[4]
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

    app.put('/products/:id', upload.single('image'), (req, res) => {

        //pone al producto como dispoble = false, luego crea uno igual con los cambios realizados
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        const filename = date + req.file.originalname;

        var params = {
            Bucket: 'compralocal-images/products',
            Key: filename,
            Body: req.file.buffer
        }

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    msg: 'Error',
                    err: error
                })
            }

            const productData = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: filename,
                numSellOnWeek: req.body.numSellOnWeek,
                isTrent: req.body.isTrent,
                categoryId: req.body.categoryId,
                subcategoryId: req.body.subcategoryId,
                supplierId: req.body.supplierId,
                isOffer: req.body.isOffer,
                priceOffer: req.body.priceOffer,
                unit: req.body.unit
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
            })
        });

        // const productData = {
        //     id: req.body.id,
        //     name: req.body.name,
        //     description: req.body.description,
        //     price: req.body.price,
        //     image: req.file.path,
        //     numSellOnWeek: req.body.numSellOnWeek,
        //     isTrent: req.body.isTrent,
        //     categoryId: req.body.categoryId,
        //     subcategoryId: req.body.subcategoryId,
        //     supplierId: req.body.supplierId,
        //     isOffer: req.body.isOffer,
        //     priceOffer: req.body.priceOffer,
        //     unit: req.body.unit
        // };

        // Product.update(productData, (err, data) => {
        //     if (data) {
        //         res.json({
        //             success: true,
        //             msg: 'Product Updated',
        //             data: data
        //         });
        //     } else {
        //         res.json({
        //             success: false,
        //             msg: 'error',
        //             err: err
        //         })
        //     }
        // });
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
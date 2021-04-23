const ProdMod = require('../controllers/productModelController');
const s3Controller = require('../controllers/s3Controller');

module.exports = function (app) {

    app.get('/prodmodel', (req, res) => {
        ProdMod.getAll((err, data) => {
            res.json(data);
        });
    });
    
    app.get('/prodmodel/product/:id', (req, res) => {
        ProdMod.findByProduct(req.params.id, (err, data) => {
            res.json(data);
        });
    });
    
    app.get('/prodmodel/:id', (req, res) => {
        ProdMod.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/prodmodel', s3Controller.upload.single('image'), (req, res) => {
        
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        const filename = date + req.file.originalname;

        var params = {
            Bucket: 'compralocal-images/product-models',
            Key: filename,
            Body: req.file.buffer
        }

        s3Controller.s3.upload(params, (error, data) => {
            if(error){
                res.status(500).json({
                    success: false,
                    msg: 'Error',
                    err: error
                })
            }

            const prodModData = {
                name: req.body.name,
                image: filename,
                prodImgNum: req.body.prodImgNum,
                productId: req.body.productId
            };

            ProdMod.insert(prodModData, (err, data) => {
                if (data) {
                    res.json({
                        success: true,
                        msg: 'ProdMod Inserted',
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
    });

    app.put('/prodmodel/:id', (req, res) => {

        const data = {
            id: req.body.id,
            name: req.body.name,
            productId: req.body.productId
        };

        ProdMod.update(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'ProdMod Updated',
                    data: result
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

    app.delete('/prodmodel/:id', (req, res) => {
        ProdMod.delete(req.params.id, (err, data) => {
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
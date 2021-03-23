const ProdMod = require('../controllers/productModelController');

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

    app.post('/prodmodel', (req, res) => {
        const data = {
            name: req.body.name,
            productId: req.body.productId
        };

        ProdMod.insert(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'ProdMod Inserted',
                    data: result
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

    app.post('/prodmodel/many', (req, res) => {

        const dataArray = req.body;

        ProdMod.saveMany(dataArray, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Models Inserted',
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
const Supplier = require('../controllers/supplierController');

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

    app.post('/suppliers', (req, res) => {
        const suppData = {
            name: req.body.name
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
        })
    });

    app.put('/suppliers/:id', (req, res) => {

        const suppData = {
            name: req.body.name
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
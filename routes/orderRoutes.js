const Order = require('../controllers/orderController');

module.exports = function (app) {

    app.get('/order', (req, res) => {
        Order.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/order/:id', (req, res) => {
        Order.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/order/user/:id', (req, res) => {
        Order.findByUser(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.post('/order', (req, res) => {
        const orderData = {
            num: req.body.num,
            totalPrice: req.body.totalPrice,
            userId: req.body.userId
        };

        Order.insert(orderData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Order Inserted',
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

    app.put('/order/:id', (req, res) => {
        const orderData = {
            num: req.body.num,
            totalPrice: req.body.totalPrice,
            userId: req.body.userId
        };

        Order.update(orderData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Order Updated',
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

    app.delete('/order/:id', (req, res) => {
        Order.delete(req.params.id, (err, data) => {
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
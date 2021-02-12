const Order = require('../controllers/orderController');

module.exports = function (app) {

    app.put('/order/sendUserMail', (req,res) => {
        Order.sendUserMail(req.body, (err, data) => {
            res.json(data);
        });
    });
    
    app.put('/order/sendAdminMail', (req,res) => {
        Order.sendAdminMail(req.body, (err, data) => {
            res.json(data);
        });
    });

    app.put('/order/sendPagoPendienteMail', (req,res) => {
        Order.sendPagoPendienteMail(req.body, (err, data) => {
            res.json(data);
        });
    });

    app.put('/order/sendThanksUserMail', (req,res) => {
        Order.sendThanksUserMail(req.body, (err, data) => {
            res.json(data);
        });
    });

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
            deliveryMethod: req.body.deliveryMethod,
            paymentMethod: req.body.paymentMethod,
            paymentState: req.body.paymentState,
            productsPrice: req.body.productsPrice,
            deliveryPrice: req.body.deliveryPrice,
            totalPrice: req.body.totalPrice,
            cupon: req.body.cupon,
            coment: req.body.coment,
            userId: req.body.userId,
            helpProyectId: req.body.helpProyectId
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
            id: req.body.id,
            num: req.body.num,
            deliveryMethod: req.body.deliveryMethod,
            paymentMethod: req.body.paymentMethod,
            paymentState: req.body.paymentState,
            productsPrice: req.body.productsPrice,
            deliveryPrice: req.body.deliveryPrice,
            totalPrice: req.body.totalPrice,
            cupon: req.body.cupon,
            coment: req.body.coment,
            userId: req.body.userId,
            helpProyectId: req.body.helpproyectId
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
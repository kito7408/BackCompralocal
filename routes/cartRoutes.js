const Cart = require('../controllers/cartController');

module.exports = function (app) {

    app.get('/cart', (req, res) => {
        Cart.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/cart/:id', (req, res) => {
        Cart.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/cart/user/:id', (req, res) => {
        Cart.findByUser(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.get('/cart/order/:id', (req, res) => {
        Cart.findByOrder(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.get('/cart/order', (req, res) => {
        Cart.findWhereIsInAnyOrder((err, data) => {
            res.json(data);
        });
    });

    app.post('/cart', (req, res) => {
        const cartData = {
            quantity: req.body.quantity,
            totalPrice: req.body.totalPrice,
            isBuyed: req.body.isBuyed,
            userId: req.body.userId,
            productId: req.body.productId,
            orderId: req.body.orderId
        };

        Cart.insert(cartData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Cart Inserted',
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

    app.post('/cart/many', (req, res) => {

        const cartArray = req.body;

        Cart.saveMany(cartArray, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Cart Local Inserted',
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

    app.put('/cart/:id', (req, res) => {
        console.log(req.body)
        const cartData = {
            id: req.body.id,
            quantity: req.body.quantity,
            totalPrice: req.body.totalPrice,
            isBuyed: req.body.isBuyed,
            userId: req.body.userId,
            productId: req.body.productId,
            orderId: req.body.orderId
        };

        Cart.update(cartData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Cart Updated',
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

    app.delete('/cart/:id', (req, res) => {
        Cart.delete(req.params.id, (err, data) => {
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

    app.post('/cart/culqi/charge', (req, res) => {
        const culqiData = {
            amount: req.body.amount,
            currency_code: req.body.currency_code,
            email: req.body.email,
            source_id: req.body.source_id,
        }

        Cart.culqi(culqiData,(err, data)=> {
            // console.log(data);
            if (data) {
                res.json({
                    success: true,
                    msg: 'Culqi Created',
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

    app.post('/cart/culqi/customer', (req, res) => {

        Cart.culqiCustomer(req.body,(err, data)=> {
            // console.log(data);
            if (data) {
                if (data.object == 'error') {
                    res.status(500).json(data);
                } else {
                    res.json(data)
                }
            } else {
                res.status(500).json(err)
            }
        });
    });

    app.post('/cart/culqi/card', (req, res) => {
        
        Cart.culqiCard(req.body,(err, data)=> {
            // console.log(data);
            if (data) {
                if (data.object == 'error') {
                    res.status(500).json(data);
                } else {
                    res.json(data)
                }
            } else {
                res.status(500).json(err)
            }
        });
    });

    app.post('/cart/culqi/subscription', (req, res) => {
        
        Cart.culqiSubscription(req.body,(err, data)=> {
            // console.log(data);
            if (data) {
                if (data.object == 'error') {
                    res.status(500).json(data);
                } else {
                    res.json(data)
                }
            } else {
                res.status(500).json(err)
            }
        });
    });

    app.post('/cart/userbuy', (req, res) => {
        // console.log(req.body);
        Cart.buyCart(req.body.userId, req.body.orderId,(err, data)=> {
            // console.log(data);
            if (data) {
                res.json({
                    success: true,
                    msg: 'Carro limpio',
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
}
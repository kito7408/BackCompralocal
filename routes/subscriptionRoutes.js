const Subscription = require('../controllers/subscriptionController');

module.exports = function (app) {

    app.get('/subscription', (req, res) => {
        Subscription.getAll((err, result) => {
            res.json(result);
        });
    });

    app.get('/subscription/:id', (req, res) => {
        Subscription.findById(req.params.id, (err, result) => {
            res.json(result);
        })
    });

    app.post('/subscription', (req, res) => {
        const data = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone
        };
        Subscription.insert(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'Subscription Inserted',
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

    app.put('/subscription/:id', (req, res) => {

        const data = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone
        };

        Subscription.update(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'Subscription Updated',
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

    app.delete('/subscription/:id', (req, res) => {
        Subscription.delete(req.params.id, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    dataDeleted: result
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
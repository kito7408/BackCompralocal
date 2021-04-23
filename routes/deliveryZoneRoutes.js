const DeliveryZone = require('../controllers/deliveryZoneController');

module.exports = function (app) {

    app.get('/deliveryzone', (req, res) => {
        DeliveryZone.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/deliveryzone/product/:id', (req, res) => {
        DeliveryZone.findByProduct(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.get('/deliveryzone/:id', (req, res) => {
        DeliveryZone.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/deliveryzone', (req, res) => {

        var districtsString = '';

        req.body.districts.forEach((element, index) => {
            if (index == 0) {
                districtsString += element;
            } else {
                districtsString += (',' + element);
            }
        });

        req.body.districts = districtsString;

        DeliveryZone.insert(req.body, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'DeliveryZone Inserted',
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

    app.post('/deliveryzone/many', (req, res) => {

        const dataArray = req.body;

        dataArray.forEach(item => {
            var districtsString = '';

            for (let index = 0; index < item.districts.length; index++) {
                if (index == 0) {
                    districtsString += item.districts[index];
                } else {
                    districtsString += (',' + item.districts[index]);
                }
            }

            item.districts = districtsString;
        });

        DeliveryZone.saveMany(dataArray, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Data Inserted',
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

    app.put('/deliveryzone/:id', (req, res) => {

        var districtsString = '';

        req.body.districts.forEach((element, index) => {
            if (index == 0) {
                districtsString += element;
            } else {
                districtsString += (',' + element);
            }
        });

        req.body.districts = districtsString;

        DeliveryZone.update(req.body, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'DeliveryZone Updated',
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

    app.delete('/deliveryzone/:id', (req, res) => {
        DeliveryZone.delete(req.params.id, (err, data) => {
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
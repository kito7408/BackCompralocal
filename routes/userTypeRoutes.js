const UserType = require('../controllers/userTypeController');

module.exports = function (app) {

    app.get('/userTypes', (req, res) => {
        UserType.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/userTypes/:id', (req, res) => {
        UserType.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/userTypes', (req, res) => {
        const typeData = {
            name: req.body.name
        };

        UserType.insert(typeData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Type Inserted',
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

    app.put('/userTypes/:id', (req, res) => {

        const typeData = {
            id: req.body.id,
            name: req.body.name
        };

        UserType.update(typeData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Type Updated',
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

    app.delete('/userTypes/:id', (req, res) => {
        UserType.delete(req.params.id, (err, data) => {
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
const Direction = require('../controllers/directionController');

module.exports = function (app) {

    app.get('/direction', (req, res) => {
        Direction.getAll((err, data) => {
            res.json(data);
        });
    });
    
    app.get('/direction/user/:id', (req, res) => {
        Direction.findByUser(req.params.id, (err, data) => {
            res.json(data);
        });
    });
    
    app.get('/direction/:id', (req, res) => {
        Direction.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/direction', (req, res) => {
        const data = {
            departamento: req.body.departamento,
            provincia: req.body.provincia,
            distrito: req.body.distrito,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            referencia: req.body.referencia,
            userId: req.body.userId
        };

        Direction.insert(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'Direction Inserted',
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

    app.put('/direction/:id', (req, res) => {

        const data = {
            id: req.body.id,
            departamento: req.body.departamento,
            provincia: req.body.provincia,
            distrito: req.body.distrito,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            referencia: req.body.referencia,
            userId: req.body.userId
        };

        Direction.update(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'Direction Updated',
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

    app.delete('/direction/:id', (req, res) => {
        Direction.delete(req.params.id, (err, data) => {
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
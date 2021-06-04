const HelpProyect = require('../controllers/helpProyectController');

module.exports = function (app) {

    app.get('/helpproy', (req, res) => {
        HelpProyect.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/helpproy/:id', (req, res) => {
        HelpProyect.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/helpproy', (req, res) => {
        const helpData = {
            name: req.body.name,
            num: req.body.num,
            money: req.body.money
        };
        HelpProyect.insert(helpData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'HelpProyect Inserted',
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

    app.put('/helpproy/:id', (req, res) => {

        const helpData = {
            id: req.body.id,
            name: req.body.name,
            num: req.body.num,
            money: req.body.money
        };

        HelpProyect.update(helpData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'HelpProyect Updated',
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

    app.delete('/helpproy/:id', (req, res) => {
        HelpProyect.delete(req.params.id, (err, data) => {
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
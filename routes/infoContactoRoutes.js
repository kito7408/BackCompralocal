const InfoContacto = require('../controllers/infoContactoController');

module.exports = function (app) {

    app.get('/infocontacto', (req, res) => {
        InfoContacto.getAll((err, result) => {
            res.json(result);
        });
    });

    app.get('/infocontacto/:id', (req, res) => {
        InfoContacto.findById(req.params.id, (err, result) => {
            res.json(result);
        })
    });

    app.post('/infocontacto', (req, res) => {
        const data = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            consulta: req.body.consulta
        };
        InfoContacto.insert(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'InfoContacto Inserted',
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

    app.put('/infocontacto/:id', (req, res) => {

        const data = {
            id: req.body.id,
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            consulta: req.body.consulta
        };

        InfoContacto.update(data, (err, result) => {
            if (result) {
                res.json({
                    success: true,
                    msg: 'InfoContacto Updated',
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

    app.delete('/infocontacto/:id', (req, res) => {
        InfoContacto.delete(req.params.id, (err, result) => {
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
const User = require('../controllers/userController');

module.exports = function (app) {

    app.get('/users', (req, res) => {
        User.getAll((err, data) => {
            res.json(data);
        });
    });
    
    app.get('/users/username', (req, res) => {
        console.log("adsadadas");
        User.findByUsername(req.query.username, (err, data) => {
            res.json(data);
        });
    });
    
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/users', (req, res) => {
        const userData = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            userTypeId: req.body.userTypeId
        };

        User.insert(userData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'User Inserted',
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

    app.put('/users/:id', (req, res) => {

        const userData = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            userTypeId: req.body.userTypeId
        };

        User.update(userData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'User Updated',
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

    app.delete('/users/:id', (req, res) => {
        User.delete(req.params.id, (err, data) => {
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

    app.post('/users/login', (req, res) => {
        const userData = {
            username: req.body.username,
            password: req.body.password
        };

        User.login(userData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Logged',
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
}
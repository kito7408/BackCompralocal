const Category = require('../controllers/categoryController');

module.exports = function (app) {

    app.get('/category', (req, res) => {
        Category.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/category/:id', (req, res) => {
        Category.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/category', (req, res) => {
        const categoryData = {
            name: req.body.name
        };
        Category.insert(categoryData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Category Inserted',
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

    app.put('/category/:id', (req, res) => {

        const categoryData = {
            name: req.body.name
        };

        Category.update(categoryData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Category Updated',
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

    app.delete('/category/:id', (req, res) => {
        Category.delete(req.params.id, (err, data) => {
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
const SubCategory = require('../controllers/subCategoryController');

module.exports = function (app) {

    app.get('/subcategory', (req, res) => {
        SubCategory.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/subcategory/:id', (req, res) => {
        SubCategory.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/subcategory/category/:id', (req, res) => {
        SubCategory.findByCategoryId(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/subcategory', (req, res) => {
        const subCategoryData = {
            name: req.body.name,
            categoryId: req.body.categoryId
        };
        SubCategory.insert(subCategoryData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Subcategory Inserted',
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

    app.put('/subcategory/:id', (req, res) => {

        const subCategoryData = {
            id: req.body.id,
            name: req.body.name,
            categoryId: req.body.categoryId
        };

        SubCategory.update(subCategoryData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Subcategory Updated',
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

    app.delete('/subcategory/:id', (req, res) => {
        SubCategory.delete(req.params.id, (err, data) => {
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
const PageReview = require('../controllers/pageReviewController');

module.exports = function (app) {

    app.get('/pagereview', (req, res) => {
        PageReview.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/pagereview/user/:id', (req, res) => {
        PageReview.findByUserId(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/pagereview/:id', (req, res) => {
        PageReview.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/pagereview', (req, res) => {
        const PageReviewData = {
            stars: req.body.stars,
            userId: req.body.userId
        };
        PageReview.insert(PageReviewData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'PageReview Inserted',
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

    app.put('/pagereview/:id', (req, res) => {

        const PageReviewData = {
            id: req.body.id,
            stars: req.body.stars,
            userId: req.body.userId
        };

        PageReview.update(PageReviewData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'PageReview Updated',
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

    app.delete('/pagereview/:id', (req, res) => {
        PageReview.delete(req.params.id, (err, data) => {
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
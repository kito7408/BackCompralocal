const ProdComment = require('../controllers/prodCommentController');

module.exports = function (app) {

    app.get('/prodcomment', (req, res) => {
        ProdComment.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/prodcomment/user/:id', (req, res) => {
        ProdComment.findByUserId(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/prodcomment/product/:id', (req, res) => {
        ProdComment.findByProductId(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/prodcomment/:id', (req, res) => {
        ProdComment.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/prodcomment', (req, res) => {
        const ProdCommentData = {
            content: req.body.content,
            stars: req.body.stars,
            userId: req.body.userId,
            productId: req.body.productId
        };
        ProdComment.insert(ProdCommentData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'ProdComment Inserted',
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


    app.put('/prodcomment/user-prod', (req, res) => {
        const user_Id = req.body.userId;
        const prod_Id = req.body.productId;
        ProdComment.findByUserAndProductId(user_Id, prod_Id, (err, data) => {
            res.json(data);
        })
    });

    app.put('/prodcomment/:id', (req, res) => {

        const ProdCommentData = {
            id: req.body.id,
            content: req.body.content,
            stars: req.body.stars,
            userId: req.body.userId,
            productId: req.body.productId
        };

        ProdComment.update(ProdCommentData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'ProdComment Updated',
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

    app.delete('/prodcomment/:id', (req, res) => {
        ProdComment.delete(req.params.id, (err, data) => {
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
const Notice = require('../controllers/noticeController');

module.exports = function (app) {

    app.get('/notice', (req, res) => {
        Notice.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/notice/:id', (req, res) => {
        Notice.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.get('/notice/user/:id', (req, res) => {
        Notice.findByUser(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.post('/notice', (req, res) => {
        const noticeData = {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image
        };

        Notice.insert(noticeData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Notice Inserted',
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

    app.put('/notice/:id', (req, res) => {
        console.log(req.body)
        const noticeData = {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            image: req.body.image
        };

        Notice.update(noticeData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Notice Updated',
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

    app.delete('/notice/:id', (req, res) => {
        Notice.delete(req.params.id, (err, data) => {
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
const Post = require('../controllers/postController');
const s3Controller = require('../controllers/s3Controller');

module.exports = function (app) {

    app.get('/post', (req, res) => {
        Post.getAll((err, data) => {
            res.json(data);
        });
    });

    app.get('/post/user/:id', (req, res) => {
        Post.findByUser(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.get('/post/except/:id', (req, res) => {
        Post.findExcept(req.params.id, (err, data) => {
            res.json(data);
        });
    });

    app.get('/post/last', (req, res) => {
        Post.findLast((err, data) => {
            res.json(data);
        });
    });

    app.get('/post/:id', (req, res) => {
        Post.findById(req.params.id, (err, data) => {
            res.json(data);
        })
    });

    app.post('/post', s3Controller.upload.single('image'), (req, res) => {

        // console.log(req.body);
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        const filename = date + req.file.originalname;

        var params = {
            Bucket: 'compralocal-images/blog-posts',
            Key: filename,
            Body: req.file.buffer
        }

        s3Controller.s3.upload(params, (error, data) => {
            if(error){
                res.status(500).json({
                    success: false,
                    msg: 'Error',
                    err: error
                })
            }

            const postData = {
                title: req.body.title,
                content: req.body.content,
                image: filename,
                author: req.body.author,
                userId: req.body.userId
            };

            Post.insert(postData, (err, data) => {
                if (data) {
                    res.json({
                        success: true,
                        msg: 'Post Inserted',
                        data: data
                    })
                } else {
                    res.status(500).json({
                        success: false,
                        msg: 'Error',
                        err: err
                    })
                }
            });
        });
    });

    app.put('/post/:id', (req, res) => {
        // console.log(req.body)
        const postData = {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            author: req.body.author,
            userId: req.body.userId
        };

        Post.update(postData, (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    msg: 'Post Updated',
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

    app.delete('/post/:id', (req, res) => {
        Post.delete(req.params.id, (err, data) => {
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
module.exports = function (app) {

    app.post('/culqi/event', (req, res) => {
        
        console.log(req.body);

        res.status(200).json({message: 'evento recibido'});
    });
}
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function (req, res, next) {
    if ((req.path.includes('/users') && req.method == 'POST') ||
        (req.path == '/infocontacto' && req.method == 'POST') ||
        (req.path.includes('/category') && req.method == 'GET') ||
        (req.path.includes('/post') && req.method == 'GET') ||
        (req.path.includes('/prodcomment') && req.method == 'GET') ||
        (req.path.includes('/products') && req.method == 'GET') ||
        (req.path == '/subscription' && req.method == 'POST') ||
        (req.path.includes('/suppliers') && req.method == 'GET')) {

        next();

    } else {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, CONFIG.SECRET_TOKEN, function (error, decoded) {
                if (error) return res.status(403).send({ message: 'No tienes los permisos suficientes', error });
                if ((req.path.includes('/products') && req.method != 'GET') ||
                    (req.path.includes('/category') && req.method != 'GET') ||
                    (req.path.includes('/post') && req.method != 'GET') ||
                    (req.path.includes('/products') && req.method != 'GET' && req.path == '/products/sales') ||
                    (req.path.includes('/subscription') && req.method != 'POST') ||
                    (req.path.includes('/suppliers') && req.method != 'GET') ||
                    (req.path.includes('/users') && req.method != 'POST')) {
                    if (decoded.userType.name == 'admin') next();
                    else res.status(403).send({ message: 'No tienes los permisos suficientes' });
                } else {
                    next();
                }
            });
        } else res.status(403).send({ message: 'No tienes los permisos suficientes' });
    }
}
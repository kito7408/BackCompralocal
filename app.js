const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AuthToken = require('./middlewares/AuthToken');
const cors = require('cors');


const app = express();

const port = process.env.PORT || 3000;

app.set('port', port);

app.use(cors());

// app.use(AuthToken);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());

// app.use(bodyParser.json({limit: '100mb'}));
// app.use(bodyParser.urlencoded({limit: '100mb'}));

// app.use(function (req, res, next) {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next();
// });

//routes
require('./routes/userRoutes')(app);
require('./routes/userTypeRoutes')(app);
require('./routes/categoryRoutes')(app);
require('./routes/subCategoryRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/cartRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/supplierRoutes')(app);
require('./routes/orderRoutes')(app);
require('./routes/helpProyectRoutes')(app);
require('./routes/subscriptionRoutes')(app);
require('./routes/prodCommentRoutes')(app);
require('./routes/directionRoutes')(app);
require('./routes/pageReviewRoutes')(app);
require('./routes/infoContactoRoutes')(app);
require('./routes/culqiEventRoutes')(app);
require('./routes/productModelRoutes')(app);
require('./routes/deliveryZoneRoutes')(app);


app.listen(app.get('port'), () => {
	console.log('server on port ' + port);
});
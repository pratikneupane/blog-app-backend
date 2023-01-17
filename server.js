const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const connectDB = require('./utils/db');
connectDB();


// use bodyparser middleware
app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRoutes = require('./routes/users.route.js');
app.use('/api/user', userRoutes);


process.setMaxListeners(20);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
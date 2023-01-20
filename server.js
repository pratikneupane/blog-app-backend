const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const connectDB = require('./utils/db');
connectDB();


// use bodyparser middleware
app.use(express.json());

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRoutes = require('./routes/users.route.js');
const postRoutes = require('./routes/posts.route.js');
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
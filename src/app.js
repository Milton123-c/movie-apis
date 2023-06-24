const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();
const link = require('./html/link');

//this is our app
const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());

app.use('/api/v1', router);
app.get('/', (req, res) => {
    return res.send(link);
})
app.get('*', (req, res)=> {
    res.redirect('/')
})

// middlewares after the routes
app.use(errorHandler)


module.exports = app;

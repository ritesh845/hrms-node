const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require('morgan');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

const db = require("./models");

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization,Accept",
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);
app.get('/', function(req, res) {
    res.send('Page under construction.');
});

// app.use(express.static('uploads/'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {

    return res.status(error.status || 500).json({ status: "error", code: error.status || 500, message: error.message || "Some error occurred while creating the User.", data: {} });
});


module.exports = app;
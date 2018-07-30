const express = require('express');
const app = express();

const routes = require('./src/routes/index');

app.use('/', routes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        response: {
            message: error.message
        }
    });
});

module.exports = app;

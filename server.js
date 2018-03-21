#!/usr/bin/env node

/**
 * Module dependencies.
 */

let debug = require('debug')('full-text-app:server');
let http = require('http');
let path = require('path');
let express = require('express');
let apps = express();
let favicon = require('serve-favicon');
let logger = require('morgan');
let helmet = require('helmet');

apps.use(helmet.noCache());
apps.use(logger('dev', {
    skip: function (req, res) {
        return req.baseUrl.toLowerCase() === '/api/alive'; // don't log alive route
    }
}));

let api = require('./app');

//apps.use(favicon(path.join(STATIC_PATH, 'web/img/favicon.png')));

// apps.use(express.static(path.join(__dirname, 'public')));
apps.use('/api', api.getApp());

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
apps.set('port', port);

/*// Treat invalid back-end call or redirect to front-end application
apps.use(function (req, res, next) {
    if (req.path.indexOf('/api') === 0) {
        debug("Invalid endpoint access: " + req.path);

        let err = new Error("Not found");
        err.status = 404;

        next(err);
    }
    else {
        let options = {
            root: __dirname + "/" + "public" + '/',
            dotfiles: 'deny'
        };

        let fileName = "index.html";

        res.sendFile(fileName, options, (err) => {
            if (err) {
                debug(err);

                next(new Error("Could not find index file"));
            }
        });
    }
});*/

// Treat invalid back-end call
apps.use((req, res, next) => {
    debug("Invalid endpoint access: " + req.path);
    next(new Error("Not found"));
});

apps.use((err, req, res, next) => {
    res.status(err.status || 500).send({error: err.message});
});

/**
 * Create HTTP server.
 */

let server = http.createServer(apps);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

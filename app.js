'use strict';

let express = require('express');
let cors = require('cors');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let config = require('config');
let DBClient = require('./client/db_client');
let DiscBusiness = require('./discs/business/disc_business');

let app = express();

let dbClient = new DBClient(config.get('dbConfig'));

module.exports.getDBClient = () => {
    return dbClient;
};

let discBusiness = new DiscBusiness();

module.exports.getDiscBusiness = () => {
    return discBusiness;
};

app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', require('./routes'));

module.exports.getApp = () => {
    return app;
};
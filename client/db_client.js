'use strict';

let mysql = require('mysql');

class DBClient {
    constructor(config) {
        this.config = config;
        this.pool = null;
    }

    getConnection(cb) {
        if (!this.pool) {
            console.log("Creating the MySQL pool");
            this.pool = mysql.createPool(this.config);
        }

        return this.pool.getConnection(cb);
    }
}

module.exports = DBClient;
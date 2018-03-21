'use strict';

let mainApp = require('../app');

class ApiBusiness {
    constructor() {
        this.dbClient = mainApp.getDBClient();
    }

    getDBClient() {
        return this.dbClient;
    }
}

module.exports = ApiBusiness;
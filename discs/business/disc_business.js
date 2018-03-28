'use strict';

let query = require('../queries/disc_query');
let ApiBusiness = require('../../business/api_business');

class DiscBusiness extends ApiBusiness {
    constructor() {
        super();
        this.query = query;
    }

    getAllDiscs(query) {
        let self = this;
        let limit = 20, offset = 0;

        let limitParam = parseInt(query.limit);
        let offsetParam = parseInt(query.offset);

        if (!Number.isNaN(limitParam) && Number.isFinite(limitParam))
            limit = limitParam;

        if (!Number.isNaN(offsetParam) && Number.isFinite(offsetParam))
            offset = offsetParam;

        return new Promise((resolve, reject) => {
            self.getDBClient().getConnection((err, conn) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                conn.query(self.query.SELECT, [limit, offset], (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    else {
                        conn.release();
                        resolve(results);
                    }
                });
            });
        });
    }

    insertDisc(disc) {
        let self = this;

        return new Promise((resolve, reject) => {
            self.getDBClient().getConnection((err, conn) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                conn.query(self.query.INSERT,
                    [disc.name, disc.artist, disc.release_date, disc.studio, disc.genre, disc.label, disc.producer],
                    (err, results, fields) => {
                        if (err) {
                            console.error(err);
                            return reject(err);
                        }
                        else {
                            conn.release();
                            resolve(results);
                        }
                    });
            });
        });
    }

    getDiscById(id) {
        let self = this;

        return new Promise((resolve, reject) => {
            self.getDBClient().getConnection((err, conn) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                conn.query(self.query.SELECT_ONE_BY_ID, [id], (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    else {
                        conn.release();
                        resolve(results.length !== 0 ? results[0] : []);
                    }
                });
            });
        });
    }

    updateDiscById(disc) {
        let self = this;

        return new Promise((resolve, reject) => {
            self.getDBClient().getConnection((err, conn) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                conn.query(self.query.UPDATE, [disc.name, disc.artist, disc.release_date,
                    disc.studio, disc.genre, disc.label, disc.producer, disc.id], (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    else {
                        conn.release();
                        resolve(results);
                    }
                });
            });
        });
    }

    deleteDiscById(discId) {
        let self = this;

        return new Promise((resolve, reject) => {
            self.getDBClient().getConnection((err, conn) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                conn.query(self.query.DELETE, [discId], (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    else {
                        conn.release();
                        resolve(results);
                    }
                });
            });
        });
    }
}

module.exports = DiscBusiness;
'use strict';

let query = require('../queries/disc_query');
const schema = require("schm");
const { validate } = schema;
let SearchClient = require('../../client/search_client');
let config = require('config');

class DiscModel {
    constructor(dbClient) {
        this.query = query;
        this.dbClient = dbClient;

        this.discSchema = schema({
            name: {
                type: String,
                required: true
            },
            artist: {
                type: String,
                required: true
            },
            release_date: {
                type: String,
                required: true
            },
            studio: {
                type: String,
                required: true
            },
            genre: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            producer: {
                type: String,
                required: true
            }
        });

        this.searchClient = new SearchClient(config.get('searchConfig'));
    }

    validateFields(obj) {
        return validate(obj, this.discSchema);
    }

    getDBClient() {
        return this.dbClient;
    }

    getAll(params) {
        let self = this;

        return new Promise((resolve, reject) => {
            self.getDBClient().getConnection((err, conn) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                conn.query(self.query.SELECT, [params.limit, params.offset], (err, results, fields) => {
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

    insertOne(disc) {
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

                            let discData = disc;
                            discData.id = results.insertId;

                            self.searchClient.bulkIndex(discData);
                        }
                    });
            });
        });
    }

    getOneById(id) {
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

    updateOneById(disc) {
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

                        self.searchClient.bulkUpdate(disc);
                    }
                });
            });
        });
    }

    deleteOneById(discId) {
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

                        self.searchClient.bulkDelete(discId);
                    }
                });
            });
        });
    }

    searchByTerm(term, offset = 0) {
        return this.searchClient.queryTerm(term, offset);
    }
}

module.exports = DiscModel;
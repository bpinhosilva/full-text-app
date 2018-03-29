'use strict';

module.exports = {
    dbConfig: {
        host: 'mysqldb',
        port: '3306',
        database: 'mediacollection',
        user: 'root',
        password: 'root',
        connectionLimit: 10
    },
    searchConfig: {
        index: 'mediacollection',
        type: 'disc',
        port: 9200,
        host: process.env.ES_HOST || 'localhost',
        schema: {
            disc: {
                name: {type: 'text'},
                artist: {type: 'keyword'},
                release_date: {type: 'text'},
                studio: {type: 'text'},
                genre: {type: 'text'},
                label: {type: 'text'},
                producer: {type: 'text'}
            }
        }
    }
};
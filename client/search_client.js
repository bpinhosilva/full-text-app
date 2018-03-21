'use strict';

// TODO: refactor.

let elasticsearch = require('elasticsearch');

const index = 'mediacollection';
const type = 'disc';
const port = 9200;
const host = process.env.ES_HOST || 'localhost';
const client = new elasticsearch.Client({host: {host, port}});

/** Check the ES connection status */
async function checkConnection() {
    let isConnected = false;
    while (!isConnected) {
        console.log('Connecting to ES');
        try {
            const health = await client.cluster.health({});
            console.log(health);
            isConnected = true;
        } catch (err) {
            console.log('Connection Failed, Retrying...', err);
        }
    }
}

/** Clear the index, recreate it, and add mappings */
async function resetIndex() {
    if (await client.indices.exists({index})) {
        await client.indices.delete({index});
    }

    await client.indices.create({index});
    await putDiscMapping();
}

/** Add disc section schema mapping to ES */
async function putDiscMapping() {
    const schema = {
        name: {type: 'text'},
        artist: {type: 'keyword'},
        release_date: {type: 'text'},
        studio: {type: 'text'},
        genre: {type: 'text'},
        label: {type: 'text'},
        producer: {type: 'text'}
    };

    return client.indices.putMapping({index, type, body: {properties: schema}});
}

function queryTerm(term, offset = 0) {
    const body = {
        from: offset,
        query: {
            match: {
                name: {
                    query: term,
                    operator: 'and',
                    fuzziness: 'auto'
                }
            }
        },
        highlight: {fields: {text: {}}}
    };

    return client.search({index, type, body});
}

module.exports = {
    client, index, type, checkConnection, resetIndex, queryTerm
};
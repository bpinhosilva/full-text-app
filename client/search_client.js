'use strict';

let elasticsearch = require('elasticsearch');

class SearchClient {
    constructor(options) {
        this.index = options.index;
        this.type = options.type;
        this.port = options.port;
        this.host = options.host;
        this.schema = options.schema;

        let host = this.host;
        let port = this.port;

        this.client = new elasticsearch.Client({host: {host, port}});
    }

    putMapping(schema) {
        return this.client.indices.putMapping({index: this.index, type: this.type, body: {properties: schema}});
    }

    bulkIndex(data) {
        if (!Array.isArray(data))
            data = [data];

        let self = this;
        let bulkOps = [];

        data.forEach(element => {
            // describe action
            bulkOps.push({index: {_index: self.index, _type: self.type, _id: element.id}});

            // add document
            bulkOps.push(element);
        });

        return self.client.bulk({body: bulkOps});
    }

    bulkDelete(data) {
        if (!Array.isArray(data))
            data = [data];

        let self = this;
        let bulkOps = [];

        data.forEach(element => {
            // describe action
            bulkOps.push({delete: {_index: self.index, _type: self.type, _id: element}});
        });

        return self.client.bulk({body: bulkOps});
    }

    bulkUpdate(data) {
        if (!Array.isArray(data))
            data = [data];

        let self = this;
        let bulkOps = [];

        data.forEach(element => {
            // describe action
            bulkOps.push({update: {_index: self.index, _type: self.type, _id: element.id}});

            // add document
            bulkOps.push({doc: element} );
        });

        return self.client.bulk({body: bulkOps});
    }

    queryTerm(term, offset = 0) {
        let self = this;

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

        return self.client.search({index: self.index, type: self.type, body: body});
    }
}

module.exports = SearchClient;
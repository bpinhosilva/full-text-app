'use strict';

const searchClient = require('../client/search_client');
const discs = require('../discs/items');

async function insertDiscs() {
    try {
        // clear search index
        await searchClient.resetIndex();

        let bulkOps = [];

        // read each disc item and index in elasticsearch
        discs.forEach(element => {
            console.log(`Reading Disc - ${element.name}`);

            // Describe action
            bulkOps.push({index: {_index: searchClient.index, _type: searchClient.type}});

            // Add document
            bulkOps.push(element);
        });

        // Insert remainder of bulk ops array
        await searchClient.client.bulk({body: bulkOps});
    } catch (err) {
        console.error(err);
    }
}

insertDiscs();
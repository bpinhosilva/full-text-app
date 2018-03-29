'use strict';

let ApiBusiness = require('../../business/api_business');
let DiscModel = require('../model/disc_model');
let ApiException = require('../../exception/api_exception');

class DiscBusiness extends ApiBusiness {
    constructor() {
        super();
        this.discModel = new DiscModel(this.getDBClient());
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

        return self.discModel.getAll({limit: limit, offset: offset});
    }

    insertDisc(disc) {
        let self = this;

        return self.discModel.validateFields(disc).then(ok => {
            return self.discModel.insertOne(disc);
        }).catch(err => {
            return Promise.reject(new ApiException(err));
        });
    }

    getDiscById(id) {
        let self = this;

        return self.discModel.getOneById(id);
    }

    updateDiscById(disc) {
        let self = this;

        return self.discModel.validateFields(disc).then(ok => {
            return self.discModel.updateOneById(disc);
        }).catch(err => {
            return Promise.reject(new ApiException(err));
        });
    }

    deleteDiscById(discId) {
        let self = this;

        return self.discModel.deleteOneById(discId);
    }

    queryTerm(params) {
        let self = this;
        let term = params.term;
        let offset = params.offset;

        if (Number.isNaN(offset) || !Number.isFinite(offset))
            offset = 0;

        return self.discModel.searchByTerm(term, offset);
    }
}

module.exports = DiscBusiness;
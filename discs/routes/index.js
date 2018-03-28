'use strict';

let debug = require('debug')('full-text-app:discRouter');
let express = require('express');
let router = express.Router();
let mainApp = require('../../app');

/*let searchClient = require('../client/search_client');
router.get('/search', (req, res, next) => {
    const {term, offset} = req.query;
    searchClient.queryTerm(term, offset).then(results => {
        res.send(results);
    }).catch(err => {
        next(err);
    });
});*/

let discBusiness = mainApp.getDiscBusiness();

router.post('/', (req, res, next) => {
    discBusiness.insertDisc(req.body).then(results => {
        res.send(results);
    }).catch(err => {
        next(err);
    });
});

router.get('/', (req, res, next) => {
    let queryParams = {
        limit: req.query.limit,
        offset: req.query.offset
    };

    discBusiness.getAllDiscs(queryParams).then(results => {
        res.send(results);
    }).catch(err => {
        next(err);
    });
});

router.get('/:id', (req, res, next) => {
    discBusiness.getDiscById(req.params.id).then(disc => {
        res.send(disc);
    }).catch(err => {
        next(err);
    });
});

router.put('/:id', (req, res, next) => {
    let disc = req.body;
    disc.id = req.params.id;

    discBusiness.updateDiscById(disc).then(results => {
        res.send(results);
    }).catch(err => {
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    let discId = req.params.id;

    discBusiness.deleteDiscById(discId).then(results => {
        res.send(results);
    }).catch(err => {
        next(err);
    });
});

module.exports = router;
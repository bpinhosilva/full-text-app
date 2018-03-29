angular.module('discApp')
    .factory('Disc', function ($resource) {
        return $resource(API + '/disc/:id', {id: '@id'}, {
            update: {method: 'PUT'},
            search: {
                url: API + '/disc/search',
                method: 'GET',
                isArray: false
            }
        });
    });
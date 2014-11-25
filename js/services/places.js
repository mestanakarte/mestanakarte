app.factory('Places', ['$http', '$resource', function($http, $resource) {
    var res = $resource('/places/:id', { id: '@id' });
    return {
        query: function (params) {
            return res.query(params).$promise;
        },
        get: function (params) {
            return res.get(params).$promise;
        },
        save: function (params) {
            return res.save(params).$promise;
        },
        delete: function (params) {
            return res.delete(params).$promise;
        }
    };
}]);

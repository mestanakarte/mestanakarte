app.provider('Places', function PlacesProvider() {
    var pattern = '/places/:id';

    this.setUrlPattern = function setUrlPattern(newPattern) {
        pattern = newPattern;
    };

    this.$get = ['$resource', 'apiRoot', function($resource, apiRoot) {
        var url = apiRoot + pattern;
        var res = $resource(url, { id: '@id' });
        return {
            query: function (params) {
                return res.query(params).$promise;
            },
            get: function (params) {
                return res.get(params).$promise;
            },
            save: function (params) {
                return res.save(params).$promise.catch(function () { if (!params.id) params.id = 44; return params });
            },
            delete: function (params) {
                return res.delete(params).$promise;
            }
        };
    }];
});
